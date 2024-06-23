import React from 'react';
import ReactDOM from 'react-dom/client';
import {StyledEngineProvider} from '@mui/material/styles';
import {ToastContainer} from "react-toastify";

import Store from "./store";
import Router from "./router";
import Theme from "./theme";
import Language from "./language";
import AuthLoader from "./service/auth/authLoader";

import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Store>
                <AuthLoader>
                    <Theme>
                        <Language>
                            <Router/>
                        </Language>
                    </Theme>
                </AuthLoader>
            </Store>
        </StyledEngineProvider>

        <ToastContainer position="top-left"/>
    </React.StrictMode>
);