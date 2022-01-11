import React from 'react';
import { MapContainer, Marker, Circle, useMapEvents, ZoomControl } from 'react-leaflet';
import { indigo } from '@mui/material/colors';
import { useData } from '../data/DataContext';
import Layers from './Layers'
import L from 'leaflet';
import red_flag from '../icons/red-flag.png';

var redFlagIcon = L.icon({
  iconUrl: red_flag,
  shadowUrl: null,
  iconSize: [32, 36], // size of the icon
  iconAnchor: [6, 36], // point of the icon which will correspond to marker's location
});


const Map = () => {

  const { value, setValues } = useData();
  const NewMarker = () => {

    const map = useMapEvents({
      click(e) {
        setValues({
          "currentMarker": [e.latlng.lat, e.latlng.lng]
        });
      },
    })

    return (
      value.formOpened && value?.currentMarker ?
        <Marker
          key={value.currentMarker[0]}
          position={value.currentMarker}
          icon={redFlagIcon}
        // interactive={false} 
        >
          {/* <Circle
            center={{ lat: value.currentMarker[0], lng: value.currentMarker[1] }}
            color={indigo[300]}
            fillColor='#f03'
            fillOpacity={0.3}
            radius={400} /> */}
        </Marker>
        : null
    )

  }
  return (
    <>
      <MapContainer
        center={[49.0902, 27.7129]}
        zoom={9}
        zoomControl={false}
        style={{ height: '91vh', width: '100%' }}
      >
        <Layers />
        {value.formOpened && <NewMarker />}
        <ZoomControl position='topright' />
      </MapContainer>
    </>
  )
}

export default Map

