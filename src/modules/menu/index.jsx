import {Stack, useMediaQuery} from "@mui/material";
import React from "react";

import Tabs from "../../components/admin/tabs";
import ProductContainer from "../../components/container/product-container";
import Footer from "../../components/admin/footer";

const Menu = () => {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <React.Fragment>
            <Stack
                spacing={isMobile ? 1 : 2}
                sx={{
                    position: 'relative',
                    height: '100%',
                }}
            >
                <Tabs/>

                <ProductContainer/>
            </Stack>

            <Footer/>
        </React.Fragment>
    )
}

export default Menu;