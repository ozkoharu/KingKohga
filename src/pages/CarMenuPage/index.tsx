import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
const CarMenuPage = () => {

    const { page, setPage } = useContext(PageStateContext);
    return (
        <>
            <div className="buttomflex">
                <BaseButton onClick={() => OnClickSetState(2, setPage)} _className="buttom">
                    新規ルート開拓
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(3, setPage)} _className="buttom">
                    既存ルート選択する
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(5, setPage)} _className="buttom">
                    車を見る
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(6, setPage)} _className="buttom">
                    終わり
                </BaseButton>
            </div>
        </>
    )
}
export default CarMenuPage;