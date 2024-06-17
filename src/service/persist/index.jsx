import React from "react";
import {PersistGate} from "redux-persist/integration/react";

import { persistor } from "../../store/provider";

const Persist = ({children}) => (
    <PersistGate loading={<div>Redux Loading.... </div>} persistor={persistor}>
        {children}
    </PersistGate>
);

export default Persist;
