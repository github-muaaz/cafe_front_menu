import React, {useState} from "react";
import Box from "@mui/material/Box";
import {styled, Typography} from "@mui/material";

import Image from "../../reusable/img";
import Button from "../../reusable/button";
import CustomModal from "../../reusable/modal";
import ProductDetail from "../../modals/product-detail";
import DiscountBox from "../../reusable/discount-box";
import StatusConstants from "../../../constants/status-constants";

const Container = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.off_white,
    border: `1.5px solid ${theme.palette.soft_grey}`,
    borderRadius: '14px',
    padding: '25px 30px',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    cursor: 'pointer',
    overflow: 'hidden'
}));

const ProductCard = ({product, cart}) => {

    const [modalBody, setModalBody] = useState(null);

    const handleDetails = () => {
        if (product.status === StatusConstants.NON_ACTIVE)
            return;

        setModalBody(() => (
            <ProductDetail
                onClose={() => setModalBody(null)}
                product={product}
            />
        ));
    }

    return (
        <React.Fragment>
            <CustomModal width={'80%'} onClose={() => setModalBody(null)}>
                {modalBody}
            </CustomModal>

            <Container onClick={handleDetails}>
                {product.discount && <DiscountBox discount={product.discount}/>}

                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Image maxHeight={'240px'} src={product.images?.[0]}/>

                    <Button
                        type={'icon'}
                        sx={{
                            position: 'absolute',
                            top: '-5%',
                            right: '-5%',
                            padding: '10px 16px',
                        }}
                        bgColor={'dark_green_grey'}
                        icon={'bucket'}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        height: '100%',
                        gap: '30px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant={'h4'} textAlign={'center'}>
                        {product.title}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'end',
                        }}
                    >
                        <Typography variant={'h3'}>
                            {`${product.price} ${product.currency}`}
                        </Typography>

                        <Typography variant={'h5'}>
                            {product.unit}
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default ProductCard;