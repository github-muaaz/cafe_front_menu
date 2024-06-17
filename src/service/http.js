import axios from "axios";
import { get } from "lodash";
import { toast } from "react-toastify";

import storage from "../store/local-storage";
import history from "../router/history";
import configJson from "../config.json";

const request = axios.create({
    baseURL: configJson.apiEndpoint,
});

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Request interceptor
request.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const storageItem = storage.get(configJson.storageKey);

            const token = get(storageItem, 'auth.token', {});

            if (token)
                config.headers.Authorization = `${get(token, "tokenType")} ${get(token, "accessToken")}`;
        }
        config.headers.TimeZone = timezone;
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

        if (
            (statusCode === 401 || statusCode === 403) &&
            !get(window, "location.pathname", "")?.startsWith("/redirect")
            // && isProduction()
        ) {
            history.push("/login");
            // store.dispatch({ type: AuthAction.CHECK_AUTH.FAILURE });
        }

        toast.error(error?.response?.data?.errors?.[0]?.message || "error occured")

        return Promise.reject(error);
    }
);

export default request;