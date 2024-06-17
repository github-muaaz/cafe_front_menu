import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ value, size = 200, bgColor = "#ffffff", fgColor = "#000000", level = "L" }) => {
    return (
        <QRCode
            value={value}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
        />
    );
};

export default QRCodeGenerator;
