import axios from "axios";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import React, { useContext, useId, useState } from "react";
import { LocationPointContext, PageStateContext, UserIdContext } from "..";
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
const tktmdummy = 'http://tktm.kohga.local:3000/api/Astar';
const PostDummyUrl = 'http://saza.kohga.local:3001/astar';
const PostSaveRouteUrl = 'http://saza.kohga.local:3001/saveRoute';


const AddRoutePage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
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
    const routeGoChcek = () => {
        //実行可能チェック
    }
    const onClickBack = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }

    const PostData = {
        "userId": useId,
        "junkai": junkai,
        "data": point
    }

    let temp: LatLng[][] = [[]];
    const onClickRouteSearch = async () => {
        //ここにaxiosの処理
        setPageLoading(true);
        await axios.post(PostDummyUrl, PostData)
            .then((res) => {
                setPageLoading(false);
                temp = res.data.route;
                setPoly(temp);
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
                        戻る
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