import axios from "axios";
import { get } from "lodash";
import { toast } from "react-toastify";

import storage from "../store/local-storage";
import history from "../router/history";
import configJson from "../config.json";

const request = axios.create({
    baseURL: configJson.apiEndpoint,
    // Adding withCredentials to support sending cookies if needed
    withCredentials: true,
});

// Request interceptor
request.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const storageItem = storage.get(configJson.storageKey);
            const token = get(storageItem, 'auth.token', {});
            if (token) {
                config.headers.Authorization = `${get(token, "tokenType")} ${get(token, "accessToken")}`;
            }
        }

        // Add CORS header here if it's not already set
        if (!config.headers['Access-Control-Allow-Origin']) {
            config.headers['Access-Control-Allow-Origin'] = '*';
        }

        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error);
        const statusCode = get(get(error, "response", {}), 'status');

        if ((statusCode === 401 || statusCode === 403) &&
            !get(window, "location.pathname", "").startsWith("/redirect")) {
            history.push("/login");
            // store.dispatch({ type: AuthAction.CHECK_AUTH.FAILURE });
        }

        toast.error(error?.response?.data?.errors?.[0]?.message || "An error occurred");

        return Promise.reject(error);
    }
);

export default request;
