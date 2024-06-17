import * as React from 'react';
import Table from '@mui/material/Table';
import {styled} from "@mui/material/styles";

import Header from "./header";
import CollapseBody from "./collapse-body";

const StyledTable = styled(Table)(({theme}) => ({
    borderCollapse: 'collapse',
    '& td': {
        border: 'none',
    },
    '& th': {
        borderBottom: '2px solid ' + theme.palette.dark_green_grey,
    },
    paddingBottom: '20px',
}));

export default function CollapsibleTable({columns, ...rest}) {
    return (
        <StyledTable
            aria-label="collapsible table"
        >
            <Header columns={columns}/>
            <CollapseBody
                columns={columns}
                {...rest}
            />
        </StyledTable>
    );
}
