import React from 'react';
import { useMapEvents, TileLayer, LayersControl, Marker, Popup, useMap, } from 'react-leaflet'
import { useData } from '../data/DataContext';

const Layers = () => {
    const { value, setValues } = useData()
    const map = useMap()
    const map1 = useMapEvents({
        moveend: () => {
            const {_northEast, _southWest} =  map.getBounds();
                  setValues( {"filtered":  value.features.filter(marker => 
                             (_southWest.lat < marker.geometry.coordinates[0] 
                            && marker.geometry.coordinates[0] < _northEast.lat
                            && _southWest.lng < marker.geometry.coordinates[1] 
                            && marker.geometry.coordinates[1] < _northEast.lng))}  )
        },
    })
    // console.log("Map Bounds:", map.getBounds())
    // console.log("Zoom Level:", map.getZoom())
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
        </>
    )
}

export default Layers


