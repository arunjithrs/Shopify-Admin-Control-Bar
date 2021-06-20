import Router from "koa-router";
import {
  getBannerSettings,
  initializeBanner,
  updateBadge,
} from "../controllers/banner_controller";

const koaBody = require("koa-body");

const router = new Router({ prefix: "/api/banner" });

// router.post("/", koaBody(), async (ctx) => {
//   const result = await saveShopSettings(ctx.myClient, ctx.request.body);
//   ctx.body = result;
// });

// router.post("/api", koaBody(), async (ctx) => {
//   const result = await saveShopApiSettings(ctx.myClient, ctx.request.body);
//   ctx.body = result;
// });
router.get("/", koaBody(), async (ctx) => {
  const result = await getBannerSettings(ctx.myClient);
  ctx.body = result;
});

router.post("/initialize", koaBody(), async (ctx) => {
  const result = await initializeBanner(ctx.myClient);
  ctx.body = result;
});

router.put("/", koaBody(), async (ctx) => {
  console.log(ctx.body);
  const result = await updateBadge(ctx.myClient, ctx.request.body);
  ctx.body = result;
});

// router.get("/api", koaBody(), async (ctx) => {
//   const result = await getShopApiSettings(ctx.myClient);
//   ctx.body = result;
// });

export default router;
