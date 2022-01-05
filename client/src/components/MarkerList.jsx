import { Grid, Box } from '@mui/material'
import React from 'react'
import { useData } from '../data/DataContext'
import CreateItem from './CreateItem'
import Item from './Item'

export default function MarkerList() {
 
    const { value, setValues } = useData()
 
    return (
        <Grid container justifyContent="center" spacing={2} sx={{pt: 2}} >
            <Box sx={{ maxWidth: 410, height: "93vh", overflowY: "scroll" }}>
            {value.formOpened ?
                <CreateItem /> :
                value ? value?.filtered?.map(marker =>(
                <Grid key={marker?.properties?.id} item>
                    <Item {...marker?.properties} />
                </Grid>
            )) : null
              }
            </Box>
        </Grid>
    )
}
