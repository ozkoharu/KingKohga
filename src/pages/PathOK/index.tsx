import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { CircleContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import BaseCircleMap from "../../component/map/BaseCircleMap";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";



const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseCircleMap')
},
    { ssr: false }
)

const PathOK = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { radius, setRadius } = useContext(CircleContext);

    const pathAreaOK = () => {
        console.log('pathAreaOK');
    }

    return (
        <>
            <BaseHeader>
                <div className="bottomflex">
                    <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="buttom">
                        TOPへ
                    </BaseButton>
                    <label htmlFor="sel">半径を入力</label>
                    <input type="number" onChange={(e) => setRadius(e.target.valueAsNumber)} name="sel" id="sel" value={radius} />
                    <BaseButton onClick={pathAreaOK} _className="buttom">
                        通行可能領域を設定する
                    </BaseButton>
                </div>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicMap />
            </div>
        </>
    )
}
export default PathOK;