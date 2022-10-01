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
    const [input, setInput] = useState('');
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
                <div>
                    <label htmlFor="input">経路名</label>
                    <input type="text" onChange={(e) => setInput(e.target.value)} name="input" id="input" value={input} />
                </div>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicRouteMap />
            </div>
        </>
    )
}
export default AddRoutePage