import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import axios from 'axios';
import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import {
    TableColumnResizing,
    TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import {
    FilteringState,
    IntegratedSorting,
    SortingState,
    IntegratedFiltering,
} from '@devexpress/dx-react-grid';

const columns = [
    { name: 'id', title: 'ID' },
    { name: 'name', title: 'Name' },
    { name: 'username', title: 'Username' },
    { name: 'email', title: 'Email' },
    { name: 'phone', title: 'Phone' },
    { name: 'website', title: 'Website' },
];

const Main = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = useState('');

    const [defaultColumnWidths] = useState([
        { columnName: 'id', width: 100 },
        { columnName: 'name', width: 220 },
        { columnName: 'username', width: 180 },
        { columnName: 'email', width: 250 },
        { columnName: 'phone', width: 200 },
        { columnName: 'website', width: 120 },
    ]);

    const [defaultSortingState] = useState([
        { columnName: 'id', direction: 'asc' },
        { columnName: 'name', direction: 'asc' },
        { columnName: 'username', direction: 'asc' },
        { columnName: 'email', direction: 'asc' },
        { columnName: 'phone', direction: 'asc' },
        { columnName: 'website', direction: 'asc' },
    ]);

    useEffect(() => {
        if (rows.length > 0) {
            successfulUpload();
        } else {
            unsuccessfulUpload();
        }
    }, [rows]);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const handleButtonClick = () => {
        setLoading(true);
        try {
            axios
                .get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    let users = response.data.map((row) => ({
                        id: row.id,
                        name: row.name,
                        username: row.username,
                        email: row.email,
                        phone: row.phone,
                        website: row.website,
                    }));
                    setRows(users);
                });
        } catch (e) {
            setError(e.message);
        }
    };

    const successfulUpload = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
        setLoading(false);
    };

    const unsuccessfulUpload = () => {
        setSuccess(false);
        setLoading(false);
    };

    return (
        <main>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <Box sx={{ my: 1, position: 'relative' }}>
                    <Button
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                        onClick={() => handleButtonClick()}
                    >
                        {success
                            ? 'Users uploaded successfully!'
                            : 'Upload users'}
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </Box>
            <Paper>
                {rows && (
                    <Grid rows={rows} columns={columns}>
                        <FilteringState />
                        <SortingState defaultSorting={defaultSortingState} />

                        <IntegratedFiltering />
                        <IntegratedSorting />

                        <Table />
                        <TableColumnResizing
                            defaultColumnWidths={defaultColumnWidths}
                        />
                        <TableHeaderRow  showSortingControls/>
                        <TableFilterRow />
                    </Grid>
                )}
            </Paper>
        </main>
    );
};

export default Main;
