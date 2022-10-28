import axios from "axios";
import React, { useContext } from "react";
import { PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const Url = 'http://saza.kohga.local:3001/terminate';
const EndPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const EndData = {
        "userId": userId
    }
    const onClickEnd = async () => {
        await axios.post(Url, EndData)
            .then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e);
            })
        OnClickSetState(0, setPage);
    }

    return (
        <>
            <div className="container end">
                <BaseHeader>
                    <h1>
                        <span>
                            Thank you for coming
                        </span>
                    </h1>
                </BaseHeader>
                <main>
                    <h1>ご利用ありがとうございました<br></br>またのご利用をお待ちしております</h1>


                    <div>
                        <BaseButton onClick={onClickEnd} _className="button">
                            TOPへ
                        </BaseButton>
                    </div>
                </main>
                <BaseFooter />
            </div>
        </>
    )
}
export default EndPage