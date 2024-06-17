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
import SimpleSelect from "../../reusable/form/simple-select";

const CategoryCreateModal = ({t, id, onClose, saveNew, editCategory}) => {

    const [formData, setFormData] = useState({})
    const [allErrors, setAllErrors] = useState({});

    useEffect(() => {
        if (id) {
            Api.FetchData(`/category/${id}`)
                .then(res => {
                    console.log('defff', res)
                    setFormData(res.body);
                });
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (Object.keys(errors).length !== 0)
            return;

        if (!id)
            Api.PostData(`category`, formData)
                .then((res) => {
                    if (res.body) {
                        saveNew(res.body);
                        onClose();
                    }
                })
        else
            Api.PutData(`/category/${id}`, formData)
                .then(res => {
                    if (res.body) {
                        editCategory(res.body);
                        onClose();
                    }
                })
    }

    const validate = () => {
        const errors = {};

        if (!formData.name || formData.name?.replace(/ /g, "")?.trim()?.length < 1)
            errors.name = t('Name cannot be empty');

        if (!formData.parentId)
            errors.parent = t('Choose parent');

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
                    {id ? t('Category edit') : t('Category create')}
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

                    <SimpleSelect
                        name="parentId"
                        label="Parent"
                        placeholder={t('Select parent')}
                        error={allErrors.parent}
                        required={true}
                        onChange={handleChange}
                        defaultValue={formData.parent?.id}
                        optionsUrl={`/category/parent/null`}
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
        payloadName: 'adminCategories',
        type: ActionTypeConstants.NEW_TO_LIST,
        payload: data
    }),
    editCategory: (data) => dispatch({
        payloadName: 'adminCategories',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
});

export default withLanguage()(connect(null, mapDispatchToProps)(memo(CategoryCreateModal)));