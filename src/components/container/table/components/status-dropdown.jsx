import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

import Status from "../../../reusable/status";
import DropDown from "../../../reusable/dropdown";

const StatusColumn = ({status, options, closeOnClick}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => setAnchorEl(null);
    const handleOpenPopover = (event, component) => setAnchorEl(event.currentTarget);

    return (
        <Box
            className={'box'}
            sx={{
                bgcolor: 'off_white',
                p: '27px 0'
            }}
        >
            <Status
                value={status}
                onClick={(e) => handleOpenPopover(e, 'language')}
            />

            <DropDown
                anchorEl={anchorEl}
                onClose={handleClose}
                position={'left'}
            >
                {
                    <Stack
                        sx={{
                            p: '15px',
                            bgcolor: 'white'
                        }}
                    >
                        {
                            options?.map((option, index) => (
                                <Status
                                    key={option.title + index}
                                    value={option.title}
                                    onClick={closeOnClick
                                        ? () => {option.onClick(); handleClose()}
                                        : option.onClick}
                                />
                            ))
                        }
                    </Stack>
                }
            </DropDown>
        </Box>
    )
}

export default StatusColumn;