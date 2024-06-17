import {Typography} from "@mui/material";
import {mapStatus} from "../../../utils";

const Status = ({variant, value, ...rest}) => {

    let color;

    switch (value){
        case 'ACTIVE':
        case 'NEW':
            color = 'green';
            break;
        case 'ON_PROGRESS':
        case 'ON_SERVICE':
            color = 'blue';
            break;
        case 'NON_ACTIVE':
        case 'BOOKED':
        case 'DONE':
            color = 'orange';
            break;
        case 'DELETED':
        case 'DISABLED':
        case 'PAID':
            color = 'red';
            break;
        default:
            color = 'green';
    }

    return (
        <Typography {...rest} color={color} variant={variant || 'h5'} sx={{textTransform: "capitalize"}}>
            {mapStatus(value)}
        </Typography>
    )
}

export default Status;