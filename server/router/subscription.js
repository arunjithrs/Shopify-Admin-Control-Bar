import Router from "koa-router";
import {
  getSubUrl,
  getSubStatus,
} from "../controllers/subscription_controller";

const koaBody = require("koa-body");

const router = new Router({ prefix: "/api/subscription" });

router.get("/url", koaBody(), async (ctx) => {
  const result = await getSubUrl(ctx.myClient, ctx);
  ctx.body = result;
});

router.get("/status", koaBody(), async (ctx) => {
  const result = await getSubStatus(ctx.myClient, ctx);
  ctx.body = result;
});

export default router;
