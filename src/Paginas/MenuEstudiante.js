import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import noteRegister from '../Images/noteRegister2.jpg'
import { Typography } from '@mui/material';



const MenuEstudiante = () => {

    const [data, setData] = useState();

    useEffect(async()=>{
        let paths = window.location.pathname.split('/');
        let id = paths[paths.length-1];
        setData(id);                

    },[])
    
    return (
        <div>
            <Typography variant="h1" color="primary" align='center'> Estudiante</Typography>
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
                <a href={`/Student/${data}/1`} >
                <Paper elevation={10}  sx={{
                    
                    backgroundPosition:'center',
                    maxWidth: 600,
                    maxHeight:400,                    
                    textAlign:'center'
                }}
                >
                    <Typography variant='h3' color='primary'>Trimestre 1</Typography>
                    
                </Paper> 
                </a>
                <a href={`/Student/${data}/2`} >
                <Paper elevation={10} sx={{
                    
                    backgroundPosition:'center',
                    maxWidth: 600,
                    maxHeight:400,                    
                    textAlign:'center'
                }}
                
                >
                    <Typography variant='h3' color='primary'>Trimestre 2</Typography>
                </Paper> 
                </a>
                <a href={`/Student/${data}/3`} >
                <Paper elevation={10} sx={{
                    
                    backgroundPosition:'center',
                    maxWidth: 600,
                    maxHeight:400,                    
                    textAlign:'center'
                }}
                
                >
                    <Typography variant='h3' color='primary'>Trimestre 3</Typography>
                </Paper> 
                </a>
            </Box>
        </div>
    )
}

export default MenuEstudiante;