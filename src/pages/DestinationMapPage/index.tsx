import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { LocationPointContext, PageStateContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";

const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseMap')
},
    { ssr: false }
)
const PostUrl = 'http://saza.kohga.local/Car/'

const DestinationMapPage = () => {
    const { page, setPage } = useContext(PageStateContext);
    const { point, setPoint, poly, setPoly } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
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
        //OnClickSetState(5, setPage);
        //ここにaxiosの処理
        console.log(PostData);
        await axios.post(PostUrl, PostData)
            .then((res) => {
                temp = res.data;
                setPoly(temp);
            })
            .catch(e => console.log('Post Error', e))
            .finally(() => {
                OnClickSetState(4, setPage);
            })
    }
    return (
        <>

            <BaseHeader>
                <div>
                    <BaseCheckBox onChange={onClickJunkai} >
                        巡回ルート
                    </BaseCheckBox>
                </div>
                <div>
                    <BaseButton onClick={onClickRouteSearch} isSubmit={false}>
                        経路探索
                    </BaseButton>
                </div>
                <div>
                    <BaseButton onClick={() => OnClickSetState(2, setPage)} isSubmit={false}>
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