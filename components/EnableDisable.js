import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, Card, FormLayout, Button } from "@shopify/polaris";

import { useAxios } from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { initalizeBanner, updateBanner } from "../redux/actions/banner";

const EnableDisableForm = () => {
  const [axios] = useAxios();
  const dispatch = useDispatch();

  const banner = useSelector((state) => state.banner);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log(`banner data`, banner);
  }, [banner]);

  const enableCheckboxHandler = () => {
    dispatch(
      updateBanner(axios, { enabled: banner?.banner?.enabled ? false : true })
    );
  };

  const reinitializeHandler = () => {
    dispatch(initalizeBanner(axios));
  };
  return (
    <Card sectioned>
      <FormLayout>
        <Checkbox
          label="Check this option to enable the admin bar"
          checked={banner?.banner?.enabled}
          disabled={banner?.loading}
          onChange={enableCheckboxHandler}
        />
        <Button onClick={reinitializeHandler}>Reinitialize </Button>
      </FormLayout>
    </Card>
  );
};

export default EnableDisableForm;
