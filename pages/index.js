import { Layout, Page, Button, Card, FooterHelp, Link } from "@shopify/polaris";
import React, { useState, useEffect, useCallback } from "react";

import { useAxios } from "../hooks/useAxios";
import EnableDisableForm from "../components/EnableDisable";

import { useDispatch, useSelector } from "react-redux";
import { getBanners } from "../redux/actions/banner";

const SettingsPage = () => {
  const [axios] = useAxios();
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanners(axios));
    console.log(`banner data`, banner);
  }, []);

  const saveButtonHandler = (args) => {
    console.log(`args => `, args);
  };

  return (
    <Page
      breadcrumbs={[
        { content: "Dashboard", url: "/index", titleHidden: false },
      ]}
      title="General"
      primaryAction={
        <Button secondary onClick={saveButtonHandler}>
          Save
        </Button>
      }
    >
      <Layout>
        <Layout.AnnotatedSection
          title="Enable / Disable setting"
          description="Disable the app when you no longer want to use & vice versa"
        >
          <EnableDisableForm />
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

export default SettingsPage;
