import Router from "koa-router";
import {
  getThemeStatus,
  initializeTheme,
} from "../controllers/theme_controller";

const koaBody = require("koa-body");
const router = new Router({ prefix: "/api/theme" });

router.get("/status", koaBody(), async (ctx) => {
  const result = await getThemeStatus(ctx.myClient);
  ctx.body = result;
});

router.post("/initialize", koaBody(), async (ctx) => {
  const result = await initializeTheme(ctx.myClient);
  ctx.body = result;
});

export default router;
