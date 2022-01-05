import React from 'react';
import Map from './components/Map';
import { Grid } from '@mui/material';
import Header from './components/Header';
import MarkerList from './components/MarkerList';

function App() {

  return (
    <>
      <Header />
      <Grid container justifyContent="flex-end"  >
        <Grid item xs={9}>
          <Map />
        </Grid>
        <Grid item xs={3} >
          <MarkerList />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
