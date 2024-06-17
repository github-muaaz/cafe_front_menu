import { FormControl, FormHelperText, FormLabel, InputBase as Input } from "@mui/material";
import { useState, useEffect } from "react";

const InputField = ({ name, label, placeholder, error, required, onChange, defaultValue, ...rest }) => {
    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        setValue(defaultValue || '');
    }, [defaultValue]);

    const handleChange = (event) => {
        setValue(event.target.value);
        if (onChange) onChange(event);
    };

    return (
        <FormControl
            component="fieldset"
            fullWidth
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
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

            {error &&
                <FormHelperText
                    error
                    id="component-error-text"
                    variant="small"
                    sx={{
                        fontSize: '16px',
                        [`@media (max-width:600px)`]: {
                            fontSize: '12px',
                        },
                    }}
                >
                    {error}
                </FormHelperText>
            }

            <Input
                id={name}
                name={name}
                type="text"
                error={!!error}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                {...rest}
                sx={{
                    border: '1px solid #D4D4D4',
                    borderRadius: '14px',
                    p: '3px 18px',
                    fontSize: '20px',
                    bgcolor: 'off_white',
                    [`@media (max-width:600px)`]: {
                        fontSize: '16px',
                        p: '3px 14px',
                    },
                }}
            />
        </FormControl>
    );
};

export default InputField;
