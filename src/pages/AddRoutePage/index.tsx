import axios from "axios";
import { LatLng } from "leaflet";
import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { LoadingContext } from "../_app";

export const DynamicRouteMap = dynamic(() => {
    return import('../../component/map/Routemap')
},
    { ssr: false }
)
const tktmdummy = 'http://tktm.kohga.local:3000/api/Astar'

const AddRoutePage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
    const [input, setInput] = useState('');
    const { setPageLoading } = useContext(LoadingContext);

    const onClickJunkai = () => {
        setJunkai(!junkai);
    }
    const routeCheck = () => {
        //経路チェック

        OnClickSetState(5, setPage)
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
        "type": "watanabe",
        "junkai": junkai,
        "data": point
    }
    let temp: LatLng[][] = [[]];
    const onClickRouteSearch = async () => {
        //ここにaxiosの処理
        setPageLoading(true);
        console.log("PostData", PostData);
        await axios.post(tktmdummy, PostData)
            .then((res) => {
                console.log('type', res.data.type);
                console.log(res.data.data);
                setPageLoading(false);
                temp = res.data.data;
                setPoly(temp);
            })
            .catch(e => {
                console.log('Post Error', e)
                setPageLoading(false);
            })
            .finally(() => {
                OnClickSetState(4, setPage);
                console.log('complete', poly);
            })
    }
    return (
        <>
            <BaseHeader>
                <div className="bottomflex">
                    <div className="bottomflex">
                        <BaseCheckBox onChange={onClickJunkai} >
                            巡回ルート
                        </BaseCheckBox>

                        <label htmlFor="input">経路名</label>
                        <input type="text" onChange={(e) => setInput(e.target.value)} name="input" id="input" value={input} />

                        <BaseButton onClick={routeCheck} _className="buttom">
                            経路確定
                        </BaseButton>
                        <BaseButton onClick={onClickBack} _className="buttom">
                            戻る
                        </BaseButton>
                        <BaseButton onClick={onClickRouteSearch} _className="buttom">
                            経路探索
                        </BaseButton>
                    </div>
                </div>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicRouteMap />
            </div>
        </>
    )
}
export default AddRoutePage