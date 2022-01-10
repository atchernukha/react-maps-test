import React, { useEffect } from 'react';
import axios from 'axios';
import { useMapEvent, TileLayer,  Marker, Popup, useMap, } from 'react-leaflet'
import { useData } from '../data/DataContext';

const Layers = () => {
    const { value, setValues } = useData()
    const map = useMap()
    const fetchMarkers = () => {
        const {_northEast, _southWest} =  map.getBounds();
        const baseURL = process.env.REACT_APP_API_HOST + 'api';
        axios({
            url: baseURL + '/item',
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            params: {
                southWestLat: _southWest.lat,
                southWestLng: _southWest.lng,
                northEastLat: _northEast.lat,
                northEastLng: _northEast.lng
             }
        }).then(res => {
            setValues({ ...res.data, "currentMarker": null});
        })
    }
    const map1 = useMapEvent({
        moveend: () => fetchMarkers()
    })
    useEffect(() => fetchMarkers(), [])
    // console.log(value)

    return (
        <>
                    <TileLayer
                        attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                {
                    value?.features?.map((marker) => {
                        return (
                            <Marker key={marker?.properties?.id} position={marker?.geometry?.coordinates} eventHandlers={{
                                click: (e) => {
                                  setValues( {"currentMarker":  marker } )
                                },
                              }}>
                                {/* <Popup>
                                    {marker?.properties?.name} <br /> {marker?.properties?.info}
                                </Popup> */}
                            </Marker>
                        )
                    })
                }
        </>
    )
}

export default Layers


