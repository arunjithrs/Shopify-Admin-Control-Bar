import Router from "koa-router";
import { getToolbar, updateToolbar } from "../controllers/toolbar_controller";

const koaBody = require("koa-body");
const router = new Router({ prefix: "/api/toolbar" });

// router.post("/", koaBody(), async (ctx) => {
//   const result = await saveShopSettings(ctx.myClient, ctx.request.body);
//   ctx.body = result;
// });

// router.post("/api", koaBody(), async (ctx) => {
//   const result = await saveShopApiSettings(ctx.myClient, ctx.request.body);
//   ctx.body = result;
// });
router.get("/", koaBody(), async (ctx) => {
  const result = await getToolbar(ctx.myClient);
  ctx.body = result;
});

router.put("/", koaBody(), async (ctx) => {
  console.log(ctx.body);
  const result = await updateToolbar(ctx.myClient, ctx.request.body);
  ctx.body = result;
});

// router.get("/api", koaBody(), async (ctx) => {
//   const result = await getShopApiSettings(ctx.myClient);
//   ctx.body = result;
// });

export default router;
