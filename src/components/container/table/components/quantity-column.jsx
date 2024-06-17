import React, {memo} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {connect} from "react-redux";

import Button from "../../../reusable/button";
import ActionTypeConstants from "../../../../constants/actionTypeConstants";

const QuantityColumn = ({product, quantity, increaseCount, decreaseCount, p, variant, justifyContent, gap}) => {

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: justifyContent,
                gap: gap || '10px',
            }}
        >
                <Button
                    onClick={() => decreaseCount(product.id)}
                    sx={{width: 'fit-content', padding: p || '4px 18px'}}
                >
                    -
                </Button>

                <Typography variant={variant || 'h5'}>
                    {quantity}
                </Typography>

                <Button
                    onClick={() => increaseCount(product.id)}
                    sx={{width: 'fit-content', padding: p || '4px 16px'}}
                >
                    +
                </Button>
        </Box>
    )
}

const mapDispatchToProps = (dispatch) => ({
    increaseCount: (data) => dispatch({
        payloadName: 'cart',
        type: ActionTypeConstants.INCREASE_DECREASE_COUNT,
        payload: data,
        mode: ActionTypeConstants.INCREASE
    }),
    decreaseCount: (data) => dispatch({
        payloadName: 'cart',
        type: ActionTypeConstants.INCREASE_DECREASE_COUNT,
        payload: data,
        mode: ActionTypeConstants.DECREASE
    }),
});

export default connect(null, mapDispatchToProps)(memo(QuantityColumn));