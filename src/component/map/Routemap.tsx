import React, { useContext } from "react"
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { LocationPointContext } from "../../pages";
//Marker壊れたとき用
import * as L from "leaflet";
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'

let greenIcon = new L.Icon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
})


const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;
const redOptions = { color: "blue" }

const LinePoly = () => {
    const { poly, setPoly } = useContext(LocationPointContext);
    return (
        <React.Fragment>
            <Polyline pathOptions={redOptions} positions={poly}></Polyline>
        </React.Fragment>
    )
}

const ClickMarker = () => {

    const { point, setPoint, setPoly } = useContext(LocationPointContext);
    useMapEvents({
        click(e) {
            setPoint((prevValue) => {
                const newValue = [...prevValue, e.latlng]
                return newValue
            });
        }
    })
    return (
        <React.Fragment>
            {point.map((pos, index) => <Marker
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
            ></Marker>)}
        </React.Fragment>
    )
}

const RouteMap = () => {

    return (
        <MapContainer center={position} zoom={zoomlebel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickMarker />
            <LinePoly />
        </MapContainer>
    )
}
export default RouteMap;