import React, { useContext, useState } from "react"
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { LocationPointContext, NewPointContext } from "../../pages";
//Marker壊れたとき用
import * as L from "leaflet";
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;
const greenOptions = {
    color: "green",
}

const RouteMap = () => {
    const {
        poly,
        point,
        setPoint,
        setPoly,
        temp,
        setTemp,
        pointFlag,
        setPointFlag,
        relayFlag,
        setRelayFlag,
    } = useContext(LocationPointContext);
    const {
        newPoint,
        setNewPoint,
        middle,
        setMiddle,
        newMiddle,
        setNewMiddle } = useContext(NewPointContext);

    const ClickMarker = () => {
        console.log('ClickMarkerの一番最初', pointFlag);
        console.log('ClickMarkerの一番最初point', point)
        console.log('ClickMarkerの一番最初newPoint', newPoint);
        useMapEvents({
            click(e) {
                if (pointFlag === false) {
                    setPoint((prevValue) => {
                        const newValue = [...prevValue, e.latlng]
                        return newValue
                    });
                    setNewPoint((prevValue) => {
                        const newValue = [...prevValue, { Point: e.latlng, Relay: false }]
                        return newValue
                    })
                }
            },
        })
        return (
            <React.Fragment>
                {
                    newPoint.map((n, index) =>
                        n.Relay ? <></> :
                            <Marker
                                position={n.Point}
                                key={index}
                                riseOnHover={true}
                                eventHandlers={{
                                    contextmenu: (e) => {
                                        if (confirm('この目的地を削除しますか?')) {
                                            let index = point.indexOf(e.latlng);
                                            point.splice(index, 1);
                                            setPoly([[]]);
                                        }
                                    }
                                }}
                            ></Marker>
                    )
                }
            </React.Fragment>
        )
    }
    const MiddleClickMarker = () => {
        useMapEvents({
            click(e) {
                setMiddle((prevValue) => {
                    const newValue = [...prevValue, { Point: e.latlng, Relay: true }];
                    return newValue;
                });
                setNewMiddle((prevValue) => {
                    const newValue = [...prevValue, e.latlng];
                    return newValue;
                });
            }
        })
        return (
            <React.Fragment>
                {
                    middle.map((pos, index) => <Marker
                        position={pos.Point}
                        key={index}
                        riseOnHover={true}
                        eventHandlers={{
                            contextmenu: (e) => {
                                if (confirm('この目的地を削除します')) {
                                    let index = middle.indexOf({ Point: e.latlng, Relay: true });
                                    middle.splice(index, 1);
                                    setPoly([[]]);
                                }
                            }
                        }}></Marker>)
                }
            </React.Fragment>
        )
    }
    const MultiPoly = () => {
        console.log('poly', poly)
        return (
            <React.Fragment>
                {
                    poly.map((elem, index) => {
                        console.log('elem', elem);
                        return <Polyline
                            weight={20}
                            pathOptions={greenOptions}
                            positions={elem}
                            key={index}
                            eventHandlers={{
                                click: (e) => {
                                    if (confirm('中継点を追加してください')) {
                                        setPointFlag(true);
                                        console.log('e.target._latlngs', e.target._latlngs);
                                        console.log('point', point);
                                        let index = 0;
                                        for (const p of point) {
                                            if (p.equals(e.target._latlngs[0])) {
                                                break;
                                            }
                                            index++
                                        }
                                        if (index === point.length) {
                                            index = -1;
                                        }
                                        setTemp(index);
                                        console.log('index', index);
                                    } else {
                                        setPointFlag(false);
                                    }
                                },
                            }}
                        />
                    }
                    )
                }
            </React.Fragment>
        )
    }
    return (
        <MapContainer center={position} zoom={zoomlebel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a> contributors'
                url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
            />
            <ClickMarker />
            {
                pointFlag ? <MiddleClickMarker /> : <></>
            }
            <MultiPoly />
        </MapContainer>
    )
}
export default RouteMap;