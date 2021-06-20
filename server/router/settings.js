import Router from "koa-router";
import {
  getShopSettings,
  saveShopApiSettings,
  saveShopSettings,
  getShopApiSettings,
} from "../controllers/settings_controller";

const koaBody = require("koa-body");

const router = new Router({ prefix: "/api/settings" });

router.post("/", koaBody(), async (ctx) => {
  const result = await saveShopSettings(ctx.myClient, ctx.request.body);
  ctx.body = result;
});
router.post("/api", koaBody(), async (ctx) => {
  const result = await saveShopApiSettings(ctx.myClient, ctx.request.body);
  ctx.body = result;
});
router.get("/", koaBody(), async (ctx) => {
  const result = await getShopSettings(ctx.myClient);
  ctx.body = result;
});

router.get("/api", koaBody(), async (ctx) => {
  const result = await getShopApiSettings(ctx.myClient);
  ctx.body = result;
});

export default router;
