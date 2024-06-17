import React from 'react';
import {NavLink} from "react-router-dom";

const NotFoundLayout = () => {
    return (
        <>
            NotFoundPage

            <NavLink to={'/login'}>Login</NavLink>
        </>
    );
};

export default NotFoundLayout;
