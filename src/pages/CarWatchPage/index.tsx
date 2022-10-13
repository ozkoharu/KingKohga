import axios from "axios";
import Link from "next/link";
import React, { useContext } from "react";
import { LocationPointContext, PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
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
    return (
        <>
            <BaseHeader>
                <div className="flexbottom">
                    <BaseButton onClick={onClickMenu} _className="buttom">
                        車メニューに戻る
                    </BaseButton>
                    <BaseButton onClick={onClickNext} _className="buttom">
                        次の目的地に行く
                    </BaseButton>
                </div>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicRouteMap />
            </div>
        </>
    )
}
export default CarWatchPage