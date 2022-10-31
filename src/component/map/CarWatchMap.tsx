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
        setPoly,
        setTemp,
        setPointFlag,

    } = useContext(LocationPointContext);
    const {
        newPoint,
    } = useContext(NewPointContext);

    const ClickMarker = () => {
        return (
            <React.Fragment>
                {
                    point.map((n, index) =>
                        <Marker
                            position={n}
                            key={index}
                            riseOnHover={true}
                        ></Marker>
                    )
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
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickMarker />
            <MultiPoly />
        </MapContainer>
    )
}
export default RouteMap;