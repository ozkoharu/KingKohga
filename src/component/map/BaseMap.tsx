import React from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
//Marker壊れたとき用
import L from 'leaflet';
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;


const BaseMap = () => {
    return (
        <MapContainer center={position} zoom={zoomlebel}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}
export default BaseMap;