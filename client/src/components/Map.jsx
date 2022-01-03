import React from 'react';
import { MapContainer, Marker, Circle, useMapEvents, ZoomControl } from 'react-leaflet';
import { indigo } from '@mui/material/colors';
import { useData } from '../data/DataContext';
import Layers from './Layers'
import L from 'leaflet';
import pirate from '../icons/pirate-flag.png';
import leaf_green from '../icons/leaf-green.png';
import red_flag from '../icons/red-flag.png';

const iconPipate = new L.Icon({
  iconUrl: pirate,
  iconRetinaUrl: pirate,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(32, 24),
  className: 'leaflet-div-icon'
});
var greenIcon = L.icon({
  iconUrl: leaf_green,
  shadowUrl: '../icons/leaf-shadow.png',

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var redFlagIcon = L.icon({
  iconUrl: red_flag,
  shadowUrl: null,

  iconSize: [32, 36], // size of the icon
  // shadowSize: [32, 32], // size of the shadow
  iconAnchor: [6, 36], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
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
        style={{ height: '92vh', width: '100%' }}
      >
        <Layers />
        {value.formOpened && <NewMarker />}
        <ZoomControl position='topright' />
      </MapContainer>
    </>
  )
}

export default Map

