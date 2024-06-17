import {Button, styled, useMediaQuery} from "@mui/material";
import { NavLink } from "react-router-dom";
import Icon from "../icon";

const commonStyle = ({ theme, variant, width, padding, sx, bgColor }) => ({
    color: variant === 'outlined' ? theme.palette.dark_green_grey : theme.palette.off_white,
    backgroundColor: variant === 'outlined' ? 'transparent' : theme.palette[bgColor || 'dark_green_grey'],
    border: `2px solid ${theme.palette[bgColor || 'dark_green_grey']}`,
    '&:hover': {
        backgroundColor: variant === 'outlined' ? 'transparent' : theme.palette[bgColor || 'dark_green_grey'],
        border: `2px solid ${theme.palette[bgColor || 'dark_green_grey']}`,
    },
    fontSize: '20px',
    fontWeight: 'bold',
    width: width || '100%',
    borderRadius: '18px',
    textTransform: 'capitalize',
    padding: padding || '3px 20px',
    whiteSpace: 'nowrap',
    minWidth: 0,
    p: '5px 20px',
    [`@media (max-width:600px)`]: {
        fontSize: '12px',
        p: padding || '3px 15px',
    },
    ...sx
});

const StyledButton = styled(Button)(commonStyle);
const StyledLink = styled(NavLink)((props) => ({
    ...commonStyle(props),
    '&:hover': {
    },
}));

const CustomButton = ({ type, to, icon, onClick, bgColor, sx, children, ...rest }) => {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    switch (type) {
        case 'icon':
            return (
                <Button
                    variant="contained"
                    onClick={onClick}
                    type={type}
                    sx={{
                        minWidth: 0,
                        bgcolor: bgColor ? bgColor : 'off_white',
                        borderRadius: isMobile ? 2 : 3,
                        "&:hover": {
                            bgcolor: bgColor ? bgColor : "light_green_grey"
                        },
                        padding: '5px',
                        gap: '20px',
                        [`@media (max-width:600px)`]: {
                            gap: '15px',
                            padding: '4px',
                        },
                        ...sx
                    }}
                    {...rest}
                >
                    <Icon width={isMobile ? 25 : 30} height={isMobile ? 25 : 30} icon={icon} />
                    {children}
                </Button>
            );

        case 'link':
            return (
                <StyledLink
                    to={to}
                    {...rest}
                    sx={{
                        ...sx,
                        [`@media (max-width:600px)`]: {
                            fontSize: '14px',
                            padding: '5px 15px',
                        },
                    }}
                >
                    {children}
                </StyledLink>
            );

        default:
            return (
                <StyledButton
                    onClick={onClick}
                    type={type}
                    {...rest}
                    sx={{
                        ...sx,
                        [`@media (max-width:600px)`]: {
                            fontSize: '14px',
                            padding: '5px 15px',
                        }
                    }}
                    bgColor={bgColor}
                >
                    {children}
                </StyledButton>
            );
    }
}

export default CustomButton;
