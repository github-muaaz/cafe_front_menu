import React from 'react';
import {styled} from '@mui/material/styles';
import {Table, TableContainer} from '@mui/material';

import Body from "./body";
import Header from "./header";

const StyledTable = styled(Table)(({theme, noBorder}) => ({
    borderCollapse: 'collapse',

    '& td': {
        border: 'none',
    },
    '& .box': {
        backgroundColor: theme.palette.off_white,
        padding: '15px 10px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '100%'
    },
    '& td:first-of-type .box': {
        justifyContent: 'start',
        padding: '15px 5px 15px 20px',
        borderTopLeftRadius: '14px',
        borderBottomLeftRadius: '14px',
        width: 'max-content',
        minWidth: '100%',
    },
    '& td:last-of-type .box': {
        padding: '15px',
        borderTopRightRadius: '14px',
        borderBottomRightRadius: '14px',
    },
    '& th:first-child':{
        padding: '0 10px 0 20px',
    },
    '& th': {
        padding: '0 10px',
        borderBottom: noBorder ? 'none' : '2px solid ' + theme.palette.dark_green_grey,
        backgroundColor: theme.palette.white,
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
}));

const SingleLineTable = ({id, columns, items, noBorder, maxHeight, onRowClicked}) => {

    return (
        <TableContainer id={id} sx={{maxHeight: maxHeight || '70vh'}}>
            <StyledTable noBorder={noBorder}>
                <Header columns={columns}/>
                <Body items={items} columns={columns} onRowClicked={onRowClicked}/>
            </StyledTable>
        </TableContainer>
    );
};

export default SingleLineTable;
