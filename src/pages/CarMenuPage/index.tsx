import axios from "axios";
import React, { useContext, useEffect } from "react";
import { PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";

const Url = "http://saza.kohga.local:3001/isAcceptable"

const CarMenuPage = () => {

    const { userId, setUserId } = useContext(UserIdContext);
    const { page, setPage } = useContext(PageStateContext);

    const onClickDestinationMap = async () => {
        console.log('userId', userId);

        const postdata = { "userId": userId };
        OnClickSetState(2, setPage) //DEBUG
        await axios.post(Url, postdata)
            .then((res) => {
                console.log(res.data);
                if (res.data.succeeded === true) {
                    //OnClickSetState(2, setPage)
                } else {
                    alert('車が見つかりませんでした。時間を空けてもう一度お試しください')
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            <div className="buttomflex">
                <BaseButton onClick={onClickDestinationMap} _className="buttom">
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