import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { LocationPointContext, NewPointContext, PageStateContext, UserIdContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";
import { LoadingContext } from "../_app";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { newPoint } from "../AddRoutePage";


const PostDummyUrl = 'http://saza.kohga.local:3001/astar';
const DynamicMap = dynamic(() => {
    return import('../../component/map/DestinationMap')
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
            <div className='modalContainer' onClick={closeHandler}>
                <div className="modalBody">
                    <p>モーダル</p>
                    <div className="modalButtons">
                        <button onClick={closeHandler}>閉じるボタン</button>
                    </div>
                </div>
            </div>
        </>
    )
}


const DestinationMapPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { point, poly, setPoly, setPoint, setTemp, temp } = useContext(LocationPointContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const { newPoint, setNewPoint, middle, setMiddle, } = useContext(NewPointContext);
    const [junkai, setJunkai] = useState(false)
    const { setPageLoading } = useContext(LoadingContext);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
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

    const onClickBack = () => {
        setPoint([]);
        setPoly([[]]);
        OnClickSetState(1, setPage)
    }
    const DestinationData = {
        "userId": userId,
        "junkai": junkai,
        "data": point
    }
    const onClickJunkai = () => {
        setJunkai(!junkai);
    }

    let polyData: LatLng[][] = [[]];
    const onClickRouteSearch = async () => {
        let ababa: newPoint[] = [];
        for (let i = 0; i < point.length; i++) {
            ababa[i] = {
                Point: point[i],
                Relay: false,
            }
        }
        setNewPoint(ababa);

        console.log('point', point);
        console.log('newPoint', ababa);
        setPageLoading(true);
        console.log("PostData", DestinationData);

        await axios.post(PostDummyUrl, DestinationData)
            .then((res) => {
                setPageLoading(false);
                polyData = res.data.route;
                setPoly(polyData);
            })
            .catch(e => {
                console.log('Post Error', e)
                setPageLoading(false);
            })
            .finally(() => {
                OnClickSetState(4, setPage);
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

                <DynamicMap />
                {
                    isModalOpen ? <Modal closeHandler={closeModal} /> : <></>
                }
                <BaseFooter />
            </div>
        </>
    )
}
export default DestinationMapPage;