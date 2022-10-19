import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LocationPointContext, PageStateContext } from "..";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";
import { BaseButton } from "../../component/atoms/button/BaseButton";

const RouteNameUrl = "http://saza.kohga.local:3001/routeName"
const reqRouteUrl = "http://saza.kohga.local:3001/reqRoute"

const ExistsRoutePage = () => {
    const { setPage } = useContext(PageStateContext);
    const { setPoint, setPoly } = useContext(LocationPointContext);
    const [routeName, setRouteName] = useState<string[]>([]);
    const [select, setSelect] = useState('');
    const [single, setSingle] = useState('');

    useEffect(() => {
        axios.get(RouteNameUrl)
            .then((res) => {
                console.log('res.data.succeeded', res.data.succeeded);
                console.log('res.data.routeName', res.data.routeName);
                setRouteName(res.data.routeName);

            })
            .catch((e) => console.log(e))
    }, [])


    const reqRoute = async (routename: string) => {
        const postdata = { "routeName": routename }
        console.log('postdata', postdata);
        console.log('single', single);
        console.log('routeName', routeName);
        await axios.post(reqRouteUrl, postdata)
            .then((res) => {
                console.log('reqroute', res.data);
                setPoly(res.data.route);
                setPoint(res.data.dest);
            })
            .catch((e) => console.log(e))
    }

    const goRoute = () => {
        OnClickSetState(4, setPage)
    }
    const backCarMenu = () => {
        setPoly([[]]);
        setPoint([]);
        OnClickSetState(1, setPage)
    }

    return (
        <>
            <BaseHeader>
                <div className="buttomflex">
                    <BaseButton onClick={backCarMenu} _className="buttom">
                        車メニューに戻る
                    </BaseButton>

                    <BaseButton onClick={goRoute} _className="buttom">
                        この経路に行く
                    </BaseButton>
                    <div>
                        <select id="sel" name="sel"
                            onChange={(e) => {
                                setSelect(e.target.value)
                                setSingle(e.target.value)
                                console.log('e.target.value', e.target.value)
                            }}>
                            <option value={""} disabled selected hidden >ルートを選んでください</option>
                            {routeName ?
                                routeName.map((route, key) => <option value={route} key={key}>{route}</option>)
                                : null
                            }
                        </select>
                    </div>
                    <BaseButton onClick={() => reqRoute(single)} _className="buttom">
                        経路表示
                    </BaseButton>
                </div>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicRouteMap />
            </div>
        </>
    )
}
export default ExistsRoutePage