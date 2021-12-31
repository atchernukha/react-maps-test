import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import plane from 'https://www.iconspng.com/clipart/pirate-flag/pirate-flag.svg'

export default function Map() {
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    async function getISS() {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
        const data = await res.json()
        setLat(data.latitide)
        setLng(data.longitude)
    }
    const myIcon = new L.Icon({
        iconUrl: plane,
        iconRetUrl: plane,
        popupAnchor: [-0, -0],
        iconSize: [32, 45]
    })
    const position = [51.505, -0.09]

    return (
        <>
           <MapContainer center={position} zoom={13} scrollWheelZoom={false} 
                        style={{width: '100vw', height: '100vh'}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            {/* <MapContainer 
                style = { { height: "401px", width: "501px"}} center={[lat, lng]} 
                center = {[lat, lng]}
                zoom={6}
                scrolWheelZoom ={false}
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}'>
                </TileLayer>
                <Marker position={[lat,lng]} icon = {myIcon}>
                    <Popup>
                        Popup Test
                    </Popup>
                </Marker>
            </MapContainer> */}
        </>
    )
}
