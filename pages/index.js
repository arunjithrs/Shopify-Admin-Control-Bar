import {
  Layout,
  Page,
  Button,
  Card,
  FooterHelp,
  Banner,
} from "@shopify/polaris";
import React, { useState, useEffect, useCallback } from "react";

import { useAxios } from "../hooks/useAxios";
import EnableDisableForm from "../components/EnableDisable";

import { useDispatch, useSelector } from "react-redux";
import { getToolbar } from "../redux/actions/toolbar";
import { getThemeStatus } from "../redux/actions/theme";
import ThemeChangedBanner from "../components/ThemeChangedBanner";
import ToolbarSettings from "../components/ToolbarSettings";

const SettingsPage = () => {
  const [axios] = useAxios();
  const dispatch = useDispatch();
  const toolbar = useSelector((state) => state.toolbar);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(getToolbar(axios));
    dispatch(getThemeStatus(axios));
  }, []);

  useEffect(() => {
    console.log(`theme data`, theme);
  }, [theme]);

  const saveButtonHandler = (args) => {
    console.log(`args => `, args);
  };

  const domainName = document.referrer;

  console.log(domainName);
  return (
    <>
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
        {!theme?.loading && theme?.status == "CHANGED" && (
          <ThemeChangedBanner />
        )}
        <Layout>
          <Layout.AnnotatedSection
            title="Enable / Disable setting"
            description="Disable the app when you no longer want to use & vice versa"
          >
            <EnableDisableForm />
          </Layout.AnnotatedSection>

          <Layout.AnnotatedSection title="Settings" description=" ">
            <ToolbarSettings />
          </Layout.AnnotatedSection>
        </Layout>

        {!theme?.loading && theme?.status === true && (
          <div style={{ marginTop: "30px" }}>
            <Banner title="Successfully Re-Initialized" status="success" />
          </div>
        )}
        {((!theme?.loading && theme?.error) ||
          (!theme?.loading && theme?.status === false)) && (
          <div style={{ marginTop: "30px" }}>
            <Banner title="Seomething went wrong" status="critical" />
          </div>
        )}
      </Page>
    </>
  );
};

export default SettingsPage;
