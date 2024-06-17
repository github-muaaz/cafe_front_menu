import React, {memo, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import {connect} from "react-redux";

import withLanguage from "../../../language/withLanguage";
import Icon from "../../reusable/icon";
import InputField from "../../reusable/form/input-field";
import Button from "../../reusable/button";
import Api from "../../../service/api";
import ActionTypeConstants from "../../../constants/actionTypeConstants";

const LanguageCreateModal = ({t, id, onClose, saveNew, editLanguage}) => {

    const [formData, setFormData] = useState({})
    const [allErrors, setAllErrors] = useState({});

    useEffect(() => {
        if (id) {
            Api.FetchData(`/language/${id}`)
                .then(res => {
                    setFormData(res.body);
                });
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (Object.keys(errors).length !== 0)
            return;

        Api.PostData(`language`, formData)
            .then((res) => {
                if (res.body) {
                    saveNew(res.body);
                    onClose();
                }
            })
    }

    const validate = () => {
        const errors = {};

        if (!formData.name || formData.name?.replace(/ /g, "")?.trim()?.length < 1)
            errors.name = t('Name cannot be empty');

        if (!formData.code || formData.code?.replace(/ /g, "")?.trim()?.length < 1)
            errors.code = t('Code cannot be empty');

        setAllErrors(errors)
        return errors;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (allErrors[name]) {
            setAllErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant={'h2'}>
                    {id ? t('Language edit') : t('Language create')}
                </Typography>

                <Icon icon={'dots'}/>
            </Box>

            <form onSubmit={handleSubmit}>
                <Stack
                    spacing={{xs: 2, sm: 3}}
                    useFlexGap
                    sx={{
                        maxHeight: '500px',
                        overflowY: 'auto',
                    }}
                >
                    <InputField
                        required={true}
                        error={allErrors.name}
                        name={"name"}
                        defaultValue={formData.name}
                        label={t("Name")}
                        onChange={handleChange}
                    />

                    <InputField
                        required={true}
                        error={allErrors.code}
                        name={"code"}
                        defaultValue={formData.code}
                        label={t("Code")}
                        onChange={handleChange}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '50px',
                            paddingBottom: '10px',
                        }}
                    >
                        <Button type={'button'} variant={'outlined'} onClick={onClose}>
                            {t('cancel')}
                        </Button>

                        <Button type={'submit'}>
                            {t('publish now')}
                        </Button>
                    </Box>
                </Stack>
            </form>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({
    saveNew: (data) => dispatch({
        payloadName: 'languages',
        type: ActionTypeConstants.NEW_TO_LIST,
        payload: data
    }),
    editLanguage: (data) => dispatch({
        payloadName: 'languages',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
});

export default withLanguage()(connect(null, mapDispatchToProps)(memo(LanguageCreateModal)));