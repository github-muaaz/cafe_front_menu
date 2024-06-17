import {useEffect} from "react";
import {get} from "lodash";

import Api from "../api";
import storage from "../../store/local-storage";
import config from "../../config.json";

const AuthLoader = ({children}) => {

    useEffect(() => {
        const storeItem = storage.get(config.storageKey);

        const isAuthenticated = get(storeItem, 'isAuthenticated', null);

        const token = get(storeItem, 'auth.token', null);

        if(storeItem && isAuthenticated && token)
            Api.GetMe();
    }, []);

    return children;
}

export default AuthLoader;