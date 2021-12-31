import React, { useState } from 'react';
import { useMapEvents, TileLayer, LayersControl, LayerGroup, GeoJSON, Marker, Popup, useMap, } from 'react-leaflet'
import { Typography, Divider } from '@mui/material';
// import markers from '../data/markers.json';
import { useData } from '../data/DataContext';
import MarkerList from './MarkerList';
// import plane from 'https://www.iconspng.com/clipart/pirate-flag/pirate-flag.svg';

const Layers = () => {
    const map = useMap()
    // const map = useMapEvents({
    //     zoomend: () => {
    //         console.log(map.getZoom())
    //     },
    //     moveend: () => {
    //         console.log(map.getBounds())
    //     },
    // })
    console.log("Map Bounds:", map.getBounds())
    console.log("Zoom Level:", map.getZoom())
    const { value, setValues } = useData()

    const onMouseEvent = (event, type) => {
        switch (type) {
            case 'over':
                event.target.setStyle({ fillOpacity: 0.5 })
                break
            case 'out':
                event.target.setStyle({ fillOpacity: 0.0 })
                break
            default:
                break
        }
    }

    return (
        <>
            <LayersControl position='topright'>
                <LayersControl.BaseLayer checked name='Basic Map'>
                    <TileLayer
                        attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                </LayersControl.BaseLayer>
                {/* <MarkerList /> */}
                {
                    // Iterate the borderData with .map():
                    value?.features.map((marker) => {
                        // Get the layer data from geojson:
                        const geojson = marker.geometry
                        // Get the name of the state from geojson:
                        const state_name = marker.properties.name
                        return (
                            // Pass data to layer via props:
                            <Marker key={marker.properties.id} position={marker.geometry.coordinates}>
                                <Popup>
                                    {marker.properties.name} <br /> {marker.properties.info}
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </LayersControl>
        </>
    )
}

export default Layers


