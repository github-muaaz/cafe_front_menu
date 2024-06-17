import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutManager from "../layout/layoutManager";
import history from "./history";
import Auth from "../service/auth";

const LoginPage = lazy(() => import("../pages/sign-in"));
const ForgotPasswordPage = lazy(() => import("../pages/forgot-password"));
const MenuPage = lazy(() => import("../modules/menu"));
const ProductPage = lazy(() => import("../modules/product"));
const CategoryPage = lazy(() => import("../modules/category"));
const LanguagePage = lazy(() => import("../modules/language"));
const LanguageKeyPage = lazy(() => import("../modules/language-key"));

const Router = () => {
    return (
        <BrowserRouter history={history}>
            <Auth>
                <Suspense fallback={<div>Lazy Loading...</div>}>
                    <LayoutManager>
                        <Routes>
                            <Route
                                exact
                                path={"/"}
                                element={<div>home</div>}
                            />

                            <Route
                                exact
                                path={"/login"}
                                element={<LoginPage />}
                            />

                            <Route
                                exact
                                path={"/forgot-password"}
                                element={<ForgotPasswordPage />}
                            />

                            <Route
                                exact
                                path={"/menu/:category"}
                                element={<MenuPage />}
                            />

                            <Route
                                exact
                                path={"/products"}
                                element={<ProductPage/>}
                            />

                            <Route
                                exact
                                path={"/category"}
                                element={<CategoryPage/>}
                            />

                            <Route
                                exact
                                path={"/language"}
                                element={<LanguagePage/>}
                            />

                            <Route
                                exact
                                path={"/language-key"}
                                element={<LanguageKeyPage/>}
                            />

                        </Routes>
                    </LayoutManager>
                </Suspense>
            </Auth>
        </BrowserRouter>
    );
};

export default Router;
