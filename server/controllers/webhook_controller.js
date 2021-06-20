const Shop = require("../../models/shop");
import { cancelSubscription } from "../handlers/subscription/subscription";
import { deleteShopByShopId } from "../handlers/sessions/sessions";

export async function uninstallWebhook(ctx) {
  await cancelSubscription(ctx.state.webhook.domain);
  await deleteShopByShopId(ctx.state.webhook.domain);
  console.log(`Uninstall Webhook processed`);
  return false;
}
