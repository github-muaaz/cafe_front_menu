import {useEffect} from "react";
import {get} from "lodash";

import history from "../../router/history";
import storage from "../../store/local-storage";
import config from "../../config.json";

const Auth = ({children}) => {

    const checkAuth = () => {
        const store = storage.get(config.storageKey);

        return store && get(store, "isAuthenticated", false) && get(store, "auth.token.accessToken", '');
    }

    useEffect(()=>{
        const path = window.location.pathname;

        const isAuthenticated = checkAuth();

        if (path.includes("menu"))
            return;

        if (isAuthenticated && (path.includes("login") || path.includes("forgot-password"))) {
            history.go(-1); // Go back to the previous page
        } else if (!isAuthenticated && !path.includes("login") && !path.includes("forgot-password")) {
            window.location.pathname = '/login'; // Redirect to login page
        }
    }, []);

    return children;
}

export default Auth;