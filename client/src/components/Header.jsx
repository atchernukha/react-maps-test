import React from 'react';
import { FormControl, InputLabel, AppBar, Toolbar, Typography, Box, Link } from '@mui/material';
import { blue} from '@mui/material/colors';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: blue[200] }}>
                <Toolbar component="form">
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        React Map App
                        <Link href="https://github.com/atchernukha/react-maps-test" underline="hover" variant="h6" sx={{ mx: "20px", }} >
                        {'<source: /> '}
                        <GitHubIcon/>
                    </Link>
                    </Typography>

                    <FormControl sx={{ mx: "20px", }} variant="standard">
                        <InputLabel htmlFor="new-item">Type list title...</InputLabel>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
