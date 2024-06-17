import React from "react";
import {Stack} from "@mui/material";

import withLanguage from "../../../language/withLanguage";
import Line from "../line";
import PriceRow from "./component/price-row";

const PriceInfo = ({t, values}) => {

    return (
        <Stack spacing={'20px'}>
            <Line height={'2.5px'}/>

            <Stack spacing={'5px'}>
                <PriceRow
                    title={t('Total:')}
                    value={values[0]}
                />

                <PriceRow
                    title={t('Discount:')}
                    value={values[1]}
                />

                <PriceRow
                    title={t('Sum:')}
                    variant={'h4'}
                    dotSize={'4px'}
                    value={values[2]}
                />
            </Stack>
        </Stack>
    )
}

export default withLanguage()(PriceInfo);