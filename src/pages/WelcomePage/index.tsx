import React, { useCallback, useContext } from "react"
import { PageStateContext } from ".."
import { BaseButton } from "../../component/atoms/button/BaseButton"
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";


const WelcomePage = () => {
    const { setPage } = useContext(PageStateContext);

    return (
        <>
            <div className="buttomflex">
                <BaseButton onClick={() => OnClickSetState(1, setPage)} _className="buttom">
                    車を使う
                </BaseButton>
                <BaseButton onClick={() => OnClickSetState(7, setPage)} _className="buttom">
                    車管理マネージャ
                </BaseButton>
            </div>
        </>
    )
}
export default WelcomePage;