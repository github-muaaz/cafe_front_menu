import {createTheme, ThemeProvider, CssBaseline, GlobalStyles} from '@mui/material';
import React from 'react';
import { grey } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        paddingTop: '8px',
                        paddingBottom: '8px',
                    },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: `
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                
                a {
                    text-decoration: none;
                    color: inherit;
                }
                
                /* Hide scrollbars globally */
                ::-webkit-scrollbar {
                    width: 0;
                    height: 0;
                }

                -ms-overflow-style: none;  /* Internet Explorer 10+ */
                scrollbar-width: none;  /* Firefox */

                /* Additional class for hiding scrollbars */
                .no_scroll_bar {
                    ::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                    }
                }
            `,
        },
    },
    palette: {
        mode,
        ...(mode === 'dark' ? { dark_green_grey: '#283618' } : { dark_green_grey: '#618' }),
        ...(mode === 'dark' ? { light_green_grey: '#B7B7A4' } : { light_green_grey: '#B7B7A4' }),
        ...(mode === 'dark' ? { soft_grey: '#D4D4D4' } : { soft_grey: '#D4D4D4' }),
        ...(mode === 'dark' ? { off_white: '#F0EFEB' } : { off_white: '#F0EFEB' }),
        ...(mode === 'dark' ? { white: '#FFFFFF' } : { white: '#FFFFFF' }),
        ...(mode === 'dark' ? { red: '#E5254B' } : { red: '#E5254B' }),
        ...(mode === 'dark' ? { green: '#038100' } : { green: '#038100' }),
        ...(mode === 'dark' ? { orange: '#EA7000' } : { orange: '#EA7000' }),
        ...(mode === 'dark' ? { light_blue: '#E5F8FF' } : { light_blue: '#E5F8FF' }),
        ...(mode === 'dark' ? { blue: '#589DD5' } : { blue: '#589DD5' }),
        text: {
            ...(mode === 'dark' ? { dark_green_grey: '#283618' } : { dark_green_grey: '#618' }),
            ...(mode === 'dark' ? { light_green_grey: '#B7B7A4' } : { light_green_grey: '#B7B7A4' }),
            ...(mode === 'dark' ? { soft_grey: '#D4D4D4' } : { soft_grey: '#D4D4D4' }),
            ...(mode === 'dark' ? { off_white: '#F0EFEB' } : { off_white: '#F0EFEB' }),
            ...(mode === 'dark' ? { white: '#FFFFFF' } : { white: '#FFFFFF' }),
            ...(mode === 'dark' ? { red: '#E5254B' } : { red: '#E5254B' }),
            ...(mode === 'dark' ? { green: '#038100' } : { green: '#038100' }),
            ...(mode === 'dark' ? { orange: '#EA7000' } : { orange: '#EA7000' }),
            ...(mode === 'dark' ? { light_blue: '#E5F8FF' } : { light_blue: '#E5F8FF' }),
            ...(mode === 'dark' ? { blue: '#589DD5' } : { blue: '#589DD5' }),
            ...(mode === 'light'
                ? {
                    primary: grey[900],
                    secondary: grey[800],
                }
                : {
                    primary: '#283618',
                    secondary: grey[500],
                }),
        },
    },
    typography: {
        fontFamily: "Mulish, sans-serif",
        h1: {
            fontSize: '48px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '28px',
            },
        },
        h2: {
            fontSize: '36px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '24px',
            },
        },
        h3: {
            fontSize: '30px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '20px',
            },
        },
        h4: {
            fontSize: '24px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '16px',
            },
        },
        h5: {
            fontSize: '20px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '14px',
            },
        },
        h6: {
            fontSize: '16px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '12px',
            },
        },
        leadText: {
            fontSize: '20px',
            fontWeight: 700,
            [`@media (max-width:600px)`]: {
                fontSize: '14px',
            },
        },
        paragraph: {
            fontSize: '16px',
            [`@media (max-width:600px)`]: {
                fontSize: '12px',
            },
        },
        small: {
            fontSize: '20px',
            [`@media (max-width:600px)`]: {
                fontSize: '14px',
            },
        },
        tiny: {
            fontSize: '12px',
            fontWeight: 600,
            [`@media (max-width:600px)`]: {
                fontSize: '8px',
            },
        },
        text: {
            fontSize: '25px',
            [`@media (max-width:600px)`]: {
                fontSize: '18px',
            },
        },
        semiBoldSmall: {
            fontSize: '20px',
            fontWeight: 600,
            [`@media (max-width:600px)`]: {
                fontSize: '14px',
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

const darkModeTheme = createTheme(getDesignTokens('dark'));

const Theme = ({ children }) => {
    return (
        <ThemeProvider theme={darkModeTheme}>
            <CssBaseline />
            <GlobalStyles styles={{
                '*::-webkit-scrollbar': { display: 'none' },
                '*': {
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                },
            }} />
            {children}
        </ThemeProvider>
    );
}

export default Theme;
