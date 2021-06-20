const Shop = require("../../models/shop");

export async function getShopSettings(client) {
  if (client) {
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });
    return result.settings;
  }

  return false;
}

export async function getShopApiSettings(client) {
  if (client) {
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });
    return result.apiSettings;
  }

  return false;
}

export async function saveShopSettings(client, data) {
  if (client) {
    const query = {
      basicSettings: data.basicSettings,
      templateSettings: data.templateSettings,
    };

    const result = await Shop.findOneAndUpdate(
      {
        shop: client.domain,
        accessToken: client.accessToken,
      },
      { settings: query }
    );
    if (result) {
      return true;
    }
    return false;
  }
}

export async function saveShopApiSettings(client, data) {
  if (client) {
    const result = await Shop.findOneAndUpdate(
      {
        shop: client.domain,
        accessToken: client.accessToken,
      },
      { apiSettings: data.apiSettings }
    );
    if (result) {
      return true;
    }
    return false;
  }
}
