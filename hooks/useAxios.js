import Axios from "axios";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

export function useAxios() {
  const app = useAppBridge();
  const instance = Axios.create({
    baseURL: `${SERVER}/api`,
  });

  instance.interceptors.request.use(function (config) {
    return getSessionToken(app).then((token) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  });
  return [instance];
}
