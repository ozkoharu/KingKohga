import Link from "next/link";
import React, { useContext } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";

const CarWatchPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { setPoint, setPoly } = useContext(LocationPointContext)
    const onClickMenu = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }
    return (
        <>
            <BaseHeader>
                <div>
                    <BaseButton onClick={() => OnClickSetState(1, setPage)} _className="buttom">
                        車メニューに戻る
                    </BaseButton>
                </div>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicRouteMap />
            </div>
        </>
    )
}
export default CarWatchPage