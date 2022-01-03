import React, { useEffect } from 'react';
import Map from './components/Map';
import { Card, Grid, Box, Paper } from '@mui/material';
import { brown, lightBlue } from '@mui/material/colors';
import Header from './components/Header';
import CreateItem from './components/CreateItem';
import MarkerList from './components/MarkerList';
import { useData } from './data/DataContext';
// import './App.css';

function App() {
  const { value, setValues } = useData();

  return (
    <Paper sx={{ bgcolor: brown[50], height: '100vh' }} >
      <Header />
      <Grid container justifyContent="center"  >
        <Grid item xs={5}>
          <Map />
        </Grid>
        <Grid item xs={4} >
          <Box sx={{ maxWidth: 450, maxHeight: "94vh", bgcolor: lightBlue[100] }}>
            <Grid container justifyContent="center">
              {value.formOpened ?
                <CreateItem /> :
                <MarkerList />
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;
