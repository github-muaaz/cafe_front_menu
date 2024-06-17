import React, {useState} from "react";
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
import LanguageCreateModal from "../../components/modals/language-create-modal";

const Language = ({t, languages, state, editLanguage}) => {

    console.log('state', state);

    const [modalBody, setModalBody] = useState(null);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleModalClose = () => setModalBody(null);

    const handleRenderModal = (id) => {
        setModalBody(<LanguageCreateModal id={id} onClose={handleModalClose}/>);
    }

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
                    {t('Language')}
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
                id={'languageTableContainer'}
                noBorder={true}
                items={languages}
                columns={[
                    {
                        header: t('Name'),
                        accessor: 'name',
                    },
                    {
                        header: t('Code'),
                        accessor: 'code',
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
                                                Api.PutData(`/language/status/${id}/${option}`)
                                                    .then((res) => {
                                                        editLanguage(res.body)
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
    languages: state.languages,
    state
});

const mapDispatchToProps = (dispatch) => ({
    editLanguage: (data) => dispatch({
        payloadName: 'languages',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
})

export default withLanguage()(connect(mapStateToProps, mapDispatchToProps)(Language));
