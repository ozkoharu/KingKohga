import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { LocationPointContext, PageStateContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";
import BaseTextForm from "../../component/atoms/inputform/BaseInputForm";
import e from "express";
import { LoadingContext } from "../_app";
import { PageLoading } from "../../component/hooks/pageLoading";

const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseMap')
},
    { ssr: false }
)
const PostDummyUrl = 'http://saza.kohga.local:3000/route/Astar'

const DestinationMapPage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
    const { pageLoading, setPageLoading } = useContext(LoadingContext);



    const onClickJunkai = () => {
        setJunkai(!junkai);
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
        await axios.post(PostDummyUrl, PostData)
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
                    <BaseCheckBox onChange={onClickJunkai} >
                        巡回ルート
                    </BaseCheckBox>
                    <BaseButton onClick={onClickRouteSearch} _className="buttom">
                        経路探索
                    </BaseButton>
                    <BaseButton onClick={() => OnClickSetState(1, setPage)} _className="buttom">
                        戻る
                    </BaseButton>
                </div>

            </BaseHeader>
            <div className="gakubuti">

                <DynamicMap />
            </div>
        </>
    )
}
export default DestinationMapPage