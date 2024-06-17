import {toast} from "react-toastify";
import {get} from "lodash";

import storage from "../../store/local-storage";
import request from "../http";
import history from "../../router/history";
import config from "../../config.json";
import store from "../../store/reduxStore";
import ActionTypeConstants from "../../constants/actionTypeConstants";
import {mapToUrl} from "../../utils";

class Auth {

    static Login = async (data) => {
        try {
            const res = await request.post(`auth/sign-in`, data);

            storage.set(config.storageKey, { isAuthenticated: true, auth: { token: res.data.body } });

            await Auth.GetMe();

            window.location.pathname = mapToUrl( `menu/food`);

            return res;
        } catch (err) {
            storage.set(config.storageKey, { isAuthenticated: false });

            console.log('error', err);
            toast.error(err.response?.data?.errors?.[0]?.message);
        }
    };

    static SignUp = (data) => {
        request
            .post(`auth/sign-up`, data)
            .then(res => {
                storage.set(config.storageKey, {isAuthenticated: true, ...{auth: {token: res.data.body}}});

                Auth.GetMe();

                history.push('/');
            })
            .catch(() => storage.set(config.storageKey, {isAuthenticated: false}));
    };

    static GetMe = () => {
         request
            .get('/user/me')
            .then(res => {
                store.dispatch({ type: ActionTypeConstants.SAVE, payload: res.data?.body, payloadName: 'user' });
            })
             .catch(err => {
                 console.log('user/me error', err)
             })
         ;
    };

    static Logout = () => {
        return request
            .get(`user/logout`)
            .then(res => {
                storage.set(config.storageKey, {isAuthenticated: false, ...{auth: {}}});

                toast.success('Logged out');

                window.location.pathname = 'menu/food';

                return res;
            });
    };

    static FetchData = (url, action, config) => {
        return request
            .get(url, config)
            .then(res => {
               if (action)
                    store.dispatch({
                        type: ActionTypeConstants.SAVE,
                        payload: res.data?.body,
                        ...action
                    });

                return res.data;
            })
            .catch(err => {
                console.log('get request error',err)
                if (err.response?.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response?.data?.errors?.[0]?.message);
            });
    };

    static PostData = (url, data) => {
        return request
            .post(url, data)
            .then(res => {
                // if (payloadName)
                //     store.dispatch({ type: actionType || ActionTypeConstants.SAVE, payload: { [payloadName]: res.data?.body } });

                if (res.data?.message)
                    toast.success(res.data.message);

                return res.data;
            })
            .catch(err => {
                console.log('post request error',err)

                if (err.response.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response?.data?.errors?.[0]?.message);

                return err;
            });
    };

    static PutData = (url, data, config) => {
        return request
            .put(url, data, config)
            .then(res => {
                if (res.data?.message)
                    toast.success(res.data.message);

                return res.data;
            })
            .catch(err => {
                console.log('put request error',err)
                if (err.response.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response?.data?.errors?.[0]?.message);
            });
    };

    static Delete= (url, callBack) => {
        request
            .delete(url)
            .then(res => {
                if (res.data?.message)
                    toast.success(res.data.message);

                if (callBack)
                    callBack();
            })
            .catch(err => {
                console.log('delete request error',err)
                if (err.response.status === 403)
                    toast.error('Please! Login or Sign up first')
                else
                    toast.error(err.response.data.errors[0].message);
            })
    }

    static GetApiImg = url => config.apiEndpoint + `/file/${url}`;

    static GetApiKeys = () => {
        const storeItem = storage.get(config.storageKey);

        if (!storeItem || !storeItem.settings)
            storage.set(config.storageKey, {settings: {languageCode: config.defaultLanguage}});

        const language = get(storeItem, 'settings.languageCode', config.defaultLanguage);

        this.FetchData(`/language/value/${language}`)
            .then(res => {
                if (res)
                    store.dispatch({ type: ActionTypeConstants.SAVE, payloadName: 'apiKeys', payload: res })
            });
    }
}

export default Auth;