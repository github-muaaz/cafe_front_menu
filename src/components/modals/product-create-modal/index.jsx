import React, {memo, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import {connect} from "react-redux";

import withLanguage from "../../../language/withLanguage";
import Icon from "../../reusable/icon";
import InputField from "../../reusable/form/input-field";
import FileInput from "../../reusable/form/file-input";
import InputList from "../../reusable/form/input-list";
import TextareaField from "../../reusable/form/textarea-field";
import Button from "../../reusable/button";
import CustomSelect from "../../reusable/form/custom-select";
import Api from "../../../service/api";
import ActionTypeConstants from "../../../constants/actionTypeConstants";
import SimpleSelect from "../../reusable/form/simple-select";

import {CurrencyOptions} from "../../../utils";

const ProductCreateModal = ({t, id, onClose, saveNew, editProduct}) => {

    const [formData, setFormData] = useState({})
    const [allErrors, setAllErrors] = useState({});
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        if (id) {
            Api.FetchData(`/product/${id}`)
                .then(res => {
                    const defaultV = {
                        ...res.body,
                        categoryIds: res?.body?.categories?.map(item => item.id) || [],
                        oldFiles: res.body?.images || []
                    }

                    delete defaultV.images;

                    setFormData(defaultV);
                });
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (Object.keys(errors).length !== 0)
            return;

        if (!id)
            Api.PostData(`product`, mapDataToSend())
                .then((res) => {
                    if (res.body) {
                        saveNew(res.body);
                        onClose();
                    }
                })
        else
            Api.PutData(`/product/${id}`, mapDataToSend(true))
                .then(res => {
                    if (res.body) {
                        editProduct(res.body);
                        onClose();
                    }
                })
    }

    const validate = () => {
        const errors = {};

        if((!formData.images || formData.images?.length < 1) && formData.oldFiles?.length < 1)
            errors.images = t('Choose At Least One Image');

        const maxFileSize = 5242880;
        const invalidFiles = formData.images?.filter(file => file.size > maxFileSize);

        if (invalidFiles?.length > 0)
            errors.images = t(`Maximum upload size exceeded for file(s):`) + invalidFiles?.map(file => `${file.name}: ${file.size}`).join(', ') + t('. Please choose smaller images.');

        if (!formData.title || formData.title?.replace(/ /g, "")?.trim()?.length < 1)
            errors.title = t('Title cannot be empty');

        if (!formData.categoryIds || formData.categoryIds?.length <= 0)
            errors.categoryIds = t('Choose at least one category');

        if (!formData.price || formData.price < 0 || !parseFloat(formData.price))
            errors.price = t('Enter price');

        if (!formData.currency)
            errors.currency = t('Enter currency');

        if (!formData.unit || formData.unit?.trim()?.length < 1)
            errors.unit = t('Enter unit');

        setAllErrors(errors)
        return errors;
    }

    const mapDataToSend = (editing) => {
        const formDataToSend = new FormData();

        formData.images?.forEach(image => formDataToSend.append(`images`, image));

        delete formData.images;

        if (editing){
            delete formData.categories;
            delete formData.status;
        }

        formDataToSend.append('model', JSON.stringify(formData));

        return formDataToSend;
    }

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (allErrors[name]) {
            setAllErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        if (type === 'number') {
            setFormData(prev => ({
                ...prev,
                [name]: parseFloat(value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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
                    {id ? t('Product edit') : t('Product create')}
                </Typography>

                <Icon height={isMobile && 25} icon={'dots'}/>
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
                    <FileInput
                        label={t('Image')}
                        name={'images'}
                        error={allErrors.images}
                        required={true}
                        defaultValue={formData.oldFiles}
                        onChange={handleChange}
                    />

                    <InputField
                        required={true}
                        error={allErrors.title}
                        name={"title"}
                        defaultValue={formData.title}
                        label={t("Title")}
                        onChange={handleChange}
                    />

                    <CustomSelect
                        required={true}
                        error={allErrors.categoryIds}
                        name={"categoryIds"}
                        label={t("Category")}
                        optionKey={'id'}
                        defaultValue={formData.categories}
                        optionValue={'name'}
                        placeholder={t('Type to search')}
                        optionsUrl={'category/query/15'}
                        onChange={handleChange}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '15px',
                            flexDirection: isMobile ? 'column' : 'row'
                        }}
                    >
                        <InputField
                            required={true}
                            error={allErrors.price}
                            name={"price"}
                            label={t("Price")}
                            type={'number'}
                            defaultValue={formData.price}
                            onChange={handleChange}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                gap: '15px',
                            }}
                        >
                            <SimpleSelect
                                name="currency"
                                label={t("Currency")}
                                error={allErrors.currency}
                                required={true}
                                optionKey={'name'}
                                onChange={handleChange}
                                defaultValue={CurrencyOptions
                                    .filter(option => option.name === formData.currency)
                                    ?.[0]?.name}
                                optionItems={CurrencyOptions}
                            />

                            <InputField
                                error={allErrors.discount}
                                name={"discount"}
                                label={t("Discount")}
                                defaultValue={formData.discount}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>

                    <InputField
                        required={true}
                        error={allErrors.unit}
                        name={"unit"}
                        label={t("Unit")}
                        defaultValue={formData.unit}
                        onChange={handleChange}
                    />

                    <InputList
                        error={allErrors.ingredients}
                        name={'ingredients'}
                        label={t("Ingredients")}
                        defaultValue={formData.ingredients}
                        onChange={handleChange}
                    />

                    <TextareaField
                        error={allErrors.description}
                        name={'description'}
                        label={t('Description')}
                        defaultValue={formData.description}
                        max={700}
                        onChange={handleChange}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '50px',
                            paddingBottom: '10px',
                            [`@media (max-width:600px)`]: {
                                gap: '20px'
                            }
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
        payloadName: 'adminProducts',
        type: ActionTypeConstants.NEW_TO_LIST,
        payload: data
    }),
    editProduct: (data) => dispatch({
        payloadName: 'adminProducts',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
});

export default withLanguage()(connect(null, mapDispatchToProps)(memo(ProductCreateModal)));