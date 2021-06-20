const Shop = require("../../../models/shop");

async function cancelSubscription(shop) {
  let shopParam = shop;
  try {
    const response = await Shop.findOne({ shop: shopParam });
    const accessToken = response.accessToken;

    await fetch(
      `https://${shopParam}/admin/api/2021-04/recurring_application_charges/${response.chargeId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

async function getSubscriptionById(shop, chargeId) {
  let shopParam = shop;
  let charge = chargeId;
  try {
    const response = await Shop.findOne({ shop: shopParam });
    const accessToken = response.accessToken;

    const result = await fetch(
      `https://${shopParam}/admin/api/2021-04/recurring_application_charges/${charge}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    return await result.json();
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

async function getPendingSubscriptions(shop) {
  let shopParam = shop;
  try {
    const response = await Shop.findOne({ shop: shopParam });
    const accessToken = response.accessToken;

    const result = await fetch(
      `https://${shopParam}/admin/api/2021-04/recurring_application_charges.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );

    const list = await result.json();

    return list?.recurring_application_charges?.filter(
      (item) => item.status == "pending"
    );
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

module.exports = {
  cancelSubscription,
  getSubscriptionById,
  getPendingSubscriptions,
};
