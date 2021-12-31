import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import React from 'react';

export default function Item({id, name,  info, img}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            sx={{height: 150}}
            image={process.env.REACT_APP_API_HOST+img}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {info}
            </Typography>
          </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    )
}
