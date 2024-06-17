import React, {memo, useState} from "react";
import {connect} from "react-redux";
import {Stack, Typography} from "@mui/material";

import Button from "../../reusable/button";
import storage from "../../../store/local-storage";
import configJson from "../../../config.json";
import Api from "../../../service/api";
import Icon from "../../reusable/icon";

const LanguagePopover = ({languages, handleClose}) => {

    const [active, setActive] = useState(storage.get(configJson.storageKey)?.settings?.languageCode || configJson.defaultLanguage);

    const handleClick = (languageCode) => {
        const setting = storage.get(configJson.storageKey)?.settings;

        storage.set(configJson.storageKey, {settings: {...setting, languageCode: languageCode}});

        Api.GetApiKeys();

        setActive(languageCode);
        // console.log('lang', storage.get(configJson.storageKey))
    }

    return (
        <Stack
            spacing={2}
            sx={{
                bgcolor: 'off_white',
                p: '40px',
                alignItems: "center",
                justifyContent: "center",
                overflow: 'hidden'
            }}
        >
            {languages?.filter(language => language.status === 'ACTIVE')?.map(language => {
                return (
                    <Button
                        variant={active !== language.code && 'outlined'}
                        key={language.code}
                        width={'fit-content'}
                        onClick={() => {
                            handleClick(language.code);
                            handleClose();
                        }}
                        sx={{
                            gap: '5px'
                        }}
                    >
                        {active === language.code &&
                            <Icon width={25} height={25} icon={'done'}/>
                        }

                        <Typography>
                            {language.name}
                        </Typography>
                    </Button>
                )
            })}
        </Stack>
    )
}

const mapStateToProps = (state) => ({
    languages: state.languages,
});

export default connect(mapStateToProps)(memo(LanguagePopover));