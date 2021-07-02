import Shopify from "@shopify/shopify-api";
import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import {
  createShopifyAuth,
  verifyToken,
  getQueryKey,
} from "koa-shopify-auth-cookieless";
import { graphQLProxy, ApiVersion } from "koa-shopify-graphql-proxy-cookieless";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import isVerified from "shopify-jwt-auth-verify";

import dbConnect from "../database/database";
import routes from "./router/index";
// import getSubscriptionUrl from "../server/handlers/mutations/get-subscription-url";
// import getAppSubscriptionStatus from "../server/handlers/mutations/get-subscription-status";
// import { getPendingSubscriptions } from "../server/handlers/subscription/subscription";
import {
  getCurrentThemeId,
  updateAssetThemeLiquid,
  updateThemeIdInDatabase,
} from "./handlers/theme/theme";
import { registerStoreWebhooks } from "../server/handlers/webhooks/webhooks";

const jwt = require("jsonwebtoken");
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, HOST, SCOPES } = process.env;

// connect to databse
dbConnect();

import {
  storeCallback,
  loadCallback,
  deleteCallback,
  getShopByShopId,
  updateShop,
} from "./handlers/sessions/sessions";

// import { getSubscriptionById } from "./handlers/subscription/subscription";

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET,
  SCOPES: SCOPES.split(","),
  HOST_NAME: HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    storeCallback,
    loadCallback,
    deleteCallback
  ),
});

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: SCOPES.split(","),
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;

        await storeCallback(ctx.state.shopify);

        await registerStoreWebhooks(
          HOST,
          accessToken,
          shop,
          Shopify.Context.API_VERSION
        );

        // subscription
        // const confirmationUrl = await getSubscriptionUrl(
        //   ctx,
        //   accessToken,
        //   shop
        // );
        // await updateShop(shop, { confirmationUrl: confirmationUrl });

        // update theme
        console.log("Start updating theme");
        const currentTheme = await getCurrentThemeId(shop);
        await updateThemeIdInDatabase(shop, currentTheme);
        await updateAssetThemeLiquid(shop, currentTheme.id);

        ctx.redirect(`/?shop=${shop}`);
        // return ctx.redirect(confirmationUrl);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/graphql", async (ctx, next) => {
    const bearer = ctx.request.header.authorization;
    const secret = SHOPIFY_API_SECRET;
    const valid = isVerified(bearer, secret);
    if (valid) {
      const token = bearer.split(" ")[1];
      const decoded = jwt.decode(token);
      const shop = new URL(decoded.dest).host;
      const dbShop = await getShopByShopId(shop);
      if (dbShop) {
        const accessToken = dbShop.accessToken;
        const proxy = graphQLProxy({
          shop: shop,
          password: accessToken,
          version: ApiVersion.October20,
        });
        await proxy(ctx, next);
      } else {
        ctx.res.statusCode = 403;
      }
    }
  });

  async function injectSession(ctx, next) {
    const bearer = ctx.request.header.authorization;
    const secret = SHOPIFY_API_SECRET;
    const valid = isVerified(bearer, secret);
    if (valid) {
      const token = bearer.split(" ")[1];
      const decoded = jwt.decode(token);
      const shop = new URL(decoded.dest).host;
      const dbShop = await getShopByShopId(shop);
      if (dbShop) {
        const accessToken = dbShop.accessToken;
        const client = new Shopify.Clients.Rest(shop, accessToken);
        ctx.myClient = client;
      } else {
        ctx.res.statusCode = 403;
      }
    }
    return next();
  }

  server.use(injectSession);
  server.use(routes());

  router.get("(/_next/static/.*)", handleRequest);
  router.get("/_next/webpack-hmr", handleRequest);

  router.get("/", async (ctx, next) => {
    const shop = getQueryKey(ctx, "shop");
    const chargeId = getQueryKey(ctx, "charge_id");

    const dbShop = await getShopByShopId(shop);
    const token = dbShop && dbShop.accessToken;
    if (token) {
      console.log(`Token `, token);
      ctx.state = { shopify: { shop: shop, accessToken: token } };

      let status = null;
      if (chargeId) {
        // status = await getSubscriptionById(shop, chargeId);
        // if (status?.recurring_application_charge) {
        //   if (status?.recurring_application_charge?.status == "active") {
        //     await updateShop(shop, {
        //       chargeId: status?.recurring_application_charge?.id,
        //     });
        //   }
        // }
      } else {
        // const hasSubscription = await getAppSubscriptionStatus(
        //   ctx,
        //   token,
        //   shop
        // );
        // if (!hasSubscription) {
        //   const pending = await getPendingSubscriptions(shop);
        //   let confirmationUrl = "";
        //   if (pending?.length) {
        //     confirmationUrl = pending[0]?.confirmation_url;
        //   } else {
        //     confirmationUrl = await getSubscriptionUrl(ctx, token, shop);
        //   }
        //   await updateShop(shop, { confirmationUrl: confirmationUrl });
        // }
      }
    }
    await verifyToken(ctx, next);
  });

  router.get("/(.*)", async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    // https://blog.mixlogue.jp/posts/2020/20201209141909/
    // follow this for subscirption changes
    console.log(`> Ready on http://localhost:${port}`);
  });
});
