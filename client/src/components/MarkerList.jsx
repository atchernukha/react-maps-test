import { Grid, Box } from '@mui/material'
import React from 'react'
import { useData } from '../data/DataContext'
import Item from './Item'

export default function MarkerList() {
 
    const { value, setValues } = useData()
 
    return (
        <Grid container justifyContent="center" spacing={2} sx={{pt: 2}} >
            <Box sx={{ maxWidth: 400, maxHeight: "94vh", overflowY: "scroll" }}>
            {value ? value?.filtered?.map(marker =>(
                <Grid key={marker?.properties?.id} item>
                    <Item {...marker?.properties} />
                </Grid>
            )) : null
            }
            </Box>
        </Grid>
    )
}
