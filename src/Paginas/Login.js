import React from 'react'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/material'

const useStyles = makeStyles(theme => ({
    root:{
        background: 'black'
    }
}))

const Login = () => {
    const classes = useStyles()
    
    return (
        <Grid container componet='main' className = {classes.root}>

        </Grid>
    )
}

export default Login
