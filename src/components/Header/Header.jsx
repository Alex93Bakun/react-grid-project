import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import { Typography } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const MyComponent = () => {
    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <PeopleIcon
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, fontSize: '2.5rem' }}
                        />
                        <Typography variant="h6" component="div">
                            Users list app
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

export default MyComponent;
