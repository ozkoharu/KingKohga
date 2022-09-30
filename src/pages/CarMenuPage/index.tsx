import React, { useContext, useEffect } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
const CarMenuPage = () => {

    const { page, setPage } = useContext(PageStateContext);
    return (
        <>
            <div>
                <BaseButton onClick={() => OnClickSetState(2, setPage)} isSubmit={false}>
                    新規ルート開拓
                </BaseButton>
            </div>
            <div>
                <BaseButton onClick={() => OnClickSetState(3, setPage)} isSubmit={false}>
                    既存ルート選択する
                </BaseButton>
            </div>
            <div>
                <BaseButton onClick={() => OnClickSetState(5, setPage)} isSubmit={false}>
                    俺の愛車を見ちゃうぞ
                </BaseButton>
            </div>
            <div>
                <BaseButton onClick={() => OnClickSetState(6, setPage)} isSubmit={false}>
                    俺の愛車を廃車にしちゃうぞ
                </BaseButton>
            </div>
        </>
    )
}
export default CarMenuPage;