import React from "react";
import {styled} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import withLanguage from "../../../../language/withLanguage";

const Container = styled(Paper)(({ theme }) => ({
    minWidth: 190,
    minHeight: 165,
    border: `2px dashed ${theme.palette.light_green_grey}`,
    borderRadius: 14,
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: 9,
    cursor: "pointer",
    backgroundColor: theme.palette.off_white,
    [`@media (max-width:600px)`]: {
        minWidth: 120,
        minHeight: 95
    },
}));

const CustomFileInput = ({ t, name, handleChange }) => {
    return (
        <Container component="label">
            <Input
                sx={{ display: "none" }}
                name={name}
                type="file"
                onChange={handleChange}
                accept="image/jpeg, image/png, image/gif, image/webp"
                size="5242880"
            />
            <Typography align="center" width={'100%'} variant="tiny">
                {t('Drag and drop')}
            </Typography>
        </Container>
    );
}

export default withLanguage()(CustomFileInput);
