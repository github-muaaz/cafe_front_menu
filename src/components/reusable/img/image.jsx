import {styled} from "@mui/material";
import Box from "@mui/material/Box";

import Api from "../../../service/api";

const StyledImg = styled("img")(({theme, width, maxHeight}) => ({
    width: width || '100%',
    maxHeight,
    height: '100%',
    borderRadius: '15px',
    objectFit: 'cover',
}));

const StyledImgPlaceHolder = styled(Box)(({theme}) => ({
    borderRadius: '15px',
    width: "100%",
    height: '100%',
    minHeight: "200px",
    backgroundColor: theme.palette.light_green_grey,
}));

const Image = ({src, getColor, ...rest}) => {

    const isValidUUID = uuid => {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        return uuidRegex.test(uuid);
    }

    if (src && isValidUUID(src))
        return <StyledImg src={Api.GetApiImg(src)} {...rest}/>

    if (src)
        return <StyledImg src={src} {...rest}/>

    return <StyledImgPlaceHolder getColor={getColor} {...rest}/>
}

export default Image;