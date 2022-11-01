import dynamic from "next/dynamic";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BaseButton } from "../../component/atoms/button/BaseButton";
import { BaseCheckBox } from "../../component/atoms/checkbox/BaseCheckBox";
import { BaseHeader } from "../../component/template/Header/BaseHeader";
import { OnClickSetState } from "../../component/onClickSetState/onClickSetState";
import { ChangeShortCut, CircleContext, LocationPointContext, NewPointContext, PageStateContext, UserIdContext } from "..";
import axios from "axios";
import { LatLng } from "leaflet";
import { LoadingContext } from "../_app";
import { BaseFooter } from "../../component/template/Footer/BaseFooter";
import { newPoint } from "../AddRoutePage";
import { Modal } from "../../component/hooks/modal";


const PostDummyUrl = 'http://saza.kohga.local:3001/astar';
const PostOkRouteUrl = 'http://saza.kohga.local:3001/';
const DynamicMap = dynamic(() => {
    return import('../../component/map/DestinationMap')
},
    { ssr: false }
)


const DestinationMapPage = () => {
    const { setPage } = useContext(PageStateContext);
    const { point, poly, setPoly, setPoint, setTemp, temp, relayFlag, setRelayFlag } = useContext(LocationPointContext);
    const { userId, setUserId } = useContext(UserIdContext);
    const { newPoint, setNewPoint, middle, setMiddle, } = useContext(NewPointContext);
    const [junkai, setJunkai] = useState(false)
    const { setPageLoading } = useContext(LoadingContext);
    const { viewcircle, setViewCircle, viewRadius, setViewRadius } = useContext(CircleContext);

    const { firstPage } = useContext(ChangeShortCut); // 親から値を貰う
    const [isModalOpen, setIsModalOpen] = useState(!firstPage); // 貰った値を初期値とする
    const modalText = [
        [	// ページ1
            "1. 目的地を指定する",
            "地図上でクリック/タップして車の目的地を指定できます。指定後に経路探索ボタンを押すと、車が進む経路が表示されます。巡回するボタンをオンにして経路探索を開始すると、巡回用の経路を表示します。",
        ],
        [	// ページ2
            "2. 経路を編集する",
            "表示された経路が好ましくなければ、再び経路探索ボタンを押すことで別の経路を算出することができます。また、消したい経路あるいは目的地のピンに向かって右クリック/長押しをすると削除できます。",
        ],
        [	// ページ3
            "3. 経路を確定する",
            "確定ボタンを押すと、車が動作を開始します。車の状況を確認したい時は、画面上側にある戻るボタンから車メニューに行き、車の状況を見るボタンを押してください。",
        ],
    ];

    // タイトルの連結
    const concatTitles = () => {
        const array = [];
        for (let i = 0; i < modalText.length; i++) {
            array.push(modalText[i][0]);
        }
        return array;
    };

    // 説明文の連結
    const concatText = () => {
        const array = [];
        for (let i = 0; i < modalText.length; i++) {
            array.push(modalText[i][1]);
        }
        return array;
    };

    const titles = concatTitles();
    const text = concatText();


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
        "data": point,
        "relay": relayFlag
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
            relayFlag[i] = ababa[i].Relay;
        }
        setNewPoint(ababa);
        console.log('point', point);
        console.log('newPoint', ababa);
        setPageLoading(true);
        console.log("PostData", DestinationData);

        await axios.post(PostDummyUrl, DestinationData)
            .then((res) => {
                setPageLoading(false);
                console.log('res.data', res.data);
                if (res.data.succeeded === true) {
                    polyData = res.data.route;
                    setPoly(polyData);
                } else {
                    alert('経路探索できませんでした');
                    OnClickSetState(2, setPage);
                }

            })
            .catch(e => {
                console.log('Post Error', e)
                setPageLoading(false);
            })

    }

    const riset = () => {
        setPoint([]);
        setNewPoint([]);
    }
    const pathOKRoute = async () => {
        console.log('pathOkRoute');
        await axios.post(PostOkRouteUrl, userId)
            .then((res) => {
                console.log('resPathOk', res.data);
                //星くんからのres.dataの様子を見て
                //useContextに適切な形でセットしてください
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
                    <BaseButton _className="button" onClick={riset}>
                        目的地リセット
                    </BaseButton>
                    <BaseButton _className="button" onClick={pathOKRoute}>
                        通行可能領域表示
                    </BaseButton>
                </BaseHeader>

                <DynamicMap />
                {
                    isModalOpen ? (
                        <Modal
                            closeHandler={closeModal}
                            pageNum={3}
                            titles={titles}
                            text={text}
                            modalID={"first"}
                        />
                    ) : (
                        <></>
                    )
                }
                <BaseFooter />
            </div>
        </>
    )
}
export default DestinationMapPage;