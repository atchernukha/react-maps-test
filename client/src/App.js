import React from 'react';
import Map from './components/Map';
import { Grid, Box } from '@mui/material';
import { brown } from '@mui/material/colors';
import Header from './components/Header';
import CreateItem from './components/CreateItem';
import MarkerList from './components/MarkerList';
import { useData } from './data/DataContext';
// import './App.css';

function App() {
  const { value, setValues } = useData();

  return (
    <>
      <Header />
      <Grid container justifyContent="flex-end"  >
        <Grid item xs={9}>
          <Map />
        </Grid>
        <Grid item xs={3} >
          <Box sx={{ maxWidth: 430, bgcolor: brown[100] }}>
            <Grid container justifyContent="center">
              {value.formOpened ?
                <CreateItem /> :
                <MarkerList />
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
