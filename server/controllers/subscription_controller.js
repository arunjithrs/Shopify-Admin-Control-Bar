const Shop = require("../../models/shop");
import getAppSubscriptionStatus from "../handlers/mutations/get-subscription-status";

export async function getSubUrl(client, ctx) {
  if (client) {
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });
    return result.confirmationUrl;
  }

  return false;
}

export async function getSubStatus(client, ctx) {
  if (client) {
    const hasSubscription = await getAppSubscriptionStatus(
      ctx,
      client.accessToken,
      client.domain
    );
    return hasSubscription;
  }

  return false;
}
