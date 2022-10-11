import axios from "axios";
import React, { useCallback, useContext } from "react"
import { PageStateContext, UserIdContext } from ".."
import { BaseButton } from "../../component/atoms/button/BaseButton"
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const Url = "http://saza.kohga.local:3001/createUser"

const WelcomePage = () => {
    const { setPage } = useContext(PageStateContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const onClickCaruse = async () => {


        await axios.get(Url)
            .then((res) => {
                if (res.data.succeeded === true) {
                    setUserId(res.data.userId);
                    OnClickSetState(1, setPage);
                } else {
                    alert('車が空いていません。少し待っててね')
                    setUserId('');
                }
            })
            .catch((e) => console.log(e))
    }

    return (
        <>
            <div className="buttomflex">
                <BaseButton onClick={onClickCaruse} _className="buttom">
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