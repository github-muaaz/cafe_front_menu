import {useEffect} from "react";

import ActionTypeConstants from "../constants/actionTypeConstants";
import Api from "../service/api";

const Language = ({children}) => {

    useEffect(() => {

        Api.GetApiKeys()

        Api.FetchData(
            `/language`,
            { payloadName: 'languages', type: ActionTypeConstants.SAVE_LIST }
        )
            .then();

    }, []);

    return children;
}

export default Language;

