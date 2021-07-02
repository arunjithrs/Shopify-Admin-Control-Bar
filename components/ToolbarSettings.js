import React, { useState, useEffect, useCallback } from "react";

import { ColorPicker, Card, FormLayout, Button } from "@shopify/polaris";

function ToolbarSettings() {
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });
  return (
    <Card sectioned>
      <FormLayout>
        <b>Toolbar Background</b> <b />
        <ColorPicker onChange={setColor} color={color} allowAlpha />
      </FormLayout>
    </Card>
  );
}

export default ToolbarSettings;
