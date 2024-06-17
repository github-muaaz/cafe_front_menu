import {Stack, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";

import withLanguage from "../../../language/withLanguage";
import Button from "../../reusable/button";
import QrCode from "../../reusable/qr-code";
import {useRef} from "react";

const LogoutModal = ({t, onClose}) => {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const qrRef = useRef(null);

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr_code.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return(
        <Stack
            spacing={isMobile ? '20px' : '40px'}
            sx={{
                alignItems: 'center',
                p: isMobile ? '30px' : '75px 80px',
            }}
        >
            <div ref={qrRef}>
            <QrCode value={'https://l.com'}/>
            </div>

            <Box
                sx={{
                    display: 'flex',
                    gap: isMobile ? '10px' : '30px',
                    width: '100%',
                }}
            >
                <Button onClick={onClose} variant={'outlined'}>
                    {t('close')}
                </Button>
                <Button onClick={handleDownload}>
                    {t('Download')}
                </Button>
            </Box>
        </Stack>
    )
}

export default withLanguage()(LogoutModal);