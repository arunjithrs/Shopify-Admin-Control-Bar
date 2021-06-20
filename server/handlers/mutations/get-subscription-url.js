import { redirectQueryString } from "koa-shopify-auth-cookieless";
const getSubscriptionUrl = async (ctx, accessToken, shop) => {
  const redirectQuery = redirectQueryString(ctx);

  const APP_NAME = process.env.APP_ABS_NAME;
  const query = JSON.stringify({
    query: `mutation {
      appSubscriptionCreate(
          name: "Basic Plan"
          returnUrl: "https://${shop}/admin/apps/${APP_NAME}/"
          test: true
          lineItems: 
          {
            plan: {
              appRecurringPricingDetails: {
                  price: { amount: 5, currencyCode: USD }
              }
            }
          } 
        ) {
            userErrors {
              field
              message
            }
            confirmationUrl 
            appSubscription {
              id
            }
        }
    }`,
  });

  // returnUrl: "${process.env.HOST}/?${redirectQuery}"

  // returnUrl: "https://${shop}/admin/apps/${APP_NAME}/"

  // trialDays: 5
  const response = await fetch(
    `https://${shop}/admin/api/2021-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: query,
    }
  );
  const responseJson = await response.json();

  const confirmationUrl =
    responseJson?.data?.appSubscriptionCreate?.confirmationUrl;

  return confirmationUrl;
};

module.exports = getSubscriptionUrl;
