import { Grid } from '@mui/material'
import React from 'react'
import { useData } from '../data/DataContext'
import Item from './Item'

export default function MarkerList() {
    const { data, setValues } = useData()
    return (
        <Grid container justifyContent="center" spacing={2} component="box" >
            {data ? data?.features.map(marker => (
                <Grid key={marker.properties.id} item>
                    <Item marker={marker.properties} />
                </Grid>
            )) : null}
        </Grid>
    )
}
