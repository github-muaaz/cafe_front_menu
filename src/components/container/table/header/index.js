import {TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Box from "@mui/material/Box";

const Header = ({columns, variant}) => {
    return (
        <TableHead>
            <TableRow>
                {columns?.map((column, index) => (
                    <TableCell key={index + column.header} sx={{ padding: '8px 0 0' }}>
                        <Typography variant={variant || 'h4'}>
                            {column.header}
                        </Typography>
                    </TableCell>
                ))}
            </TableRow>
            <Box height={{sm: '10px'}}></Box>
        </TableHead>
    )
}

export default Header;