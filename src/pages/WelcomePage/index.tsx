import axios from "axios";
import React, { useCallback, useContext } from "react"
import { PageStateContext, UserIdContext } from ".."
import { BaseButton } from "../../component/atoms/button/BaseButton"
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const Url = "http://saza.kohga.local:3001/createUser"

const WelcomePage = () => {
    const { setPage } = useContext(PageStateContext);
    const { userId, setUserId } = useContext(UserIdContext);

    const onClickCaruse = async () => {
        //OnClickSetState(1, setPage) //DEBUG
        await axios.get(Url)
            .then((res) => {

                if (res.data.succeeded === true) {
                    setUserId(res.data.userId);
                    console.log(setUserId);
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
            <div className="welcome">
                <video autoPlay muted loop playsInline preload="metadata" disablePictureInPicture onContextMenu={() => { return false }}>
                    <source src="../../assets/movie/video_17048352131600-VPA7DOB5.mp4" type="video/mp4" />
                    <p>動画の再生無理</p>
                </video>
                <BaseHeader>
                    <h1>
                        <span>Kohga TOP</span>
                    </h1>
                </BaseHeader>
                <ul>
                    <li>
                        <BaseButton onClick={onClickCaruse} _className="button">
                            車を使う
                        </BaseButton>
                    </li>
                    <li>
                        <BaseButton onClick={() => OnClickSetState(7, setPage)} _className="button">
                            車管理マネージャ
                        </BaseButton>
                    </li>
                </ul>
                <BaseFooter />

            </div>

        </>
    )
}
export default WelcomePage;