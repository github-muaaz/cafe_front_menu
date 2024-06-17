import { FormControl, FormHelperText, FormLabel, InputBase as Input, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Api from "../../../../service/api";
import Icon from "../../icon";

const CustomSelect = ({
                          name,
                          label,
                          error,
                          max = 6,
                          optionsUrl,
                          optionKey = 'key',
                          optionValue = 'value',
                          required,
                          placeholder,
                          defaultValue = [],
                          onChange
                      }) => {

    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(defaultValue);
    const [apiOptions, setApiOptions] = useState([]);

    useEffect(() => {
        if (defaultValue.length > 0)
            setSelected(defaultValue)
    }, [defaultValue]);

    const filteredItems = apiOptions?.filter(item =>
        item?.[optionValue]?.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim())
        && !selected.includes(item)
        && !selected.map(sel => sel[optionValue]).includes(item?.[optionValue])
    );

    const handleChange = (e) => {
        setQuery(e.target.value);

        Api.FetchData(optionsUrl, null, { params: { search: e.target.value.trim() } })
            .then(res => {
                const filtered = res.body?.filter(newObj => !apiOptions.some(oldObj => oldObj[optionKey] === newObj[optionKey]));

                setApiOptions(prev => [...prev, ...filtered]);
            });
    }

    const handleDelete = data => {
        setSelected(data);
        onChange({
            target: {
                name,
                value: data.map(item => item[optionKey])
            }
        })
    }

    const handleClickAdd = data => {
        if (max === 1) {
            setSelected([data]);

            setQuery("");
            onChange({
                target: {
                    name,
                    value: data[optionKey]
                }
            })
            return;
        }

        const newV = [...selected, data];
        if (newV.length >= max)
            return;

        setSelected(newV);
        setQuery("");
        onChange({
            target: {
                name,
                value: newV.map(item => item[optionKey])
            }
        })
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
            }

            <Box
                sx={{
                    bgcolor: 'soft_grey',
                    borderRadius: '14px',
                    border: `1px solid #B7B7A4`,
                    [`@media (max-width:600px)`]: {
                        borderRadius: '10px',
                    },
                }}
            >
                <Stack
                    sx={{
                        borderBottom: '1px solid #B7B7A4',
                        borderRadius: '14px',
                        p: '3px 18px',
                        bgcolor: 'off_white',
                        [`@media (max-width:600px)`]: {
                            p: '3px 14px',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            [`@media (max-width:600px)`]: {
                                gap: '8px',
                            },
                        }}
                    >
                        {selected?.map((item, index) => (
                            <Box
                                key={index}
                                sx={{
                                    margin: '5px 0',
                                    bgcolor: 'white',
                                    color: 'dark_green_grey',
                                    p: '3px 10px',
                                    borderRadius: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    [`@media (max-width:600px)`]: {
                                        p: '3px 8px',
                                        borderRadius: '10px',
                                    },
                                }}
                            >
                                <Icon
                                    color={'red'}
                                    width={'20px'}
                                    height={'20px'}
                                    icon={'x'}
                                    onClick={() => handleDelete(selected
                                        .filter((_, selectedIndex) => index !== selectedIndex))}
                                />

                                <Typography variant={'h6'}>
                                    {item[optionValue]}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Input
                        id={name}
                        name={name}
                        type="text"
                        error={!!error}
                        value={query}
                        onChange={handleChange}
                        placeholder={placeholder}
                        sx={{
                            fontSize: 20,
                            width: '100%',
                            [`@media (max-width:600px)`]: {
                                fontSize: 18,
                            },
                        }}
                    />
                </Stack>

                <Box
                    sx={{
                        p: filteredItems.length > 0 ? '20px' : '',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px',
                        cursor: 'pointer',
                        [`@media (max-width:600px)`]: {
                            p: filteredItems.length > 0 ? '15px' : '',
                            gap: '8px',
                        },
                    }}
                >
                    {filteredItems?.map((item, index) => (
                        <Typography
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleClickAdd(item)}
                            key={index}
                            variant={'paragraph'}
                            sx={{
                                bgcolor: 'white',
                                color: 'dark_green_grey',
                                p: '3px 10px',
                                borderRadius: '14px',
                                [`@media (max-width:600px)`]: {
                                    p: '3px 8px',
                                    borderRadius: '10px',
                                },
                            }}
                        >
                            {item[optionValue]}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </FormControl>
    )
}

export default CustomSelect;
