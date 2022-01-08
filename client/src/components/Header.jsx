import React from 'react';
import { Button, AppBar, Toolbar, Typography, Box, Link } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { brown } from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useData } from '../data/DataContext';

export default function Header() {
    const { value, setValues } = useData()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: brown[200] }}>
                <Toolbar component="form">
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        React Maps App
                        <Link href="https://github.com/atchernukha/react-maps-test"
                            underline="hover"
                            variant="h6"
                            sx={{ ml: 5, color: '#fff' }} >
                            {'<source: /> '}
                            <GitHubIcon sx={{ ml: 2 }} />
                        </Link>
                    </Typography>
                    <Box sx={{ mx: "20px", }} >
                        <Button variant="text" 
                        onClick={e => { setValues({ "formOpened": true }) }} 
                        sx={{ color: '#fff' }}>
                            add for rent
                            <AddCircleOutlineIcon sx={{ ml: 2 }} />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
