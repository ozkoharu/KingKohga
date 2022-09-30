import React, { useCallback, useContext } from "react"
import { PageStateContext } from ".."
import { BaseButton } from "../../component/atoms/button/BaseButton"
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";


const WelcomePage = () => {
    const { page, setPage } = useContext(PageStateContext);

    return (
        <>
            <div>
                <BaseButton onClick={() => OnClickSetState(1, setPage)} isSubmit={false}>
                    車を使う
                </BaseButton>
            </div>
            <div>
                <BaseButton onClick={() => OnClickSetState(7, setPage)} isSubmit={false}>
                    車管理マネージャ
                </BaseButton>
            </div>
        </>
    )
}
export default WelcomePage;