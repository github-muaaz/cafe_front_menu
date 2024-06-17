import {TableCell, TableRow, Typography} from "@mui/material";

const Rows = ({columns, item, onRowClicked}) => {

    const mapAccessors = (data, accessors) => {
        if (!accessors) return 'no accessors';
        if (!data) return 'no data';
        return accessors.map(accessor => data?.[accessor]);
    }

    const handleRowClick = (item) => {
        if (onRowClicked)
            onRowClicked(item);
    }

    return (
        <TableRow onClick={() => handleRowClick(item)}>
            {columns?.map((column, index) => {
                const key = Array.isArray(column.accessor) ? column.accessor.join('') : column.accessor + index;

                return (
                    <TableCell key={key} sx={{padding: '15px 0 0'}}>
                        {column.customColumn
                            ? typeof column.accessor === 'number'
                                ? column.customColumn(item)
                                : (Array.isArray(column.accessor)
                                    ? column.customColumn(...mapAccessors(item, column.accessor))
                                    : column.customColumn(item[column.accessor])
                                )
                            : (
                                <div className={'box'}>
                                    <Typography variant="h5">
                                        {item[column.accessor]?.length > 20 ? `${item[column.accessor].substring(0, 20)}...` : item[column.accessor]}
                                    </Typography>
                                </div>
                            )}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}

export default Rows;
