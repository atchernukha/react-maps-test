import React from 'react';
import { FormControl, InputLabel, AppBar, Toolbar, Typography, Box, Link, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { blue, green } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useData } from '../data/DataContext';

export default function Header() {
    const { value, setValues } = useData()
    const addItem = e => { setValues( {"formOpened": true } )}

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: blue[200] }}>
                <Toolbar component="form">
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        React Map App
                        <Link href="https://github.com/atchernukha/react-maps-test" underline="hover" variant="h6" sx={{ mx: "20px", }} >
                            {'<source: /> '}
                            <GitHubIcon />
                        </Link>
                    </Typography>

                    <Box sx={{ mx: "20px", }} >
                        <IconButton onClick={addItem} size="small" sx={{ color: green[400] }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}