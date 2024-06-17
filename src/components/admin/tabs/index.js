import {memo, useContext, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {styled} from "@mui/material";
import Box from "@mui/material/Box";
import {connect} from "react-redux";

import Line from "../../reusable/line";
import BgImage from "../../../assets/images/bg.png";
import withLanguage from "../../../language/withLanguage";
import Api from "../../../service/api";
import ActionTypeConstants from "../../../constants/actionTypeConstants";
import UtilConstants from "../../../constants/util-constants";
import CategoryContext from "../../../context/category-context";

const StyledTabs = styled(Box)(({theme}) => ({
    padding: '0 5px',
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
}));

const StyledTab = styled(Box)(({ theme }) => ({
    height: '30px',
    padding: '0 14px',
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0',
    fontSize: '24px',
    fontWeight: 700,
    display: 'flex',
    '&.selected': {
        background: `url(${BgImage}) no-repeat`,
        backgroundSize: '100% 100%',
        color: 'white'
    },
    [`@media (max-width:600px)`]: {
        fontSize: '16px',
        padding: '0 10px',
        borderRadius: '10px 10px 0 0',
        height: '22px'
    }
}));

const CustomTabs = ({t, categories}) => {

    let { pathname: mainCategory} = useLocation();
    mainCategory = mainCategory.match(/[^/]+$/)[0].replace(/-+/g, ' ');

    const categoryContext = useContext(CategoryContext);
    const { currentTab, setCurrentTab } = categoryContext;

    categories = categories?.[mainCategory] || [];

    useEffect(() => {
        Api.FetchData(`/category/parent/${mainCategory}`,
            {
                payloadName: 'categories',
                category: mainCategory,
                type: ActionTypeConstants.SAVE_CATEGORIZED,
            }).then(() => {})
    }, [mainCategory]);

    return (
        <Box>
            <StyledTabs>
                <StyledTab
                    onClick={() => setCurrentTab(UtilConstants.All)}
                    className={currentTab === UtilConstants.All ? 'selected' : ''}
                >
                    {t('All')}
                </StyledTab>

                {categories?.map((category, index) => (
                    <StyledTab
                        key={index}
                        onClick={() => setCurrentTab(category.name)}
                        className={currentTab === category.name ? 'selected' : ''}
                    >
                        {t(category.name)}
                    </StyledTab>
                ))}
            </StyledTabs>
            <Line/>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    categories: state.categories
});

export default withLanguage()(connect(mapStateToProps)(memo(CustomTabs)));
