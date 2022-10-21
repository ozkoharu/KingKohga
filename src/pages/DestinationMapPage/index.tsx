import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { LocationPointContext, PageStateContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";
import { LoadingContext } from "../_app";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";


const PostDummyUrl = 'http://saza.kohga.local:3001/astar';
const DynamicMap = dynamic(() => {
    return import('../../component/map/BaseMap')
},
    { ssr: false }
)

interface Props {
    closeHandler: () => void
}
const Modal: React.FC<Props> = ({
    closeHandler,
}) => {
    return (
        <>
            <div id="modal" className='modal' onClick={(event) => { event.stopPropagation() }}>
                <div>
                    <p>モーダル</p>
                    <button onClick={closeHandler}>閉じるボタン</button>
                </div>
            </div>
        </>
    )
}


const DestinationMapPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { point, poly, setPoly, setPoint } = useContext(LocationPointContext);
    const [junkai, setJunkai] = useState(false)
    const { setPageLoading } = useContext(LoadingContext);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        document.removeEventListener('click', closeModal);
    }, [])

    useEffect(() => {
        return () => {
            document.removeEventListener('click', closeModal);
        }
    }, [closeModal])

    const openModal = (event: React.MouseEvent) => {
        setIsModalOpen(true);
        document.addEventListener('click', closeModal)
        event.stopPropagation()
    }

    const PostData = {
        "type": "watanabe",
        "junkai": junkai,
        "data": point
    }

    const onClickBack = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }

    const onClickJunkai = () => {
        setJunkai(!junkai);
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
                    <button className="button" onClick={(event) => { openModal(event) }}>チュートリアルを開く</button>
                </BaseHeader>
                {
                    isModalOpen ? <Modal closeHandler={() => { closeModal() }} /> : <></>
                }
                <DynamicMap />

                <BaseFooter />
            </div>
        </>
    )
}
export default DestinationMapPage;