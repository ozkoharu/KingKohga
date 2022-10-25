import React, { useContext, useState } from "react"
import { MapContainer, Marker, Polyline, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { LocationPointContext } from "../../pages";
//Marker壊れたとき用
import * as L from "leaflet";
import { kMaxLength } from "buffer";
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
                                        console.log('e.target', e.target._latlngs);
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
            <MultiPoly />
        </MapContainer>
    )
}
export default RouteMap;