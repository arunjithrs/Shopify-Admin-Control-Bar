import { TextContainer, Modal } from "@shopify/polaris";
import React, { useCallback, useEffect } from "react";

import { Redirect } from "@shopify/app-bridge/actions";

const SubscriptionRedirectModal = (props) => {
  const redirect = Redirect.create(props.app);

  const redirectSubscriptionPage = useCallback(() => {
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: props.subscriptionUrl,
      newContext: false,
    });
  });

  return (
    <Modal
      open={props.subscriptionStatus}
      title="Approve Subscription"
      primaryAction={{
        content: "Approve Subscription",
        onAction: redirectSubscriptionPage,
      }}
    >
      <Modal.Section>
        <TextContainer>
          <p>Your subscription is not active. Please approve subscription</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};

export default SubscriptionRedirectModal;
