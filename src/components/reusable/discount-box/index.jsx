import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import withLanguage from "../../../language/withLanguage";

const DiscountBox = ({t, discount, position}) => {

    return (
        <Box
            sx={{
                position: position || 'absolute',
                left: 0,
                top: 0,
                bgcolor: 'dark_green_grey',
                p: '6px 15px',
                zIndex: '700',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderBottomRightRadius: '8px',
                color: 'white',
            }}
        >
            <Typography variant={'h4'}>
                {`${discount}%`}
            </Typography>

            <Typography variant={'tiny'}>
                {t('Discount')}
            </Typography>
        </Box>
    )
}

export default withLanguage()(DiscountBox);