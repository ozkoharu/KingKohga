import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import BaseCircleMap from "../../component/map/BaseCircleMap";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";


const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseCircleMap')
},
    { ssr: false }
)

const CarKanri = () => {
    const { page, setPage } = useContext(PageStateContext);
    return (
        <>
            <BaseHeader>
                <h1>通行可能領域</h1>
                <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="buttom">
                    TOPへ
                </BaseButton>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicMap />
            </div>
        </>
    )
}
export default CarKanri;