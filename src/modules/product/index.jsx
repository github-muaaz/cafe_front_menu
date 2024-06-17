import React, {useCallback, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Stack, Typography, useMediaQuery} from "@mui/material";

import Button from "../../components/reusable/button";
import Line from "../../components/reusable/line";
import withLanguage from "../../language/withLanguage";
import SingleLineTable from "../../components/container/table/single-line";
import Api from "../../service/api";
import ActionTypeConstants from "../../constants/actionTypeConstants";
import Icon from "../../components/reusable/icon";
import StatusDropdown from "../../components/container/table/components/status-dropdown";
import {ProductOptions} from "../../utils";
import CustomModal from "../../components/reusable/modal";
import ProductCreateModal from "../../components/modals/product-create-modal";

const Product = ({t, products, state, editProduct}) => {

    console.log('state', state);

    const [modalBody, setModalBody] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const fetchProducts = useCallback(() => {
        setLoading(true);
        Api.FetchData(`/product/list/${pageNum}/10`, {
            payloadName: 'adminProducts',
            type: ActionTypeConstants.SAVE_LIST,
        }).then(() => {
            setLoading(false);
        });
    }, [pageNum]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleModalClose = () => setModalBody(null);

    const handleRenderModal = (modal, id) => {
        const modals = {
            add: <ProductCreateModal onClose={handleModalClose}/>,
            edit: <ProductCreateModal id={id} onClose={handleModalClose}/>,
        }

        setModalBody(modals[modal]);
    }

    useEffect(() => {
        const handleScroll = (e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom && !loading)
                setPageNum(prevPageNum => prevPageNum + 1);
        };

        const container = document.getElementById('productTableContainer');

        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <Stack height={'100%'} spacing={isMobile ? 1.5 : 2}>
            <CustomModal
                width={'90%'}
                onClose={handleModalClose}
                padding={'25px 30px'}
            >
                {modalBody}
            </CustomModal>

            <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Typography variant={'h2'}>
                    {t('Products')}
                </Typography>

                <Button
                    width={'fit-content'}
                    onClick={() => handleRenderModal('add')}
                >
                    {t('Add new')}
                </Button>
            </Box>

            <Line/>

            <SingleLineTable
                id={'productTableContainer'}
                noBorder={true}
                items={products}
                columns={[
                    {
                        header: t('Title'),
                        accessor: 'title',
                    },
                    {
                        header: t('Price'),
                        accessor: ['price', 'currency'],
                        customColumn: (price, currency) => (
                            <div className={'box'}>
                                <Typography variant={'h5'} sx={{whiteSpace: 'nowrap'}}>
                                    {`${price} ${currency}`}
                                </Typography>
                            </div>
                        )
                    },
                    {
                        header: t('Unit'),
                        accessor: 'unit',
                    },
                    {
                        header: t('Status'),
                        accessor: ['id', 'status'],
                        customColumn: (id, status) => (
                            status === 'DELETED'
                                ? <Typography color={'red'}>{status}</Typography>
                                : <StatusDropdown
                                    closeOnClick={true}
                                    status={status}
                                    options={ProductOptions.map(option => ({
                                        title: option,
                                        onClick: () => {
                                            if (option !== status)
                                                Api.PutData(`/product/status/${id}/${option}`)
                                                    .then((res) => {
                                                        editProduct(res.body)
                                                    })
                                        }
                                    }))}
                                />
                        )
                    },
                    {
                        header: '',
                        accessor: 'id',
                        customColumn: (id) => (
                            <div className={'box'}>
                                <Icon
                                    onClick={() => handleRenderModal('edit', id)}
                                    icon={'pen'}
                                />
                            </div>
                        )
                    }
                ]}
            />
        </Stack>
    )
}

const mapStateToProps = (state) => ({
    products: state.adminProducts,
    state
});

const mapDispatchToProps = (dispatch) => ({
    editProduct: (data) => dispatch({
        payloadName: 'adminProducts',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
})

export default withLanguage()(connect(mapStateToProps, mapDispatchToProps)(Product));
