import Link from "next/link";
import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const CarWatchPage = () => {
    const { page, setPage } = useContext(PageStateContext);
    return (
        <>
            <h1>愛車を眺めるぜ</h1>
            <div>
                <BaseButton onClick={() => OnClickSetState(1, setPage)} isSubmit={false}>
                    車メニューに戻る
                </BaseButton>
            </div>
        </>
    )
}
export default CarWatchPage