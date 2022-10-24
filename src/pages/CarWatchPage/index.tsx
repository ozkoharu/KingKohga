import axios from "axios";
import Link from "next/link";
import React, { useContext } from "react";
import { LocationPointContext, PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";

const Url = "http://tktm.kohga.local:3000/next"

const CarWatchPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { setPoint, setPoly } = useContext(LocationPointContext)
    const { userId, setUserId } = useContext(UserIdContext);
    const onClickMenu = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }

    const postdata = { "userId": userId }

    const onClickNext = () => {
        axios.post(Url, postdata)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => console.log(e));
    }

    const onClickCarStop = () => {
        console.log('Car stop');
    }

    return (
        <>
            <div className="container map car-watch">
                <BaseHeader>
                    <BaseButton onClick={onClickMenu} _className="button">
                        車メニューに戻る
                    </BaseButton>
                    <BaseButton onClick={onClickNext} _className="button">
                        次の目的地に行く
                    </BaseButton>
                    <BaseButton onClick={onClickCarStop} _className="button">
                        車を停止
                    </BaseButton>
                </BaseHeader>
                <main>
                    <DynamicRouteMap />
                </main>
                <BaseFooter />
            </div>
        </>
    )
}
export default CarWatchPage