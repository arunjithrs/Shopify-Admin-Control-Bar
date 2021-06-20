import { registerWebhook } from "@shopify/koa-shopify-webhooks";

async function registerStoreWebhooks(host, accessToken, shop, api) {
  const registerUninistallWebhook = await registerWebhook({
    address: `${host}/webhooks/app/uninstall`,
    topic: "APP_UNINSTALLED",
    accessToken,
    shop,
    apiVersion: api,
  });

  if (registerUninistallWebhook.success) {
    console.log("You have successfully installed webhook");
  } else {
    console.log(
      "Faild webhook registration - APP_UNINSTALLED",
      registerUninistallWebhook.result
    );
  }

  // const registerOrderWhook = await registerWebhook({
  //   address: `${host}/webhooks/app/orders-create`,
  //   topic: "ORDERS_CREATE",
  //   accessToken,
  //   shop,
  //   apiVersion: api,
  // });

  // if (registerOrderWhook.success) {
  //   console.log("You have successfully installed order webhook");
  // } else {
  //   console.log(
  //     "Faild order webhook registration - ORDERS_CREATE",
  //     registerOrderWhook.result.data.webhookSubscriptionCreate.userErrors
  //   );
  // }
}

module.exports = { registerStoreWebhooks };
