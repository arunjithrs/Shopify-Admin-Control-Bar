import { Session } from "@shopify/shopify-api/dist/auth/session";
const Shop = require("../../../models/shop");

let domain = "";
async function storeCallback(session) {
  try {
    let data = session;

    // console.log(`session `, data);
    // if (data.id.indexOf(`${data.shop}`) > -1) {
    //   domain = data.id;
    // }

    // const query = {
    //   shop: data.shop,
    //   sessionId: data.id,
    //   state: data.state,
    //   isOnline: data.isOnline,
    //   // for updation
    //   accessToken: data?.accessToken,
    //   onlineAccessInfo: data?.onlineAccessInfo,
    //   scope: data?.scope,
    //   domain: domain,
    // };

    const query = {
      shop: data.shop,
      accessToken: data?.accessToken,
      uninstalled: false,
    };

    const result = await Shop.findOne({ shop: data.shop });
    if (!result) {
      let newShop = new Shop(query);
      await newShop.save();
      return true;
    }
    await Shop.updateOne({ shop: data.shop }, query);

    return true;
  } catch (err) {
    if (err) throw err;
  }
}
async function loadCallback(id) {
  try {
    const session = new Session(id);

    const shop = await Shop.findOne({
      $or: [{ sessionId: id }, { domain: id }],
    });
    if (shop) {
      session.shop = shop.shop;
      // session.state = shop.state;
      // session.isOnline = shop.isOnline;
      // session.onlineAccessInfo = shop.onlineAccessInfo;
      session.accessToken = shop.accessToken;
      // session.scope = shop.scope;
      // session.sessionId = shop.sessionId;

      const date = new Date();
      date.setDate(date.getDate() + 1);
      session.expires = date;
    }
    return session;
  } catch (err) {
    if (err) throw err;
    return false;
  }
}
async function deleteCallback(id) {
  try {
    return false;
  } catch (err) {
    if (err) throw err;
  }
}

async function getShopByShopId(shop) {
  let shopParam = shop;
  try {
    const shop = await Shop.findOne({ shop: shopParam });
    return shop;
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

async function deleteShopByShopId(shop) {
  let shopParam = shop;
  try {
    return await Shop.remove({ shop: shopParam });

    // return await Shop.findOneAndUpdate(
    //   { shop: shopParam },
    //   { uninstalled: true }
    // );
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

async function updateShop(shop, query) {
  let shopParam = shop;
  let q = query;
  try {
    return await Shop.findOneAndUpdate({ shop: shopParam }, q);
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

// async function updateShopChargeId(shop, chargeId) {
//   let shopParam = shop;
//   let charge = chargeId;
//   try {
//     return await Shop.findOneAndUpdate(
//       { shop: shopParam },
//       { chargeId: charge }
//     );
//   } catch (err) {
//     if (err) throw err;
//     return false;
//   }
// }

// async function saveShopSubConfirmationUrl(shop, url) {
//   let shopParam = shop;
//   let confirmationUrl = url;
//   try {
//     return await Shop.findOneAndUpdate(
//       { shop: shopParam },
//       { confirmationUrl: confirmationUrl }
//     );
//   } catch (err) {
//     if (err) throw err;
//     return false;
//   }
// }

module.exports = {
  storeCallback,
  loadCallback,
  deleteCallback,
  getShopByShopId,
  deleteShopByShopId,
  updateShop,
};
