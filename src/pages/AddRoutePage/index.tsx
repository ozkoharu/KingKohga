import axios from "axios";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { LocationPointContext, NewPointContext, PageStateContext, UserIdContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { LoadingContext } from "../_app";

export const DynamicRouteMap = dynamic(() => {
    return import('../../component/map/Routemap')
},
    { ssr: false }
)
export interface newPoint {
    Point: LatLng
    Relay: boolean
}

const PostDummyUrl = 'http://saza.kohga.local:3001/astar';
const PostSaveRouteUrl = 'http://saza.kohga.local:3001/saveRoute';


const AddRoutePage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const {
        newPoint,
        setNewPoint,
        middle,
        setMiddle,
        newMiddle,
        setNewMiddle } = useContext(NewPointContext);
    const {
        point,
        setPoint,
        poly,
        setPoly,
        temp,
        pointFlag,
        setPointFlag,
        relayFlag,
        setRelayFlag
    } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
    const [input, setInput] = useState('');
    const { setPageLoading } = useContext(LoadingContext);


    const onClickJunkai = () => {
        setJunkai(!junkai);
    }

    const SaveRouteData = {
        "userId": userId,
        "routeName": input,
        "route": poly,
        "junkai": junkai
    }
    const routeSave = async () => {
        //経路保存
        await axios.post(PostSaveRouteUrl, SaveRouteData)
            .then((res) => {
                console.log('postdata', SaveRouteData);
                console.log('res', res.data);
                if (res.data.succeeded === true) {
                    alert('経路を保存できました')

                } else {
                    alert('経路を正しく保存できませんでした')
                }
                OnClickSetState(5, setPage)
            })
            .catch((e) => {
                console.log(e);
            })
    }

    const onClickBack = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }

    const PostData = {
        "userId": userId,
        "junkai": junkai,
        "data": point,
        "relay": relayFlag
    }

    let polyData: LatLng[][] = [[]];

    const onClickRouteSearch = async () => {
        if (pointFlag) {
            if (temp === -1) {
                alert('中継点を追加してください');
            } else {
                //ここら辺に問題がありそう一回目の.spliceはいいけど２回目以降が動かない多分２回目からはtemp + 1じゃ無理くない？
                newPoint.splice(temp + 1, 0, ...middle);
                point.splice(temp + 1, 0, ...newMiddle);
                for (let i = 0; i < newPoint.length; i++) {
                    relayFlag[i] = newPoint[i].Relay;
                }
                relayFlag.pop();
                setMiddle([]);
                setNewMiddle([]);
            }
        }

        setPageLoading(true);
        console.log('point', point);
        console.log('relayFlag', relayFlag);
        console.log('newPoint', newPoint);
        console.log('PostData', PostData);

        await axios.post(PostDummyUrl, PostData)
            .then((res) => {
                setPageLoading(false);
                polyData = res.data.route;
                setPoly(polyData);
                console.log('res', res.data.route);
                setPointFlag(false);
            })
            .catch(e => {
                setPageLoading(false);
            })
            .finally(() => {

                OnClickSetState(4, setPage);
            })
    }

    return (
        <>
            <div className="container map add-route">
                <BaseHeader>
                    <BaseCheckBox onChange={onClickJunkai} >
                        <span className="check">巡回ルート</span>
                    </BaseCheckBox>

                    <label htmlFor="input" id="input">経路名</label>
                    <input type="text" onChange={(e) => setInput(e.target.value)} name="input" id="input" value={input} />

                    <BaseButton onClick={routeSave} _className="button">
                        保存
                    </BaseButton>
                    <BaseButton onClick={onClickBack} _className="button">
                        TOPへ戻る
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(2, setPage)} _className="button">
                        目的地入力へ戻る
                    </BaseButton>
                    <BaseButton onClick={onClickRouteSearch} _className="button">
                        経路探索
                    </BaseButton>
                </BaseHeader>
                <DynamicRouteMap />

                <BaseFooter />

            </div>
        </>
    )
}
export default AddRoutePage