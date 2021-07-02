import combineRouters from "koa-combine-routers";
import scriptTagRouter from "./script_tag";
import settingsRouter from "./settings";
import subscriptionRouter from "./subscription";
import toolbarRoute from "./toolbar";
import themeRoute from "./theme";
import webhookRouter from "./webhooks";

const router = combineRouters(
  scriptTagRouter,
  settingsRouter,
  subscriptionRouter,
  webhookRouter,
  toolbarRoute,
  themeRoute
);

export default router;
