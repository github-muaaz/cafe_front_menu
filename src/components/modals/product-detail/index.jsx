import Box from "@mui/material/Box";
import React, {useState} from "react";
import {List, ListItem, Stack, Typography, useMediaQuery} from "@mui/material";

import DiscountBox from "../../reusable/discount-box";
import Line from "../../reusable/line";
import Icon from "../../reusable/icon";
import Image from "../../reusable/img";
import withLanguage from "../../../language/withLanguage";

const ProductDetail = ({t, product, onClose}) => {

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isIngredientsCollapsed, setIsIngredientsCollapsed] = useState(true);
    const [isDescriptionCollapsed, setIsDescriptionCollapsed] = useState(true);

    const toggleIngredientsCollapse = () => {
        setIsIngredientsCollapsed(!isIngredientsCollapsed);
        setIsDescriptionCollapsed(true);
    }

    const toggleDescriptionCollapse = () => {
        setIsDescriptionCollapsed(!isDescriptionCollapsed);
        setIsIngredientsCollapsed(true);
    }

    return (
        <React.Fragment>
            <Box display={'flex'} alignItems={'center'}>
                {product.discount && <DiscountBox position={'unset'} discount={product.discount}/>}

                <Stack
                    sx={{
                        padding: isMobile ? '0 15px' : '0 20px',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Typography variant={'h2'}>
                            {product.title}
                        </Typography>

                        <Icon
                            stroke={'#283618'}
                            width={isMobile ? '30px' : '35px'}
                            height={isMobile ? '30px' : '35px'}
                            onClick={onClose}
                            icon={'x'}
                        />
                    </Box>
                    <Line/>
                </Stack>
            </Box>

            <Box
                sx={{
                    p: isMobile ? '5px 10px' : '5px 50px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Image width={'80%'} src={product.images?.[0]}/>
            </Box>

            <Stack
                spacing={'20px'}
                p={'0 40px 40px'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '10px' : ''
                    }}
                >
                    {product.ingredients && product.ingredients.length > 0 &&
                        <Box width={'100%'}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                                onClick={isMobile ? toggleIngredientsCollapse : null}
                            >
                                <Typography variant={'h4'} display="flex" alignItems="center">
                                    {t('Ingredients:')}
                                </Typography>

                                {isMobile && (
                                    isIngredientsCollapsed ? <Icon icon={'down'}/> : <Icon icon={'up'}/>
                                )}
                            </Box>

                            {(!isIngredientsCollapsed || !isMobile) && (
                                <List component="ul">
                                    {product.ingredients.map(ingredient => (
                                        <ListItem key={ingredient} style={{
                                            padding: 0,
                                            paddingLeft: '15px',
                                            display: 'flex',
                                            gap: '7px'
                                        }}>
                                            <Icon icon={'dot'}/>
                                            <Typography variant={'small'}>{ingredient}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    }

                    {product.description &&
                        <Box width={'100%'}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                                onClick={isMobile ? toggleDescriptionCollapse : null}
                            >
                                <Typography variant={'h4'} display="flex" alignItems="center">
                                    {t('About:')}
                                </Typography>

                                {isMobile && (
                                    isDescriptionCollapsed ? <Icon icon={'down'}/> : <Icon icon={'up'}/>
                                )}
                            </Box>

                            {(!isDescriptionCollapsed || !isMobile) && (
                                <Typography variant={'small'}>
                                    {product.description}
                                </Typography>
                            )}
                        </Box>
                    }
                </Box>

                <Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant={'h3'}>
                            {`${product.price} ${product.currency}`}
                        </Typography>

                        <Typography variant={'h4'}>
                            {product.unit}
                        </Typography>
                    </Box>

                    <Line bgColor={'#F0EFEB'}/>
                </Stack>
            </Stack>
        </React.Fragment>
    )
}

export default withLanguage()(ProductDetail);