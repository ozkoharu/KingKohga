import dynamic from "next/dynamic";
import React, { useContext, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { LocationPointContext, PageStateContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";
import { LoadingContext } from "../_app";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";



const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseMap')
},
    { ssr: false }
)
const PostDummyUrl = 'http://saza.kohga.local:3001/astar';


const DestinationMapPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { point, poly, setPoly, setPoint } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
    const { setPageLoading } = useContext(LoadingContext);

    const onClickBack = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }

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
                console.log('res', res.data);
                console.log('type', res.data.type);
                console.log(res.data.route);
                setPageLoading(false);
                temp = res.data.route;
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
            <div className="container map dest-map">
                <BaseHeader>

                    <BaseCheckBox onChange={onClickJunkai} >
                        <span className="check">
                            巡回ルート
                        </span>
                    </BaseCheckBox>
                    <BaseButton onClick={onClickRouteSearch} _className="button">
                        経路探索
                    </BaseButton>
                    <BaseButton onClick={onClickBack} _className="button">
                        戻る
                    </BaseButton>

                </BaseHeader>

                <main>
                    <DynamicMap />
                </main>
                <BaseFooter />
            </div>
        </>
    )
}
export default DestinationMapPage