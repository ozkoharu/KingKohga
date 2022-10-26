import React, { useContext, useState } from "react"
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { LocationPointContext } from "../../pages";
//Marker壊れたとき用
import * as L from "leaflet";
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;
const blueOptions = {
    color: "blue"
}
const greenOptions = {
    color: "green"
}



const RouteMap = () => {
    const { poly, point, setPoint, setPoly, middle, setMiddle, temp, setTemp } = useContext(LocationPointContext);
    const [pointFlag, setPointFlag] = useState<boolean>(false);

    const ClickMarker = () => {
        useMapEvents({
            click(e) {
                if (pointFlag === false) {
                    setPoint((prevValue) => {
                        const newValue = [...prevValue, e.latlng]
                        return newValue
                    });

                }
            },

        })
        return (
            <React.Fragment>
                {
                    point.map((pos, index) => <Marker
                        position={pos}
                        key={index}
                        riseOnHover={true}
                        eventHandlers={{
                            contextmenu: (e) => {
                                if (confirm('この目的地を削除します')) {
                                    let index = point.indexOf(e.latlng);
                                    point.splice(index, 1);
                                    setPoly([[]]);
                                }
                            }
                        }}
                    ></Marker>)
                }
            </React.Fragment>
        )
    }
    const MiddleClickMarker = () => {
        useMapEvents({
            click(e) {
                setMiddle((prevValue) => {
                    const newValue = [...prevValue, e.latlng];
                    return newValue;
                });
            }
        })

        return (
            <React.Fragment>
                {
                    middle.map((pos, index) => <Marker
                        position={pos}
                        key={index}
                        riseOnHover={true}
                        eventHandlers={{
                            contextmenu: (e) => {
                                if (confirm('この目的地を削除します')) {
                                    let index = middle.indexOf(e.latlng);
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
        return (
            <React.Fragment>
                {
                    poly.map((elem, index) =>
                        <Polyline
                            weight={20}
                            pathOptions={greenOptions}
                            positions={elem}
                            key={index}
                            eventHandlers={{
                                contextmenu: (e) => {
                                    if (confirm('これが新しい線です')) {
                                        setPointFlag(true);
                                        console.log('latlng', e.target._latlngs);
                                        console.log('point', point);
                                        console.log(point.indexOf(e.target._latlngs[0]));
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
                            }}>
                        </Polyline>)
                }
            </React.Fragment>
        )
    }
    return (
        <MapContainer center={position} zoom={zoomlebel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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