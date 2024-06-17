import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";

import withLanguage from "../language/withLanguage";
import Button from "../components/reusable/button";
import history from "../router/history";
import InputField from "../components/reusable/form/input-field";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
};

const ForgotPassword = ({t}) => {

    const [error, setError] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;

        if (email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            setError("Email should be correct email format");

        // check if error does not exist
        if (!error) {

            // todo reset passsword api
            // Api.Login(formData);

            // reset form data to default
            e.currentTarget.reset();
        }
    };

    return (
        <Box sx={style}>
            <Stack spacing={2}>
                <Typography textAlign={"center"} variant="h2">
                    {t("Forgot password")}
                </Typography>

                <Typography textAlign={'center'} variant="small">
                    {t('Enter your email we will send link to set new password')}
                </Typography>
            </Stack>

            <form onSubmit={handleSubmit}>
                <Stack spacing={'40px'}>
                    <InputField
                        error={error}
                        name={"email"}
                        label={t("Email")}
                        placeholder={t("Enter email")}
                    />

                    <Box display={'flex'} gap={'40px'}>
                        <Button
                            variant={'outlined'}
                            type={"button"}
                            onClick={() => {history.go(-1)}}
                        >
                            {t("cancel")}
                        </Button>

                        <Button type={"submit"}>
                            {t("send link")}
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
};

export default withLanguage()(ForgotPassword);
