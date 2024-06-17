import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {capitalize} from "lodash/string";
import {get} from "lodash";

import Api from "../service/api";
import ActionTypeConstants from "../constants/actionTypeConstants";

const withLanguage = () => (Child) => {
    return (props) => {
        const dispatch = useDispatch();
        const apiKeys = useSelector(state => state.apiKeys);

        const t = useCallback((key, noCapitalize = false) => {
            const fetchLanguageKey = async (key) => {
                try {
                    const res = await Api.PostData(`/language/key`, [{key}]);
                    dispatch({type: ActionTypeConstants.SAVE_KEYS, payload: res?.body});
                } catch (error) {
                    console.error('Error fetching language key:', error);
                }
            };

            key = key.toLowerCase().trim();
            const value = get(apiKeys, key);

            if (apiKeys && !(key in apiKeys))
                fetchLanguageKey(key).then();

            if (noCapitalize){
                if (!value)
                    return key;

                return value;
            } else {
                if (!value)
                    return capitalize(key);

                return capitalize(value);
            }
        }, [apiKeys, dispatch]);

        return <Child {...props} t={t}/>;
    };
};


export default withLanguage
