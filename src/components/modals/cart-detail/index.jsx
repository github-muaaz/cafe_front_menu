import React, {memo, useState} from "react";
import {Typography} from "@mui/material";
import {connect} from "react-redux";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";

import withLanguage from "../../../language/withLanguage";
import Button from "../../reusable/button";
import SingleLineTable from "../../container/table/single-line";
import ActionTypeConstants from "../../../constants/actionTypeConstants";
import {getDiscountPrice, getTotalPriceWithoutDiscount} from "../../../utils";
import Icon from "../../reusable/icon";
import CustomModal from "../../reusable/modal";
import ItemColumn from "../../container/table/components/item-column";
import PriceColumn2 from "../../container/table/components/price-column-2";
import QuantityColumn from "../../container/table/components/quantity-column";
import PriceInfo from "../../reusable/price-info";

const CartDetail = ({t, cart, onClose, changeModal, clearCart, currentTable}) => {

    const [modalBody, setModalBody] = useState(null);

    const handleModalClose = () => setModalBody(null);

    const handleOrder = () => {
        if (Object.values(cart || {}).filter(cartProduct => cartProduct.quantity > 0).length === 0) {
            toast.error(t('No selected products'));
            return;
        }

        if (!currentTable) {
            toast.error('Please, select table first');
            return;
        }

        // setModalBody(<OrderModal clearCart={clearCart} cart={cart} currentTable={currentTable} closeOrderList={onClose}
        //                          onClose={handleModalClose}/>);
    }

    return (
        <React.Fragment>
            <CustomModal onClose={() => setModalBody(null)}>
                {modalBody}
            </CustomModal>

            <Box
                display={'flex'}
                justifyContent={'space-between'}
            >
                <Typography variant={'h2'}>
                    {t('Your current order')}
                </Typography>

                <Icon width={'35px'} onClick={onClose} icon={'x'}/>
            </Box>

            {currentTable &&
                <Button onClick={changeModal}>{t('Show order history', true)}</Button>
            }

            <Box sx={{maxHeight: '50%', overflowY: 'auto'}}>
                <SingleLineTable
                    items={Object.values(cart || {})}
                    columns={[
                        {
                            header: t('Item'),
                            accessor: 'product',
                            customColumn: (product) => (
                                <ItemColumn product={product}/>
                            )
                        },
                        {
                            header: t('Quantity'),
                            accessor: ['product', 'quantity'],
                            customColumn: (product, quantity) => (
                                <QuantityColumn product={product} quantity={quantity}/>
                            )
                        },
                        {
                            header: t('Price'),
                            accessor: ['product', 'quantity'],
                            customColumn: (product, quantity) => (
                                <PriceColumn2 product={product} quantity={quantity}/>
                            )
                        },
                    ]}
                />
            </Box>

            <PriceInfo
                values={[
                    cart
                        ? `${getTotalPriceWithoutDiscount(cart)} ${Object.values(cart || {})?.[0]?.product?.currency || ''}`
                        : 0,
                    cart
                        ? `${getDiscountPrice(cart)} ${Object.values(cart || {})?.[0]?.product?.currency || ''}`
                        : 0,
                    cart
                        ? `${getTotalPriceWithoutDiscount(cart) - getDiscountPrice(cart)} ${Object.values(cart || {})?.[0]?.product?.currency || ''}`
                        : 0
                ]}
            />

            <Box
                sx={{
                    display: 'flex',
                    gap: '15px',
                }}
            >
                <Button
                    onClick={clearCart}
                    sx={{width: 'fit-content'}}
                    variant={'outlined'}
                >
                    {t('clear cart')}
                </Button>

                <Button onClick={handleOrder}>
                    {t('order now')}
                </Button>
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    currentTable: state.currentTable,
    state
});

const mapDispatchToProps = (dispatch) => ({
    clearCart: () => dispatch({
        payloadName: 'cart',
        type: ActionTypeConstants.DELETE
    })
});

export default withLanguage()(connect(mapStateToProps, mapDispatchToProps)(memo(CartDetail)));