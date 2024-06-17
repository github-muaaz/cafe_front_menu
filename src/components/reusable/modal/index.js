import React from "react";
import {Modal, Stack} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: 24,
    minWidth: '60%',
};

const CustomModal = ({children, onClose, padding, width}) => {

    return (
        <Modal
            open={!!children}
            onClose={onClose}
        >
            <Stack
                sx={{
                    ...style,
                    padding,
                    width
                }}
                spacing={'25px'}
            >
                {children}
            </Stack>
        </Modal>
    )
}

export default CustomModal;
