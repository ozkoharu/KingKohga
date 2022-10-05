import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const EndPage = () => {
    const { setPage } = useContext(PageStateContext);
    return (
        <>
            <h1>ここは廃車になった愛車を眺めるところです</h1>
            <div>
                <BaseButton onClick={() => OnClickSetState(0, setPage)} _className="buttom">
                    次の車をえらんでくれ
                </BaseButton>
            </div>
        </>
    )
}
export default EndPage