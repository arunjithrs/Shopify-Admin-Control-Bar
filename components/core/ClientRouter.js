import { withRouter } from "next/router";
import { ClientRouter as AppBrideClientRouter } from "@shopify/app-bridge-react";

function ClientRouter(props) {
  const { router } = props;
  return <AppBrideClientRouter history={router} />;
}

export default withRouter(ClientRouter);
