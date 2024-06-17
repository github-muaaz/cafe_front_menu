import {useEffect, useState} from "react";
import {FormControl, FormHelperText, FormLabel, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import withLanguage from "../../../../language/withLanguage";
import CustomFileInput from "./input";
import Image from "../../img";
import Icon from "../../icon";
import Button from "../../button";

const FileInput = ({t, label, max = 5, error, name, required, onChange, defaultValue = []}) => {

    const [selected, setSelected] = useState([]);
    const [oldSelected, setOldSelected] = useState(defaultValue);

    useEffect(() => {
        setOldSelected(defaultValue)
    }, [defaultValue])

    const handleChange = (e) => {
        // check if not over from max
        if (selected.length + (oldSelected?.length || 0) + 1 > max)
            return;

        const files = Array.from(e.target.files);

        let newFiles = [];

        // check not duplicate
        for (let file of files)
            if (!selected.some(selectedFile => selectedFile.name === file.name))
                newFiles.push(file);

        const newData = [...selected, ...newFiles].slice(0, max);

        setSelected(newData);

        onChange({
            target: {
                name,
                value: newData
            }
        })
    };

    const handleDelete = (fileName) => {
        const filtered = selected.filter(file => file.name !== fileName);

        setSelected(filtered);

        onChange({
            target: {
                name,
                value: filtered
            }
        })
    }

    const handleImageDeleteOld = (fileName) => {
        const filtered = oldSelected.filter(file => file !== fileName);

        setOldSelected(filtered);

        onChange({
            target: {
                name: 'oldFiles',
                value: filtered
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
                gap: '10px'
            }}
        >
            <Box>
                <FormLabel
                    error={!!error}
                    sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'dark_green_grey',
                        marginRight: '20px',
                        [`@media (max-width:600px)`]: {
                            fontSize: '16px',
                        },
                    }}
                    htmlFor={name}
                >
                    {`${label} ${required ? '*' : ''}`}
                </FormLabel>

                <Typography variant={'tiny'} style={{width: 'fit-content'}}>
                    {t('Upload one image at least')}
                </Typography>

                {(!!error && defaultValue.length > 0) &&
                    <Button
                        sx={{
                            width: 'fit-content',
                            fontSize: '12px',
                            marginLeft: '20px'
                    }}
                        type={'button'}
                        onClick={() => {
                            setOldSelected(defaultValue);
                            onChange({oldFiles: defaultValue, name: 'oldFiles'});
                        }}
                    >
                        {t('revert old images')}
                    </Button>
                }
            </Box>

            {error &&
                <FormHelperText error id="component-error-text" variant={'small'}>{error}</FormHelperText>}

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    alignItems: 'end',
                }}
            >
                <CustomFileInput name={name} handleChange={handleChange}/>

                {oldSelected.map((file, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: '120px',
                            display: 'flex',
                            alignItems: 'end',
                            '&:hover .x': {display: 'block'},
                            [`@media (max-width:600px)`]: {
                                width: 100,
                            },
                        }}
                    >
                        <Image src={file}/>

                        <Box
                            className="x"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleImageDeleteOld(file)
                            }}
                            sx={{
                                position: 'absolute',
                                top: -25,
                                right: -15,
                                display: 'none',
                            }}
                        >
                            <Icon width={35} color={'red'} icon={'x'}/>
                        </Box>
                    </Box>
                ))}

                {selected.map((file, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: '120px',
                            display: 'flex',
                            alignItems: 'end',
                            '&:hover .x': {display: 'block'},
                        }}
                    >
                        <Image src={URL.createObjectURL(file)}/>

                        <Box
                            className="x"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(file.name)
                            }}
                            sx={{
                                position: 'absolute',
                                top: -25,
                                right: -15,
                                display: 'none',
                            }}
                        >
                            <Icon width={35} color={'red'} icon={'x'}/>
                        </Box>
                    </Box>
                ))}
            </Box>
        </FormControl>
    )
}

export default withLanguage()(FileInput);
