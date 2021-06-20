const GET_SUBSCRIPTION = `query {
    currentAppInstallation {
      activeSubscriptions {
        status
      }
    }
  }`;

const getAppSubscriptionStatus = async (ctx, accessToken, shop) => {
  const data = JSON.stringify({
    query: GET_SUBSCRIPTION,
  });
  const response = await fetch(
    `https://${shop}/admin/api/2021-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: data,
    }
  );
  const responseJson = await response.json();

  const isActive =
    responseJson?.data?.currentAppInstallation?.activeSubscriptions?.length &&
    responseJson?.data?.currentAppInstallation?.activeSubscriptions[0]
      ?.status === "ACTIVE";

  // if(!isActive)
  return isActive;
};

module.exports = getAppSubscriptionStatus;
