import React, { useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet"
import { LatLng, point } from "leaflet";
import "leaflet/dist/leaflet.css"
import { CircleContext, LatLngRadius, LocationPointContext } from "../../pages";
//Marker壊れたとき用
import L from "leaflet"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'


const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;


const hoge: LatLngRadius[] = [];
const CircleMarker = () => {
    const { circle, setCircle, radius, setRadius } = useContext(CircleContext);
    const { setPoly } = useContext(LocationPointContext);

    useMapEvents({
        click(e) {
            setCircle((prevValue) => {
                const newValue = [...prevValue, { Position: e.latlng, radius: radius }]
                console.log('newValue', newValue)
                return newValue
            })

        }
    })
    return (
        <React.Fragment>
            {circle.map((e, index) =>
                <Circle center={e.Position}
                    pathOptions={{ fillColor: "blue" }}
                    radius={e.radius}
                    key={index}
                    stroke={false}
                    eventHandlers={{
                        contextmenu: (e) => {
                            if (confirm('この領域を削除しますか?')) {
                                let index = circle.indexOf({ Position: e.latlng, radius: radius });
                                circle.splice(index, 1);
                                setPoly([[]]);
                            }
                        }
                    }}
                />
            )}
        </React.Fragment>
    )
}

const BaseCircleMap = () => {

    return (
        <MapContainer center={position} zoom={zoomlebel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a> contributors'
                url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
            />
            <CircleMarker />
        </MapContainer>
    )
}
export default BaseCircleMap;