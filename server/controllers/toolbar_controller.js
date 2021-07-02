const Shop = require("../../models/shop");

export async function getToolbar(client) {
  console.log(client);
  if (client) {
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });

    return result?.toolbar ? result?.toolbar : { enabled: false };
  }
  return false;
}

export async function updateToolbar(client, data) {
  if (client && data) {
    let data = {
      background: data?.background,
    };
    const shop = await Shop.findOneAndUpdate(
      { accessToken: client.accessToken, shop: client.domain },
      { toolbar: data },
      { new: true }
    );
    return shop.toolbar;
  }

  return false;
}
