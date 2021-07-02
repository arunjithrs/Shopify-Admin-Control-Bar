const Shop = require("../../../models/shop");
import fs from "fs";
import path from "path";
import { updateAssetSnippet } from "./snippet";

const themeApi = "admin/api/2021-04";

export async function updateThemeAndSnippet(shop, accessToken) {
  const theme = await getCurrentThemeId(shop, accessToken);
  let page = await getAssetThemeLiquid(shop, theme.id);

  if (page) {
    // make snippet entry in theme.liquid
    let data = await uploadAsset(
      shop,
      accessToken,
      theme.id,
      page,
      "layout/theme.liquid"
    );

    if (data.errors) {
      return { status: false };
    }
  }

  // create/update snippet
  let status = await updateAssetSnippet(shop, accessToken, theme.id);

  return { status: status };
}

export async function getCurrentThemeId(shop) {
  try {
    const response = await Shop.findOne({ shop: shop });
    const accessToken = response.accessToken;

    if (!accessToken) return false;

    const result = await fetch(`https://${shop}/${themeApi}/themes.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });

    const data = await result.json();
    const mainTheme = data.themes.find((theme) => theme.role === "main");

    if (!mainTheme) {
      console.log(`No main theme found`);
      return false;
    }

    return mainTheme;
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

export async function updateThemeIdInDatabase(shop, mainTheme) {
  try {
    const response = await Shop.findOne({ shop: shop });
    const accessToken = response.accessToken;

    if (!accessToken) return false;

    await Shop.findOneAndUpdate(
      { shop: shop, accessToken: accessToken },
      { mainThemeId: mainTheme.id }
    );
    console.log(`Main Theme`, mainTheme);
  } catch (err) {
    if (err) throw err;
    return false;
  }
}

export async function getAssetThemeLiquid(shop, themeId) {
  const response = await Shop.findOne({ shop: shop });
  const accessToken = response.accessToken;

  if (!accessToken) return false;

  let data = await fetch(
    `https://${shop}/${themeApi}/themes/${themeId}/assets.json?asset[key]=layout/theme.liquid`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    }
  );
  data = await data.json();

  if (!data?.asset?.value) return false;

  const theme = await fs.readFileSync(
    path.resolve(__dirname, "../../../liquid/theme.liquid")
  );
  let newPage = data?.asset?.value;
  if (newPage.includes(theme)) {
    console.log("Snippet Already exist");
    return false;
  }
  newPage = data?.asset?.value.replace(
    "{% section 'header' %}",
    `\n${theme}\n{% section 'header' %}\n`
  );

  return newPage;
}

export async function uploadAsset(shop, accessToken, themeId, content, key) {
  // update theme
  const result = await fetch(
    `https://${shop}/${themeApi}/themes/${themeId}/assets.json`,
    {
      method: "PUT",
      body: JSON.stringify({
        asset: {
          key: key,
          value: content,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    }
  );
  return await result.json();
}
