import {Popover} from "@mui/material";

const DropDown = ({children, anchorEl, onClose, position}) => {

    return(
        <Popover
            open={!!anchorEl ? 'simple-popover' : undefined}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: position || 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: position || 'right',
            }}
            PaperProps={{
                sx: {
                    borderRadius: '13px',
                },
            }}
        >
            {children}
        </Popover>
    )
}

export default DropDown