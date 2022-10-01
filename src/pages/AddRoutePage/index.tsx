import axios from "axios";
import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const DynamicRouteMap = dynamic(() => {
    return import('../../component/map/Routemap')
},
    { ssr: false }
)

const AddRoutePage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
    const onClickJunkai = () => {
        setJunkai(!junkai);
    }
    const routeCheck = () => {
        //経路チェック

    }
    const routeGoChcek = () => {
        //実行可能チェック
    }
    return (
        <>
            <BaseHeader>
                <div>
                    <BaseCheckBox onChange={onClickJunkai}>
                        巡回ルート
                    </BaseCheckBox>
                </div>
                <div>
                    <BaseButton onClick={routeCheck} isSubmit={false}>
                        経路確定
                    </BaseButton>
                </div>
                <h1>経路編集ページ</h1>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicRouteMap />
            </div>
        </>
    )
}
export default AddRoutePage