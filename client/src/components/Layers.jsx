import React, { useState } from 'react';
import { useMapEvents, TileLayer, LayersControl, LayerGroup, GeoJSON, Marker, Popup, useMap, } from 'react-leaflet'
import { Typography, Divider } from '@mui/material';
import { useData } from '../data/DataContext';
import MarkerList from './MarkerList';
// import plane from 'https://www.iconspng.com/clipart/pirate-flag/pirate-flag.svg';

const Layers = () => {
    const { value, setValues } = useData()
    const map = useMap()
    const map1 = useMapEvents({
        zoomend: () => {
            console.log(map.getZoom())
        },
        moveend: () => {
            const {_northEast, _southWest} =  map.getBounds();
                  setValues( {"filtered":  value.features.filter(marker => 
                             (_southWest.lat < marker.geometry.coordinates[0] 
                            && marker.geometry.coordinates[0] < _northEast.lat
                            && _southWest.lng < marker.geometry.coordinates[1] 
                            && marker.geometry.coordinates[1] < _northEast.lng))}  )
        },
    })
    console.log("Map Bounds:", map.getBounds())
    console.log("Zoom Level:", map.getZoom())
    console.log(value)

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
                    value?.features?.map((marker) => {
                        // Get the layer data from geojson:
                        // const geojson = marker.geometry
                        // Get the name of the state from geojson:
                        // const state_name = marker.properties.name
                        return (
                            // Pass data to layer via props:
                            <Marker key={marker?.properties?.id} position={marker?.geometry?.coordinates} eventHandlers={{
                                click: (e) => {
                                  setValues( {"filtered":  [marker] } )
                                },
                              }}>
                                <Popup>
                                    {marker?.properties?.name} <br /> {marker?.properties?.info}
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


