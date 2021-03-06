const Shop = require("../../../models/shop");
import fs from "fs";
import path from "path";
import { uploadAsset } from "./theme";

const themeApi = "admin/api/2021-04";

export async function updateAssetSnippet(shop, accessToken, themeId) {
  const snippet = await getToolbarSnippet();
  const result = await uploadAsset(
    shop,
    accessToken,
    themeId,
    snippet,
    "snippets/pinetree-admin-toolbar.liquid"
  );
  console.log(result.errors);
  if (result.errors) {
    return false;
  }
  return true;
}

export async function getToolbarSnippet() {
  let data = `<section id="pinetree-dev-admin-toolbar-wrapper">
    <style>
  
      #pinetree-dev-wrapper * { 
        height: auto;
        width: auto;
        margin: 0;
        padding: 0;
        position: static;
        text-shadow: none;
        text-transform: none;
        letter-spacing: normal;
        font-size: 13px;
        font-weight: 400;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        line-height: 2.46153846;
        border-radius: 0;
        box-sizing: content-box;
        transition: none;
        -webkit-font-smoothing: subpixel-antialiased; 
        z-index: 9999999999999999;
      } 
      #pinetree-dev-wrapper a {
        color: #f9f9f9;
      }
      #pinetree-dev-wrapper ul {
        list-style: none; 
        padding-left: 30px;
      }
      #pinetree-dev-wrapper ul li {
        display: inline-block;
        padding: 0 5px;
      }
    </style>
    <div style="padding: 3px 5px; background: #1e1e1e; color: #fff;">
  
      <ul>
        <li>
          <a href="">Admin</a>
          <ul>
            <li>
              <a href="">Admin</a>
            </li>
            <li>
              <a href="">Menu</a>
            </li> 
            <li>
              <a href="">Themes</a>
            </li> 
          </ul>
        </li>
        <li><a href="">Customize</a></li>
        <li><a href="">Apps</a></li>
        <li><a href="">Admin</a></li>
      </ul> 
    </div>
  </section>`;

  return data;
}
