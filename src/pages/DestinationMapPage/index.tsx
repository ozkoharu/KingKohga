import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";

const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseMap')
},
    { ssr: false }
)

const DestinationMapPage = () => {
    const [junkai, setJunkai] = useState(false)
    const onClickJunkai = () => {
        setJunkai(!junkai);
    }
    return (
        <>

            <BaseHeader>
                <Link href="/AddRoutePage">
                    <a>経路探索</a>
                </Link>
                <BaseCheckBox onChange={onClickJunkai} >
                    巡回ルート
                </BaseCheckBox>
            </BaseHeader>
            <div className="gakubuti">
                <DynamicMap />
            </div>
        </>
    )
}
export default DestinationMapPage