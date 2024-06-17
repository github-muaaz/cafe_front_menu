import React from "react";
import {Stack, Typography} from "@mui/material";
import {getActualPrice, parsePrice} from "../../../../utils";

const PriceColumn2 = ({variant, discountVariant, product, quantity}) => {

    if (!product.discount)
        return (
            <Typography variant={variant || 'h5'}>
                {`${parsePrice(product.price) * quantity} ${product.currency}`}
            </Typography>
        )

    return (
        <Stack textAlign={'right'} width={'fit-content'}>
            <Typography variant={variant || 'h5'}>
                {`${getActualPrice(parsePrice(product.price), product.discount) * quantity} ${product.currency}`}
            </Typography>

            <Typography
                variant={discountVariant || 'h6'}
                sx={{
                    color: 'red',
                    textDecoration: 'line-through'
                }}
            >
                {`${parsePrice(product.price) * quantity} ${product.currency}`}
            </Typography>
        </Stack>
    )
}

export default PriceColumn2;