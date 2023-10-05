import React from 'react';
import {Typography } from '@mui/material'
import Button from '@mui/material/Button';
import classes from './NewAccount.module.css'

const NewAccount = () => {
    return (
        <div className={classes.box} >
            <Typography variant='body1'>
                <p className={`${classes.noAccount_intro} ${classes.elemento}`}>Sin cuenta?</p>
            </Typography>
            <hr className={`${classes.elemento}`}/>
            <Button
                        sx={{
                            borderRadius: '0.625rem', background: '#9EC5FE', 
                            color: '#2F2F2F',
                            m:1.5,
                            width: '49ch',
                        }}
                        variant="contained"
                        type='submit' >
                        Crear Cuenta Nueva
                    </Button>
        </div>
    );
}

export default NewAccount;
