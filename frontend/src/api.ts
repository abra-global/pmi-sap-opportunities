import axios from "axios";
import { msalInstance, loginRequest } from "./auth/msalConfig";


export const api = axios.create({
//   baseURL: "https://sap-opportunities-backend.agreeablehill-829b87a4.westeurope.azurecontainerapps.io", 
  baseURL: import.meta.env.VITE_API_URL as string
});


api.interceptors.request.use(async (config) => {
  // בודקים אם המשתמש מחובר
  const accounts = msalInstance.getAllAccounts();
  console.log("accounts:", accounts[0])
  if (accounts.length > 0) {
    try {
      
      const response = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0], 
      });
      const token = response.accessToken;

      
     if (!config.headers) {
        config.headers = {} as any
      }

      config.headers["Authorization"] = `Bearer ${token}`;
    } catch (err) {
      console.error("Failed to acquire token silently", err);
    }
  }
  return config;
});


