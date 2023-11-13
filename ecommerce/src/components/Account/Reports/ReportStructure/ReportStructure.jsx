import React from 'react';
import { useStyles } from './style';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const ReportStructure = (props) => {
    const classes = useStyles()
    // Verifica si props.joker_field está presente
    const joker_field = props.joker_field ? props.joker_field : null;
    return (
        <div className={classes.content} >
            <Paper elevation={3} style={{ padding: '1rem' }}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={props.usersData}
                        columns={props.columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
                {joker_field && <Typography variant="h6" gutterBottom>
                    {joker_field}
                </Typography>}
            </Paper>
        </div>
    );
}

export default ReportStructure;
