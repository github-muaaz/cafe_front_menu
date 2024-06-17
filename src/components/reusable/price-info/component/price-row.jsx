import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

const PriceRow = ({title, value, dotSize, variant}) => {

    return(
        <Box
            sx={{
                display: 'flex',
                alignItems: 'end',
            }}
        >
            <Typography variant={variant || 'h6'}>
                {title}
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    borderBottom: `${dotSize || '2px'} dotted #283618`,
                    margin: '8px',
                }}
            />
            <Typography variant={variant || 'h6'} sx={{whiteSpace: 'nowrap'}}>
                {value}
            </Typography>
        </Box>
    )
}

export default PriceRow;