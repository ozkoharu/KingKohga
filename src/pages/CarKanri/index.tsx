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
                <div className="bottomflex">
                    <h1>通行可能領域</h1>
                    <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="buttom">
                        TOPへ
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(8, setPage)} _className="buttom">
                        通行可能領域設定
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(9, setPage)} _className="buttom">
                        車一覧
                    </BaseButton>
                </div>
            </BaseHeader>
        </>
    )
}
export default CarKanri;