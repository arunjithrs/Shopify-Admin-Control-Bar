import Router from "koa-router";
import { receiveWebhook } from "@shopify/koa-shopify-webhooks";
import { uninstallWebhook } from "../controllers/webhook_controller";

const router = new Router({ prefix: "/webhooks/app" });
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });

router.post("/uninstall", webhook, async (ctx) => {
  if (ctx?.state?.webhook?.domain) {
    await uninstallWebhook(ctx);
  }
});

router.post("/orders-create", webhook, async (ctx) => {
  console.log(ctx.state.webhook.domain);
  console.log(ctx.state.webhook);
  console.log(`Orders Create Webhook processed`);
});

export default router;
