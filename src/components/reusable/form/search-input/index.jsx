import { InputBase as Input } from "@mui/material";
import Box from "@mui/material/Box";
import Icon from "../../icon/icon";

const Index = ({ onChange, placeholder }) => {
    return (
        <Box
            sx={{
                border: '1px solid #D4D4D4',
                borderRadius: '14px',
                overflow: 'hidden',
                padding: '5px 16px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'off_white',
                [`@media (max-width:600px)`]: {
                    padding: '5px 12px',
                },
            }}
        >
            <Icon width={'30px'} icon={'search'} sx={{
                [`@media (max-width:600px)`]: {
                    width: '25px',
                },
            }} />

            <Input
                onChange={onChange}
                type="text"
                placeholder={placeholder}
                sx={{
                    width: '100%',
                    p: '3px 18px',
                    fontSize: '25px',
                    [`@media (max-width:600px)`]: {
                        p: '3px 14px',
                        fontSize: '20px',
                    },
                }}
            />
        </Box>
    )
}

export default Index;
