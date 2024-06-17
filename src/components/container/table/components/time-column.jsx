import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import moment from "moment";

const TimeColumn = ({isOpen, time}) => {
    const [delayedBorderRadius, setDelayedBorderRadius] = useState(isOpen ? '' : '14px');

    useEffect(() => {
        if (!isOpen) {
            const timeoutId = setTimeout(() => {
                setDelayedBorderRadius('14px');
            }, 200);

            return () => clearTimeout(timeoutId);
        }else
            setDelayedBorderRadius('0')
    }, [isOpen]);

    return (
        <Box
            sx={{
                bgcolor: 'soft_grey',
                borderTopRightRadius: '14px',
                borderBottomRightRadius: delayedBorderRadius,
            }}
        >
        <Box sx={{
            bgcolor: 'off_white',
            borderTopRightRadius: '14px',
            borderBottomRightRadius: '14px',
            p: '27px 15px 27px 0'
        }}
        >
            <Typography variant={'h5'}>
                {moment(time).fromNow()}
            </Typography>
        </Box>
        </Box>
    )
}

export default TimeColumn;