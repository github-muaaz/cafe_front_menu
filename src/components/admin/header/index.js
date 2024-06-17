import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Drawer, IconButton, Typography, useMediaQuery} from "@mui/material";

import Icon from "../../reusable/icon";
import Button from "../../reusable/button";
import LanguagePopover from "../popovers/language-popover";
import Sidebar from "../sidebar";
import DropDown from "../../reusable/dropdown";

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [popover, setPopover] = useState(null);
    const [sidebar, setSidebar] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const toggleDrawer = (newOpen) => () => setSidebar(newOpen);

    const handleClose = () => setAnchorEl(null);

    const handleOpenPopover = (event, component) => {
        const components = {
            language: <LanguagePopover handleClose={handleClose}/>,
        }

        setPopover(components[component]);
        setAnchorEl(event.currentTarget);
    }

    return (
        <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
                p: "20px 30px",
                [`@media (max-width:600px)`]: {
                    p: '10px 10px 10px'
                }
            }}
        >
            <Box display={'flex'} alignItems={'center'} gap={1}>
                <IconButton>
                    <Icon width={isMobile && 35} onClick={toggleDrawer(true)} icon={'menu'}/>
                </IconButton>
                <Typography color={'off_white'} variant={'h4'}>O'zbekchasiga</Typography>
            </Box>

            <Box display="flex" gap={3} alignItems={'center'}>
                <Button
                    type={'icon'}
                    icon={'language'}
                    onClick={(e) => handleOpenPopover(e, 'language')}
                />

                <DropDown
                    anchorEl={anchorEl}
                    onClose={handleClose}
                >
                    {popover}
                </DropDown>
            </Box>

            <Drawer open={sidebar} onClose={toggleDrawer(false)}>
                <Sidebar onClose={toggleDrawer(false)}/>
            </Drawer>
        </Box>
    );
};

export default Header;
