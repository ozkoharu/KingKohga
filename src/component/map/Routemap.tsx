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
    const { poly, point, setPoint, setPoly } = useContext(LocationPointContext);
    const [pointFlag, setPointFlag] = useState<boolean>(false);

    const ClickMarker = () => {
        useMapEvents({
            click(e) {
                setPoint((prevValue) => {
                    const newValue = [...prevValue, e.latlng]
                    return newValue
                });
            },

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
    return (
        <MapContainer center={position} zoom={zoomlebel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickMarker />
        </MapContainer>
    )
}
export default RouteMap;