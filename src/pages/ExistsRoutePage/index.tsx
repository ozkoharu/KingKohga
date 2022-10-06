import React, { useContext } from "react";
import { PageStateContext } from "..";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { FormSelect } from "../../component/atoms/select/BaseSelect";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { DynamicRouteMap } from "../AddRoutePage";

const ExistsRoutePage = () => {
    const { setPage } = useContext(PageStateContext);
    //ここにアクセスした時にuseEffectで、星くんにGETで保存してある経路名と
    //LatLng[][]を取ってくる
    //ここでLatLng[][]を取ってきても映らないから何かロジックを考えないといけない
    //ここにMapを持ってきてここでダイナミックインポート
    return (
        <>
            <BaseHeader>
                <div className="buttomflex">
                    <BaseButton onClick={() => OnClickSetState(1, setPage)} _className="buttom">
                        車メニューに戻る
                    </BaseButton>

                    <BaseButton onClick={() => OnClickSetState(4, setPage)} _className="buttom">
                        この経路に行く
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