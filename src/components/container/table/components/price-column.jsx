import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Typography, useMediaQuery} from "@mui/material";

import Icon from "../../../reusable/icon";

const PriceColumn = ({isOpen, totalPrice, discountPrice, currency}) => {
    const [delayedBorderRadius, setDelayedBorderRadius] = useState('14px');

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!isOpen) {
            const timeoutId = setTimeout(() => {
                setDelayedBorderRadius('14px');
            }, 200);

            return () => clearTimeout(timeoutId);
        } else
            setDelayedBorderRadius('0')
    }, [isOpen]);

    return (
        <Box
            sx={{
                bgcolor: 'soft_grey',
                borderTopLeftRadius: '14px',
                borderBottomLeftRadius: delayedBorderRadius,
            }}
        >
            <Box
                sx={{
                    bgcolor: 'off_white',
                    borderTopLeftRadius: '14px',
                    borderBottomLeftRadius: '14px',
                    alignItems: 'center',
                    display: 'flex',
                    gap: isMobile ? '5px' : '20px',
                    p: isMobile ? (
                        totalPrice !== discountPrice ? '13px 10px' : '25.5px 10px'
                    ) : (
                        totalPrice !== discountPrice ? '13px 20px' : '25.5px 20px'
                    ),
                }}
            >
                <Icon width={isMobile && 20} height={isMobile && 20} icon={isOpen ? 'up' : 'down'}/>

                <Box>
                    {totalPrice !== discountPrice
                        ? <Typography variant={'h4'}> {`${discountPrice} ${currency}`} </Typography>
                        : <Typography variant={'h4'}> {`${totalPrice} ${currency}`} </Typography>
                    }

                    {totalPrice !== discountPrice &&
                        <Typography
                            variant={'h6'}
                            color={'red'}
                            sx={{textDecoration: 'line-through'}}
                        >
                            {`${totalPrice} ${currency}`}
                        </Typography>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default PriceColumn;