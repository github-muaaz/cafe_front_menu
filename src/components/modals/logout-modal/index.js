import {Stack, Typography, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";

import Icon from "../../reusable/icon";
import withLanguage from "../../../language/withLanguage";
import Button from "../../reusable/button";
import Api from "../../../service/api";

const LogoutModal = ({t, onClose}) => {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const handleLogout = () => {
        Api.Logout()
            .then(() => {
                onClose();
            });
    }

    return(
        <Stack
            spacing={isMobile ? '20px' : '40px'}
            sx={{
                alignItems: 'center',
                p: isMobile ? '30px' : '75px 80px',
            }}
        >
            <Icon icon={'stop'}/>

            <Typography variant={'h2'} color={'red'} textAlign={'center'}>
                {t('Are you sure to Logout?')}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    gap: isMobile ? '10px' : '30px',
                    width: '100%',
                }}
            >
                <Button onClick={onClose} variant={'outlined'}>
                    {t('cancel')}
                </Button>
                <Button onClick={handleLogout} bgColor={'red'}>
                    {t('Logout')}
                </Button>
            </Box>
        </Stack>
    )
}

export default withLanguage()(LogoutModal);