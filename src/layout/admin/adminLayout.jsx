import React, {useState} from "react";

import Box from "@mui/material/Box";
import Header from "../../components/admin/header";
import {CategoryProvider} from "../../context/category-context";
import UtilConstants from "../../constants/util-constants";

const AdminLayout = ({children}) => {

    const [currentTab, setCurrentTab] = useState(UtilConstants.All);

    return (
        <React.Fragment>
            <Header/>

            <CategoryProvider value={{currentTab, setCurrentTab}}>
                <Box
                    sx={{
                        borderRadius: '30px 30px 0 0',
                        bgcolor: 'white',
                        p: '30px',
                        height: window.innerHeight - 138,
                        [`@media (max-width:600px)`]: {
                            padding: '15px',
                            borderRadius: '15px 15px 0 0',
                        }
                    }}
                >
                    {children}
                </Box>
            </CategoryProvider>
        </React.Fragment>
    )
}

export default AdminLayout;