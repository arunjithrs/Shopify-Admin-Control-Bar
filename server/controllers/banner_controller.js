const Shop = require("../../models/shop");

export async function getBannerSettings(client) {
  if (client) {
    return ["asdasda", "asdasda", "asdasda"];
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });
    return result.settings;
  }

  return false;
}

export async function initializeBanner(client) {
  if (client) {
    return ["ok"];
  }

  return false;
}

export async function updateBadge(client, data) {
  if (client && data) {
    console.log(data);
    console.log(data);

    const shop = await Shop.findOneAndUpdate(
      { accessToken: client.accessToken, shop: client.domain },
      { banner: data },
      { new: true }
    );
    return shop.banner;
  }

  return false;
}
