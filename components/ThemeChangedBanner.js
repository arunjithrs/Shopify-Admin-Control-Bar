import React from "react";
import { Banner } from "@shopify/polaris";

function ThemeChangedBanner() {
  return (
    <div style={{ margin: "30px 0" }}>
      <Banner
        title="Current theme changed"
        action={{ content: "Re-initialize" }}
        status="critical"
      >
        <p>Please re-initialize this plugin to get Admin control bar</p>
      </Banner>
    </div>
  );
}

export default ThemeChangedBanner;
