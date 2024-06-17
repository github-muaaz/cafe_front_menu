import React, { useEffect, useState } from "react";
import { FormControl, FormHelperText, FormLabel, InputBase as Input, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Icon from "../../icon";
import Button from "../../button";
import withLanguage from "../../../../language/withLanguage";

const InputList = ({ t, name, label, max = 6, error, required, placeholder, onChange, defaultValue = [], ...rest }) => {
    const [items, setItems] = useState(defaultValue);

    useEffect(() => {
        if (defaultValue.length > 0)
            setItems(defaultValue)
    }, [defaultValue]);

    const handleAdd = () => {
        if (items?.length < max)
            setItems(prev => [...prev, '']);
    }

    const handleRemove = index => {
        setItems(prevItems => {
            const p = [...prevItems];
            p.splice(index, 1);
            return p;
        });
    }

    const handleChange = (e, index) => {
        const updatedItems = [...items];
        updatedItems[index] = e.target.value;
        setItems(updatedItems);
        onChange({
            target: {
                name,
                value: updatedItems
            }
        });
    }

    return (
        <Stack
            spacing={'10px'}
            sx={{
                [`@media (max-width:600px)`]: {
                    spacing: '8px',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
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
                            fontSize: '12px',
                        },
                    }}
                >
                    {`${items?.length}/${max}`}
                </Typography>
            </Box>

            {error && <FormHelperText error id="component-error-text" variant={'small'}>{error}</FormHelperText>}

            <Stack
                spacing={'15px'}
                sx={{
                    [`@media (max-width:600px)`]: {
                        spacing: '10px',
                    },
                }}
            >
                {items?.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            paddingRight: '10px',
                            [`@media (max-width:600px)`]: {
                                gap: '10px',
                                paddingRight: '5px',
                            },
                        }}
                    >
                        <FormControl
                            component="fieldset"
                            fullWidth
                        >
                            <Input
                                id={`${name}-${index}`}
                                name={name}
                                type="text"
                                error={!!error}
                                defaultValue={item}
                                placeholder={placeholder}
                                {...rest}
                                onChange={(e) => handleChange(e, index)}
                                sx={{
                                    border: '1px solid #D4D4D4',
                                    borderRadius: '14px',
                                    p: '3px 18px',
                                    fontSize: '20px',
                                    bgcolor: 'off_white',
                                    width: '100%',
                                    [`@media (max-width:600px)`]: {
                                        fontSize: '16px',
                                        p: '3px 14px',
                                    },
                                }}
                            />
                        </FormControl>
                        <Icon onClick={() => handleRemove(index)} icon={'delete'} />
                    </Box>
                ))}

                <Button
                    onClick={handleAdd}
                    type={'button'}
                    variant={'outlined'}
                    sx={{
                        [`@media (max-width:600px)`]: {
                            fontSize: '14px',
                            padding: '5px 10px',
                        },
                    }}
                >
                    {t('Add more')}
                </Button>
            </Stack>
        </Stack>
    )
}

export default withLanguage()(InputList);
