import React from "react";
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";

import Image from "../../../reusable/img";

const ItemColumn = ({product, imgWidth, titleVariant, unitVariant, priceVariant, discountVariant}) => {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <Image width={imgWidth || '70px'} height={imgWidth || '70px'} src={product.images[0]}/>

            <Stack width={'100%'}>
                <Typography variant={titleVariant || 'h5'}>
                    {product.title}
                </Typography>
                <Typography variant={unitVariant || 'paragraph'}>
                    {product.unit}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        paddingRight: '20px'
                    }}
                >
                    <Typography variant={priceVariant || 'h5'}>
                        {`${product.price} ${product.currency}`}
                    </Typography>

                    {product.discount &&
                        <Typography variant={discountVariant || 'tiny'} color={'red'}>
                            {`-${product.discount}%`}
                        </Typography>
                    }
                </Box>
            </Stack>
        </Box>
    )
}

export default ItemColumn;