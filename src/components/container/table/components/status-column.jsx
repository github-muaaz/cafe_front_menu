import Box from "@mui/material/Box";
import Status from "../../../reusable/status";

const StatusColumn = ({status}) => {

    return (
        <Box className={'box'} sx={{
            bgcolor: 'off_white',
            p: '27px 0'
        }}
        >
            <Status value={status}/>
        </Box>
    )
}

export default StatusColumn;