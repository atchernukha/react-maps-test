import React from 'react';
import Map from './components/Map';
import { Grid } from '@mui/material';
import Header from './components/Header';
import CreateItem from './components/CreateItem';
import MarkerList from './components/MarkerList';
// import './App.css';

function App() {

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={8}>
          <Map />
        </Grid>
        <Grid item xs={4}>
           <MarkerList />
          <CreateItem />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
