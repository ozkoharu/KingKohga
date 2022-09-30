import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const CarKanri = () => {
    const { page, setPage } = useContext(PageStateContext);
    return (
        <>
            <h1>車管理ページ(仮)</h1>
            <BaseButton onClick={() => OnClickSetState(0, setPage)} isSubmit={false}>
                ようこそジャパリパーク
            </BaseButton>
        </>
    )
}
export default CarKanri;