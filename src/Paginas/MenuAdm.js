import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import noteRegister from '../Images/noteRegister2.jpg'
import { Typography } from '@mui/material';



const MenuAdm = () => {
    
    return (
        <div>
            <Typography variant="h1" color="primary" align='center'> Administrador</Typography>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 600,
                height: 400,
                alignContent: 'center'
                },
            }}
            >
                <a href="/UsersAdmin" >
                <Paper elevation={10} href="/UsersAdmin" sx={{
                    
                    backgroundPosition:'center',
                    maxWidth: 600,
                    maxHeight:400,                    
                    textAlign:'center'
                }}
                >
                    <Typography variant='h3' color='primary'>Registrar Usuario</Typography>
                    
                </Paper> 
                </a>
                <a href="/CreateSubject" >
                <Paper elevation={10} sx={{
                    
                    backgroundPosition:'center',
                    maxWidth: 600,
                    maxHeight:400,                    
                    textAlign:'center'
                }}
                
                >
                    <Typography variant='h3' color='primary'>Registrar Docente a materia</Typography>
                </Paper> 
                </a>
            </Box>
        </div>
    )
}

export default MenuAdm;
