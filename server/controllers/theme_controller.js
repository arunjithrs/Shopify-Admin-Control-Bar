const Shop = require("../../models/shop");

import {
  getCurrentThemeId,
  updateThemeAndSnippet,
} from "../handlers/theme/theme";
import { updateAssetSnippet } from "../handlers/theme/snippet";

export async function getThemeStatus(client) {
  console.log(`client `, client);
  if (client) {
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });

    if (!result) {
      return false;
    }
    const theme = await getCurrentThemeId(result.shop, result.accessToken);

    if (theme.id != result.mainThemeId) {
      return { status: "CHANGED" };
    }
    return { status: null };
  }
  return false;
}

export async function initializeTheme(client) {
  if (client) {
    const result = await Shop.findOne({
      shop: client.domain,
      accessToken: client.accessToken,
    });

    if (!result) {
      return false;
    }
    const data = await updateThemeAndSnippet(client.domain, client.accessToken);
    return data;
  }

  return false;
}
