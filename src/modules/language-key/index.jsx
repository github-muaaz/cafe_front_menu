import React, {useCallback, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Stack, Typography, useMediaQuery} from "@mui/material";

import Line from "../../components/reusable/line";
import withLanguage from "../../language/withLanguage";
import SingleLineTable from "../../components/container/table/single-line";
import Api from "../../service/api";
import ActionTypeConstants from "../../constants/actionTypeConstants";
import Icon from "../../components/reusable/icon";
import CustomModal from "../../components/reusable/modal";
import KeyValueEditModal from "../../components/modals/key-value-edit-modal";

const LanguageKey = ({t, keyValue, languages = []}) => {

    const [modalBody, setModalBody] = useState(null);
    const [pageNum, setPageNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const fetchCategories = useCallback(() => {
        setLoading(true);
        Api.FetchData(`/language/key-value/${pageNum}/10`, {
            payloadName: 'keyValue',
            type: ActionTypeConstants.SAVE_LIST,
        }).then(() => {
            setLoading(false);
        });
    }, [pageNum]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleModalClose = () => setModalBody(null);

    const handleRenderModal = (item) => {
        setModalBody(<KeyValueEditModal item={item} onClose={handleModalClose}/>);
    }

    useEffect(() => {
        const handleScroll = (e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom && !loading)
                setPageNum(prevPageNum => prevPageNum + 1);
        };

        const container = document.getElementById('keyValueTableContainer');

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
                    {t('Key values')}
                </Typography>
            </Box>

            <Line/>

            <SingleLineTable
                id={'keyValueTableContainer'}
                noBorder={true}
                items={keyValue}
                columns={[
                    {
                        header: t('Key'),
                        accessor: 'key',
                    },
                    ...languages?.map(language => ({
                        header: language.name,
                        accessor: 'values',
                        customColumn: (values) => {
                            let newV = values.filter(v => v.languageId === language.id);

                            return <div className={'box'}>
                                <Typography variant={'h5'}>
                                    {newV?.[0]?.value || '-'}
                                </Typography>
                            </div>
                        }
                    })),
                    {
                        header: '',
                        accessor: 1,
                        customColumn: (item) => (
                            <div className={'box'}>
                                <Icon
                                    onClick={() => handleRenderModal(item)}
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
    keyValue: state.keyValue,
    languages: state.languages,
    state
});

export default withLanguage()(connect(mapStateToProps)(LanguageKey));
