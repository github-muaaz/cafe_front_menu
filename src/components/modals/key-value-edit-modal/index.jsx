import React, {memo, useState} from "react";
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import {connect} from "react-redux";

import withLanguage from "../../../language/withLanguage";
import Icon from "../../reusable/icon";
import InputField from "../../reusable/form/input-field";
import Button from "../../reusable/button";
import Api from "../../../service/api";
import ActionTypeConstants from "../../../constants/actionTypeConstants";

const KeyValueEditModal = ({t, item, onClose, languages, editKeyValues}) => {

    const [formData, setFormData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = Object.values(formData)

        Api.PostData(`language/value/${item.id}`, data)
            .then((res) => {
                if (res.body) {
                    console.log('res', res)
                    editKeyValues(res.body)
                    onClose();
                }
            })
    }

    const handleChange = (event) => {
        const { value, id: valueId, name: languageId } = event.target;

        setFormData(prev => {
            return ({
                ...prev,
                    [languageId]: {
                        languageKeyId: item.id,
                        languageId: languageId,
                        value: value,
                        id: valueId,
                }
            })
        });
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
                    {t('Key value edit')}
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
                        name={"key"}
                        defaultValue={item.key}
                        label={t("Key")}
                        inputProps={{ readOnly: true }}
                    />

                    {languages?.map(language => {
                        const val = item?.values?.filter(v => v.languageId === language.id)?.[0] || {};

                        return (
                            <InputField
                                id={val.id}
                                name={language.id}
                                defaultValue={val.value}
                                label={language.name}
                                onChange={handleChange}
                            />
                        )
                    })}

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

const mapStateToProps = (state) => ({
    languages: state.languages,
    state
});

const mapDispatchToProps = (dispatch) => ({
    editKeyValues: (data) => dispatch({
        payloadName: 'keyValue',
        type: ActionTypeConstants.EDIT_LIST,
        payload: data,
    }),
});

export default withLanguage()(connect(mapStateToProps, mapDispatchToProps)(memo(KeyValueEditModal)));