import { memo, useContext, useEffect, useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

import Api from "../../../service/api";
import ActionTypeConstants from "../../../constants/actionTypeConstants";
import ProductCard from "../../admin/product-card";
import UtilConstants from "../../../constants/util-constants";
import StatusConstants from "../../../constants/status-constants";
import CategoryContext from "../../../context/category-context";

const ProductContainer = ({ state, products }) => {
    let { pathname: mainCategory } = useLocation();


    const categoryContext = useContext(CategoryContext);
    const { currentTab } = categoryContext;

    mainCategory = mainCategory.match(/[^/]+$/)[0].replace(/-+/g, " ");

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    const fetchProducts = useCallback((category, tab, page) => {
        setIsLoading(true);
        Api.FetchData(`/product/${category}/${tab}/${page}/10`, {
            payloadName: "products",
            type: ActionTypeConstants.SAVE_CATEGORIZED,
            category: category,
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        setPage(0);
        fetchProducts(mainCategory, currentTab, 0);
    }, [currentTab, mainCategory, fetchProducts]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        const containerNode = containerRef.current;
        const debouncedHandleScroll = debounce(handleScroll, 100);

        containerNode.addEventListener("scroll", debouncedHandleScroll);

        return () => {
            containerNode.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [isLoading]);

    useEffect(() => {
        if (page > 0) {
            fetchProducts(mainCategory, currentTab, page);
        }
    }, [currentTab, mainCategory, page, fetchProducts]);

    products = products?.[mainCategory];

    console.log('ggh', currentTab, products)

    if (currentTab !== UtilConstants.All) {
        products = products?.filter((product) =>
            product.categories?.map(category => category.name)?.includes(currentTab)
        );
    }

    console.log('ggh', products)

    return (
        <Box
            ref={containerRef}
            sx={{
                overflow: "auto",
                height: "100%",
                paddingBottom: 3,
                position: "relative",
                padding: 2,
            }}
            className={"no_scroll_bar"}
        >
            <Grid container spacing={2}>
                {products?.map((product) => (
                    <Grid
                        item
                        key={product.id}
                        md={4}
                        sm={6}
                        xs={12}
                        sx={{
                            opacity: product.status === StatusConstants.NON_ACTIVE ? 0.5 : 1,
                        }}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            {isLoading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        padding: 2,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const mapStateToProps = (state) => ({
    products: state.products,
    state,
});

export default connect(mapStateToProps)(memo(ProductContainer));
