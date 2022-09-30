import Link from "next/link";
import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const ExistsRoutePage = () => {
    const { page, setPage } = useContext(PageStateContext);
    return (
        <>
            <h1>既存ルート選択ページです</h1>
            <div>
                <BaseButton onClick={() => OnClickSetState(1, setPage)} isSubmit={false}>
                    車メニューに戻る
                </BaseButton>
            </div>
            <div>
                <BaseButton onClick={() => OnClickSetState(4, setPage)} isSubmit={false}>
                    この経路に行く
                </BaseButton>
            </div>
        </>
    )
}
export default ExistsRoutePage