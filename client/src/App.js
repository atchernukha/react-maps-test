import React from 'react';
import Map from './components/Map';
import { Grid } from '@mui/material';
import Header from './components/Header';
import MarkerList from './components/MarkerList';
import { useData } from './data/DataContext';

function App() {
  const { value, setValues } = useData()

  return (
    <>
      <Header />
      <Grid container justifyContent="flex-end"  >
        <Grid item xs={9}>
          <Map />
        </Grid>
        <Grid item xs={3} >
          <MarkerList currentList={value.currentMarker? [value.currentMarker]: value.features}/>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
