import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const EndPage = () => {
    const { setPage } = useContext(PageStateContext);
    return (
        <>
            <h1>終わりです。</h1>

            <div>
                <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="buttom">
                    TOPへ戻る
                </BaseButton>
            </div>
        </>
    )
}
export default EndPage