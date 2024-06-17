import {TableBody} from "@mui/material";

import Rows from "../rows";

const Body = ({onRowClicked, items, columns, maxHeight, ...rest}) => {

    return (
        <TableBody
            {...rest}
        >
            {items?.map((item, index) => (
                <Rows
                    key={index}
                    item={item}
                    columns={columns}
                    onRowClicked={onRowClicked}
                />
            ))}
        </TableBody>
    )
}

export default Body;