import React, { useContext, useEffect } from "react"
import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { CircleContext, LocationPointContext, NewPointContext } from "../../pages";
//Marker壊れたとき用
import L from "leaflet"
import { loadComponents } from "next/dist/server/load-components";
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'


const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlebel = 18;

const ClickMarker = () => {

    const { point, setPoint, setPoly } = useContext(LocationPointContext);
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
            {

                point.map((pos, index) => <Marker
                    position={pos}
                    key={index}
                    riseOnHover={true}
                    eventHandlers={{
                        contextmenu: (e) => {
                            if (confirm('この目的地を削除しますか？')) {
                                let index = point.indexOf(e.latlng);
                                point.splice(index, 1);
                                setPoly([[]]);
                            }
                        }
                    }}
                >
                </Marker>)}
        </React.Fragment>
    )
}

const ViewCircle = () => {
    const { viewcircle, setViewCircle, viewRadius, setViewRadius } = useContext(CircleContext);


    return (
        <React.Fragment>
            {
                viewcircle.map((e, index) =>
                    <Circle center={e.pos}
                        pathOptions={{ fillColor: "blue" }}
                        radius={e.r}
                        key={index}
                        stroke={false}
                    ></Circle>
                )
            }
        </React.Fragment>
    )
}

const DestinationMap = () => {

    return (
        <MapContainer center={position} zoom={zoomlebel} scrollWheelZoom={false} doubleClickZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickMarker />
            <ViewCircle />
        </MapContainer>
    )
}
export default DestinationMap;