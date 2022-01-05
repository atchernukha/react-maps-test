import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Grid } from '@mui/material';
import { brown } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from 'react';
import axios from 'axios';
import { useData } from '../data/DataContext';

export default function Item({ id, name, info, img }) {
    const { value, setValues } = useData();
    const deleteHandler = () => {
        const baseURL = process.env.REACT_APP_API_HOST + 'api'
        axios({
            url: baseURL + '/item/'+id,
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            const marker = { ...res.data, "marked": true };
            // setValues({
            //     "features": [value?.features.filter(marker => marker.properties.id != id ), marker],
            //     "filtered": [value.filtered.filter(marker => marker.properties.id != id ), marker],
            // });
        });
    }

    return (
        <Card sx={{ bgcolor: brown[50], mx: 2, mt: 2, borderRadius: 2 }} >
            <Grid container component="form" justifyContent="center" spacing={1}>
            <CardMedia
                component="img"
                sx={{ height: 250 }}
                image={process.env.REACT_APP_API_HOST + img}
                alt={name}
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="div">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {name}
                        <IconButton color="secondary"
                            onClick={deleteHandler}
                            size="small">
                            {/* // sx={{ position: "relative", top: 0, right: 0 }}> */}
                            <HighlightOffIcon />
                        </IconButton>
                    </Grid>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {info}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
            </Grid>
        </Card>
    )
}
