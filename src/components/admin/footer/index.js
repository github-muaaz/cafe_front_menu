import React, {memo, useContext, useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {Typography, useMediaQuery} from "@mui/material";
import {useLocation} from "react-router-dom";

import Button from "../../reusable/button";
import Icon from "../../reusable/icon";
import {mapToUrl} from "../../../utils";
import withLanguage from "../../../language/withLanguage";
import ActionTypeConstants from "../../../constants/actionTypeConstants";
import Api from "../../../service/api";
import CustomModal from "../../reusable/modal";
import CategoryContext from "../../../context/category-context";
import UtilConstants from "../../../constants/util-constants";

const Footer = ({t, parentCategories }) => {
    const {pathname} = useLocation();
    const containerRef = useRef();
    const [modalBody, setModalBody] = useState(null);
    const categoryContext = useContext(CategoryContext);
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const { setCurrentTab } = categoryContext;

    useEffect(() => {
        Api.FetchData(`/category/parent/all`, {
            payloadName: 'parentCategories',
            type: ActionTypeConstants.SAVE_LIST
        }).then(() =>{

        })
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const selectedLink = containerRef.current.querySelector(".selected");
            if (selectedLink) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const selectedRect = selectedLink.getBoundingClientRect();

                if (selectedRect.left < containerRect.left || selectedRect.right > containerRect.right)
                    containerRef.current.scrollLeft = selectedLink.offsetLeft - (containerRect.width - selectedRect.width) / 2;
            }
        }
    }, [containerRef, pathname]);

    const handleModalClose = () => setModalBody(null);

    return (
        <React.Fragment>
            <CustomModal
                onClose={handleModalClose}
                padding={'25px 30px'}
            >
                {modalBody}
            </CustomModal>

            <Box
                ref={containerRef}
                sx={{
                    width: '100%',
                    position: "absolute",
                    top: "100%",
                    left: '0',
                    zIndex: '500',
                    display: 'flex',
                    gap: isMobile ? "10px" : "20px",
                    p: isMobile ? "0 5px" : "0 10px",
                    transform: 'translateY(-100%)',
                    bgcolor: 'white',
                }}
            >
                <Box
                    sx={{
                        overflowX: "scroll",
                        width: "fit-content",
                        display: "flex",
                        borderRadius: "15px 15px 0 0",
                        flex: 1,
                        justifyContent: "space-around",
                        bgcolor: "dark_green_grey",
                        p: isMobile ? "5px" : "10px 20px",
                    }}
                >
                    {parentCategories
                        ?.map((category) => {
                            const mappedUrl = mapToUrl(category.name);

                            console.log('sss', mappedUrl, pathname)

                            const isEqual = pathname.slice(1).split('/').pop() === mappedUrl;

                            return (
                                <div onClick={() => setCurrentTab(UtilConstants.All)}>
                                    <Button
                                        key={category.id}
                                        type={"link"}
                                        to={`/menu/${mappedUrl}`}
                                        className={isEqual ? "selected" : ""}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            gap: '5px',
                                            alignItems: "center",
                                            color: "white",
                                            bgcolor: isEqual ? "light_green_grey" : "",
                                            borderRadius: isMobile ? 3 : '18px',
                                        }}
                                    >
                                        <Icon
                                            width={isMobile ? '25px' : "35px"}
                                            height={isMobile ? '25px' : "35px"}
                                            icon={category.name.replace(/\s+/g, '_').toLowerCase()}
                                        />

                                        <Typography
                                            variant={"tiny"}
                                            sx={{textAlign: "center", textTransform: "capitalize"}}
                                        >
                                            {t(category.name)}
                                        </Typography>
                                    </Button>
                                </div>
                            )
                        })
                    }
                </Box>
            </Box>

        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    parentCategories: state.parentCategories,
    currentTable: state.currentTable,
    cart: state.cart,
});

export default withLanguage()(connect(mapStateToProps)(memo(Footer)));
