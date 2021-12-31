import React from 'react';
import { MapContainer, Marker, useMapEvents, ZoomControl } from 'react-leaflet'
import { useData } from '../data/DataContext';
import Layers from './Layers'


const Map = () => {

    const { value, setValues } = useData();
    const NewMarker = () => {

        const map = useMapEvents({
            click(e) {                                
                setValues({"currentMarker": {"geometry": {
                    "type": "Point",
                    "coordinates": [e.latlng.lat, e.latlng.lng]
                  }}}); 
            },            
        })

        return (
            value.currentMarker.geometry.coordinates ? 
                <Marker           
                key={value.currentMarker.geometry.coordinates[0]}
                position={value.currentMarker.geometry.coordinates}
                interactive={false} 
                />
            : null
        )   
        
    }
  return (
    <>
      <MapContainer 
        center={[37.0902, -95.7129]} 
        zoom={3} 
        zoomControl={false} 
        style={{ height: '94vh', width: '100%' }}
      >
        <Layers /> 
        <NewMarker />
        <ZoomControl position='topright'/>
      </MapContainer>
    </>
  )
}

export default Map

