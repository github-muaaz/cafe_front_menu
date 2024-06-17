import {memo, useEffect} from "react";
import Box from "@mui/material/Box";
import {connect} from "react-redux";

import Button from "../../reusable/button";
import Api from "../../../service/api";
import ActionTypeConstants from "../../../constants/actionTypeConstants";
import withLanguage from "../../../language/withLanguage";

const TablesPopover = ({t, tables, saveCurrentTable, handleClose}) => {

    useEffect(() => {
        Api.FetchData('/table/list/all', {
            payloadName: 'tables',
            type: ActionTypeConstants.SAVE_LIST
        }).then()
    }, [])

    return (
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={2}
                sx={{
                    width: 'fit-content',
                    bgcolor: 'off_white',
                    p: '40px',
                }}
            >
                {tables?.map(table => (
                    <Box key={table.id} gridColumn="span 6">
                        <Button
                            onClick={() => {
                                saveCurrentTable(table);
                                handleClose();
                            }}
                        >
                            {`${t('No:')} ${table.name}`}
                        </Button>
                    </Box>
                ))}
            </Box>
    )
}

const mapStateToProps = (state) => ({
    tables: state.tables,
});

const mapDispatchToProps = (dispatch) => ({
    saveCurrentTable: (data) => dispatch({
        payloadName: 'currentTable',
        type: ActionTypeConstants.SAVE,
        payload: data,
    }),
});

export default withLanguage()(connect(mapStateToProps, mapDispatchToProps)(memo(TablesPopover)));