
import type { Configuration } from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID;
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID
console.log("clientId:", clientId)
console.log(" tenantId:",  tenantId)
export const msalConfig: Configuration = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
export const loginRequest = {
  scopes: [`${clientId}/.default`],
};
