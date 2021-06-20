import Head from "next/head";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AppProvider, Frame } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import translations from "@shopify/polaris/locales/en.json";
import createApp from "@shopify/app-bridge";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientRouter from "../components/core/ClientRouter";
// import SubscriptionRedirectModal from "../components/core/SubscriptionRedirectModal";
import "@shopify/polaris/dist/styles.css";

import { Provider as ReduxProvider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";

import { useAxios } from "../hooks/useAxios";

function MyProvider(props) {
  const app = useAppBridge();
  // const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [showUi, setShowUi] = useState(false);
  // const [subscriptionUrl, setSubscriptionUrl] = useState("");

  const [axios] = useAxios();

  // async function getAppSubscriptionStatus() {
  //   const { data } = await axios.get(`${SERVER}/api/subscription/status`);

  //   if (!data) {
  //     const { data } = await axios.get(`${SERVER}/api/subscription/url`);
  //     setSubscriptionUrl(data);
  //     // setSubscriptionStatus(true);
  //     setShowUi(false);
  //   } else {
  //     setShowUi(true);
  //   }
  // }
  // useEffect(() => {
  //   getAppSubscriptionStatus();
  // }, []);

  const Component = props.Component;

  // return subscriptionStatus ? (
  // <SubscriptionRedirectModal
  // subscriptionStatus={subscriptionStatus}
  // subscriptionUrl={subscriptionUrl}
  // app={app}
  // />
  // ) : showUi ? (
  return <Component {...props} showUi={showUi} />;
  // ) : (
  // ""
  // );
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    if (router.asPath !== router.route) {
      setShop(router.query.shop);
    }
  }, [router]);

  if (!shop) return null;

  const app = createApp({
    apiKey: API_KEY,
    shopOrigin: shop,
    forceRedirect: true,
  });

  const link = new createHttpLink({
    credentials: "omit",
    fetch: authenticatedFetch(app),
  });

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
  const config = { apiKey: API_KEY, shopOrigin: shop, forceRedirect: true };

  return (
    <React.Fragment>
      <Head>
        <title>Sample App</title>
        <meta charSet="utf-8" />
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
      </Head>

      <AppProvider i18n={translations}>
        <Frame>
          <Provider config={config}>
            <ClientRouter />
            <ApolloProvider client={client}>
              <ReduxProvider store={store}>
                <MyProvider
                  Component={Component}
                  {...pageProps}
                  shopOrigin={shop}
                  app={app}
                />
              </ReduxProvider>
            </ApolloProvider>
          </Provider>
        </Frame>
      </AppProvider>
    </React.Fragment>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);
