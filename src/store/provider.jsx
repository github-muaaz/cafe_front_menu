import React from "react";
import { Provider } from "react-redux";
import reduxStore from "./reduxStore";

const Store = ({ children }) => <Provider store={reduxStore}>{ children }</Provider>;

export default Store;