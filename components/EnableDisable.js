import React, { useState, useEffect, useCallback } from "react";
import { Checkbox, Card, FormLayout, Button } from "@shopify/polaris";

import { useAxios } from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { updateToolbar } from "../redux/actions/toolbar";
import { initalizeTheme } from "../redux/actions/theme";

const EnableDisableForm = () => {
  const [axios] = useAxios();
  const dispatch = useDispatch();

  const toolbar = useSelector((state) => state.toolbar);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    console.log(`toolbar data`, toolbar);
  }, [toolbar]);

  const enableCheckboxHandler = () => {
    dispatch(
      updateToolbar(axios, {
        enabled: toolbar?.toolbar?.enabled ? false : true,
      })
    );
  };

  const reinitializeHandler = () => {
    dispatch(initalizeTheme(axios));
  };
  return (
    <Card sectioned>
      <FormLayout>
        <Checkbox
          label="Check this option to enable the admin bar"
          checked={toolbar?.toolbar?.enabled}
          disabled={toolbar?.loading}
          onChange={enableCheckboxHandler}
        />
        <Button onClick={reinitializeHandler} disabled={theme?.loading}>
          Reinitialize
        </Button>
      </FormLayout>
    </Card>
  );
};

export default EnableDisableForm;
