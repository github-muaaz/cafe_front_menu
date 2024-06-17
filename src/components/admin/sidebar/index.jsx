import React, {memo, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";

import Icon from "../../reusable/icon";
import Button from "../../reusable/button";
import withLanguage from "../../../language/withLanguage";
import Line from "../../reusable/line";
import CustomModal from "../../reusable/modal";
import LogoutModal from "../../modals/logout-modal";
import {mapToUrl} from "../../../utils";
import QrCodeModal from "../../modals/qr-code-modal";

const Sidebar = ({t, onClose, pages, state, isLoggedIn}) => {

    console.log('ss', state)

    const {pathname} = useLocation();
    const [modalBody, setModalBody] = useState(null);

    const handleRenderModal = (modal) => {
        const modals = {
            qr: <QrCodeModal
                onClose={() => {
                    setModalBody(null);
                    onClose();
                }}
            />,
            logout: <LogoutModal
                onClose={() => {
                    setModalBody(null);
                    onClose();
                }}
            />
        }

        setModalBody(modals[modal]);
    }

    return (
        <React.Fragment>
            <CustomModal width={'80%'} onClose={() => setModalBody(null)}>
                {modalBody}
            </CustomModal>

            <Stack
                sx={{
                    minWidth: 300,
                    bgcolor: 'white',
                    minHeight: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: '60px 40px',
                    gap: '30px'
                }}
                role="presentation"
            >
                <Stack
                    spacing={'10px'}
                    alignItems={'center'}
                >
                    <Icon icon={'logo'}/>

                    <Typography variant={'h3'}>
                        O'zbekchasiga
                    </Typography>

                    <Line width={'70%'} bgColor={'#B7B7A4'}/>
                </Stack>

                <Stack
                    sx={{
                        flex: 1,
                        width: '100%',
                        borderRadius: '10px',
                    }}
                >
                    {pages?.map((page) => {
                        let mappedUrl = mapToUrl(page);
                        const isEqual = pathname.slice(1) === mappedUrl;

                        if (page === 'MENU')
                            mappedUrl += '/food'

                        return (
                            <Button
                                key={page}
                                type={"link"}
                                to={`${mappedUrl}`}
                                sx={{
                                    color: isEqual ? "light_green_grey" : '',
                                    bgcolor: isEqual ? "off_white" : "transparent",
                                    borderRadius: '5px',
                                    border: 'none',
                                }}
                            >
                                <div onClick={onClose}>
                                    {page}
                                </div>
                            </Button>
                        )
                    })}
                </Stack>

                <Stack spacing={2}>
                    <Button
                        onClick={() => handleRenderModal('qr')}
                        sx={{
                            p: '10px 20px',
                            boxShadow: 'none',
                            textTransform: 'capitalize'
                        }}
                    >
                        <Typography variant={'h4'}>
                            {t('QR code for menu')}
                        </Typography>
                    </Button>

                    {isLoggedIn
                        ? <Button
                            type={'icon'}
                            icon={'logout'}
                            onClick={() => handleRenderModal('logout')}
                            sx={{
                                p: '10px 20px',
                                bgcolor: 'transparent',
                                boxShadow: 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            <Typography variant={'h4'} color={'red'}>
                                {t('Logout')}
                            </Typography>
                        </Button>
                        : <Button
                            type={"link"}
                            to={'/login'}
                            sx={{
                                textAlign: 'center'
                            }}
                        >
                           Login
                        </Button>
                    }
                </Stack>
            </Stack>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pages: state.user?.pages,
    isLoggedIn: !!state.user
});

export default withLanguage()(connect(mapStateToProps)(memo(Sidebar)));