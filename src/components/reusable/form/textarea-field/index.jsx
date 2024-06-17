import { FormControl, FormHelperText, FormLabel, InputBase as Input, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

const TextareaField = ({ name, max = 500, label, error, required, placeholder, onChange, defaultValue }) => {
    const [size, setSize] = useState(0);

    const handleChange = (e) => {
        onChange(e);
        setSize(e.target.value.length);
    }

    return (
        <FormControl
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
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

                <Typography
                    variant={'tiny'}
                    sx={{
                        [`@media (max-width:600px)`]: {
                            fontSize: '14px',
                        },
                    }}
                >
                    {`${size}/${max}`}
                </Typography>
            </Box>

            {error && (
                <FormHelperText
                    error
                    id="component-error-text"
                    variant={'small'}
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

            <Input
                id={name}
                name={name}
                multiline
                rows={4}
                error={!!error}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={handleChange}
                sx={{
                    border: '1px solid #D4D4D4',
                    borderRadius: '14px',
                    p: '5px 18px',
                    fontSize: '20px',
                    bgcolor: 'off_white',
                    [`@media (max-width:600px)`]: {
                        p: '5px 14px',
                        fontSize: '16px',
                    },
                }}
            />
        </FormControl>
    )
}

export default TextareaField;
