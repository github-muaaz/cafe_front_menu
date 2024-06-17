import React from "react";
import {TableBody} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";

import Header from "../header";
import Rows from "../rows";
import Body from "../body";

function Row({item, columns, innerColumns, innerItemsAccessor, innerItems, onRowClicked, currentOpen}) {

    return (
        <React.Fragment>
            <Rows
                item={item}
                columns={columns}
                onRowClicked={() => onRowClicked(item.id)}
            />

            <TableRow>
                <TableCell
                    sx={{
                        padding: '0 20px',
                        bgcolor: 'soft_grey',
                        borderBottomLeftRadius: '14px',
                        borderBottomRightRadius: '14px',
                    }}
                    colSpan={6}
                >
                    <Collapse in={currentOpen === item.id} timeout="auto" unmountOnExit>
                        <Box marginBottom={'20px'}>
                            <Table size="small" aria-label="purchases">
                                <Header variant={'h6'} columns={innerColumns}/>

                                <Body
                                    items={innerItems || item[innerItemsAccessor]}
                                    columns={innerColumns}
                                />
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const CollapseBody = ({items, ...rest}) => {
    return (
        <TableBody>
            {items?.map((item, index) => (
                <Row
                    key={index}
                    item={item}
                    {...rest}
                />
            ))}
        </TableBody>
    )
}

export default CollapseBody;