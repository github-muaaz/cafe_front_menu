import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {Container} from "@mui/material";

import AdminLayout from "./admin/adminLayout";
import AuthLayout from "./auth/authLayout";
import NotFoundLayout from "./notFound/notFoundLayout";

const LayoutManager = ({children}) => {

    const [containerHeight, setContainerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setContainerHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getLayout = pathname => {

        if (pathname.includes('404'))
            return 'notFound';

        if (/^\/login(?=\/|$)/i.test(pathname) || /^\/forgot-password(?=\/|$)/i.test(pathname))
            return 'auth';

        return 'admin';
    };

    const getLayouts = () => {
        return {
            admin: AdminLayout,
            auth: AuthLayout,
            notFound: NotFoundLayout,
        }
    };

    const {pathname} = useLocation();

    const Layout = getLayouts()[getLayout(pathname)];

    return (
        <Container
            sx={{
                bgcolor: 'dark_green_grey',
                display: 'flex',
                flexDirection: 'column',
                height: containerHeight,
            }}
            style={{padding: 0}}
        >
            <Layout>
                {children}
            </Layout>
        </Container>
    );
}

export default LayoutManager;