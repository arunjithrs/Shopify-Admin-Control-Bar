import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag";
import settingsRouter from "./settings";
import subscriptionRouter from "./subscription";
import bannerRoute from "./banner";
import webhookRouter from "./webhooks";

const router = combineRouters(
  scriptTagRouter,
  settingsRouter,
  subscriptionRouter,
  webhookRouter,
  bannerRoute
);

export default router;
