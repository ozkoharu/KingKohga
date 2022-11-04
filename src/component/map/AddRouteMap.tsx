import React, { useContext, useState } from "react"
import { Circle, MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { CircleContext, LocationPointContext, NewPointContext } from "../../pages";
//Marker壊れたとき用
import * as L from "leaflet";
import { kMaxLength } from "buffer";
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;
let path = {
    color: "green"
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
        setNewMiddle
    } = useContext(NewPointContext);
    const [color, setColor] = useState(false);

    const ViewMarker = () => {
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
                })
            }
        })
        return (
            <React.Fragment>
                {
                    middle.map((pos, index) =>
                        <Marker
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
                            }}
                        ></Marker>
                    )
                }
            </React.Fragment>
        )
    }




    const MultiPoly = () => {
        return (
            <React.Fragment>
                {
                    poly.map((elem, index) =>
                        <Polyline
                            weight={20}
                            pathOptions={path}
                            positions={elem}
                            key={index}
                            eventHandlers={{
                                click: (e) => {
                                    if (confirm('中継点を追加してください')) {
                                        setPointFlag(true);
                                        console.log('e.target', e.target._latlngs);
                                        let index = 0;
                                        for (const p of point) {
                                            if (p.equals(e.target._latlngs[0])) {
                                                break;
                                            }
                                            index++;
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
                                mouseup: (e) => {
                                    path = {
                                        color: "red"
                                    }
                                },
                                mousedown: (e) => {
                                    path = {
                                        color: "blue"
                                    }
                                },

                            }}>
                        </Polyline>)
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
            <MultiPoly />
            <ViewMarker />
            {
                pointFlag ? <MiddleClickMarker /> : <></>
            }

        </MapContainer>
    )
}
export default RouteMap;