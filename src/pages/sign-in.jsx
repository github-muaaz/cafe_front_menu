import {Link, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";

import withLanguage from "../language/withLanguage";
import Button from "../components/reusable/button";
import Api from "../service/api";
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

const SignIn = ({t = (s) => {return s}}) => {

    const [errors, setErrors] = useState({});

    const validate = (data) => {
        const errors = {};

        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
            errors.email = "Email should be correct email format";

        if (!data.password || data.password.trim().length < 8)
            errors.password = "Password must be at least 8 characters";

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        const errors = validate(formData);

        // check if error does not exist
        if (Object.keys(errors).length === 0) {

            Api.Login(formData)
                .then(() => {
                    // reset form data to default
                    setErrors({});
                    e.currentTarget?.reset();
                });

        } else setErrors(errors);

    };

    return (
        <Box sx={style}>
            <Typography textAlign={"center"} variant="h2">
                {t("Login")}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={{xs: 2, sm: 3}} useFlexGap>
                    <InputField
                        error={errors.email}
                        name={"email"}
                        label={t("Email")}
                        placeholder={t("Enter email")}
                    />
                    <InputField
                        error={errors.password}
                        name={"password"}
                        label={t("Password")}
                        placeholder={t("Enter password")}
                    />

                    <Link
                        href="/forgot-password"
                        variant="body2"
                        underline="none"
                        sx={{textAlign: 'right', fontStyle: "italic"}}
                    >
                        {t("Forgot password?")}
                    </Link>

                    <Button width={'50%'} sx={{alignSelf: "center"}} type={"submit"}>
                        {t("login")}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default withLanguage()(SignIn);
