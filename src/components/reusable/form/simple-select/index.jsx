import {FormControl, FormHelperText, FormLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import Api from "../../../../service/api";

const SelectField = ({
                         name,
                         label,
                         placeholder,
                         error,
                         required,
                         onChange,
                         defaultValue,
                         optionItems,
                         optionsUrl,
    optionKey = 'id',
                         ...rest
                     }) => {
    const [value, setValue] = useState(defaultValue || '');
    const [options, setOptions] = useState(optionItems || []);

    useEffect(() => {
        if (optionsUrl)
            Api.FetchData(optionsUrl)
                .then(res => {
                    setOptions(res.body);
                });
    }, [optionsUrl]);

    useEffect(() => {
        setValue(defaultValue || '');
        console.log('opop', defaultValue)
    }, [defaultValue]);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (onChange) onChange(event);
    };

    return (
        <FormControl
            size="small"
            component="fieldset"
            fullWidth
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                [`@media (max-width:600px)`]: {
                    gap: '8px',
                },
            }}
        >
            <FormLabel
                error={!!error}
                sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'dark_green_grey',
                    [`@media (max-width:600px)`]: {
                        fontSize: '16px',
                    },
                }}
                htmlFor={name}
            >
                {`${label} ${required ? '*' : ''}`}
            </FormLabel>

            {error && (
                <FormHelperText
                    error
                    id="component-error-text"
                    variant="small"
                    sx={{
                        fontSize: '16px',
                        [`@media (max-width:600px)`]: {
                            fontSize: '14px',
                        },
                    }}
                >
                    {error}
                </FormHelperText>
            )}

            <Select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                displayEmpty
                {...rest}
                sx={{
                    border: '1px solid #D4D4D4',
                    borderRadius: '14px',
                    p: '0px 18px',
                    fontSize: '20px',
                    bgcolor: 'off_white',
                    [`@media (max-width:600px)`]: {
                        p: '0px 14px',
                        fontSize: '16px',
                    },
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            fontSize: '20px',
                            bgcolor: 'off_white',
                            color: 'dark_green_grey',
                            [`@media (max-width:600px)`]: {
                                fontSize: '16px',
                            },
                            '& .MuiMenuItem-root': {
                                bgcolor: 'off_white',
                                '&:hover': {
                                    bgcolor: 'soft_grey',
                                },
                                '&.Mui-selected': {
                                    bgcolor: 'light_green_grey',
                                    '&:hover': {
                                        bgcolor: 'soft_grey',
                                    }
                                }
                            }
                        }
                    }
                }}
            >
                {placeholder && (
                    <MenuItem value="" disabled>
                        {placeholder}
                    </MenuItem>
                )}
                {options.map((option, index) => (
                    <MenuItem key={index} value={option[optionKey]}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SelectField;
