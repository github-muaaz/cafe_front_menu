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
import CategoryCreateModal from "../../components/modals/category-create-modal";

const Category = ({t, categories, state, editCategory}) => {

    console.log('state', state);

    const [modalBody, setModalBody] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const fetchCategories = useCallback(() => {
        setLoading(true);
        Api.FetchData(`/category/list/${pageNum}/10`, {
            payloadName: 'adminCategories',
            type: ActionTypeConstants.SAVE_LIST,
        }).then(() => {
            setLoading(false);
        });
    }, [pageNum]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleModalClose = () => setModalBody(null);

    const handleRenderModal = (id) => {
        setModalBody(<CategoryCreateModal id={id} onClose={handleModalClose}/>);
    }

    useEffect(() => {
        const handleScroll = (e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom && !loading)
                setPageNum(prevPageNum => prevPageNum + 1);
        };

        const container = document.getElementById('categoryTableContainer');

        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <Stack height={'100%'} spacing={2}>
            <CustomModal
                width={isMobile ? '90%' : '70%'}
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
                    {t('Category')}
                </Typography>

                <Button
                    width={'fit-content'}
                    onClick={() => handleRenderModal()}
                >
                    {t('Add new')}
                </Button>
            </Box>

            <Line/>

            <SingleLineTable
                id={'categoryTableContainer'}
                noBorder={true}
                items={categories}
                columns={[
                    {
                        header: t('Name'),
                        accessor: 'name',
                    },
                    {
                        header: t('Parent'),
                        accessor: 'parent',
                        customColumn: (parent) => (
                            <div className={'box'}>
                                <Typography variant={'h5'}>
                                    {parent?.name}
                                </Typography>
                            </div>
                        )
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
                                                Api.PutData(`/category/status/${id}/${option}`)
                                                    .then((res) => {
                                                        editCategory(res.body)
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
                                    onClick={() => handleRenderModal(id)}
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
    categories: state.adminCategories,
    state
});

const mapDispatchToProps = (dispatch) => ({
    editCategory: (data) => dispatch({
        payloadName: 'adminCategories',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
})

export default withLanguage()(connect(mapStateToProps, mapDispatchToProps)(Category));
