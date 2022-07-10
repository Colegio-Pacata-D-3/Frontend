import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import AdbIcon from '@mui/icons-material/Adb';
import Divider from '@mui/material/Divider';

const Footer = () =>{
    return (
        <AppBar  sx={{background:'#030943'}}  position='static' >
        <Container maxWidth="xl">
            <Toolbar  disableGutters >          
                    
                <Box justifyContent="center" sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                <Paper
                    sx={{
                        p: 4,
                        margin: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                        background:'#030943',
                        color:'white'
                    }}
                >


                    <Grid  container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid justifyContent="center" item xs>
                                    <AdbIcon />
                                    <Typography
                                        variant="h6"
                                        component="a"
                                        sx={{
                                        mr: 2,
                                        fontFamily: 'monospace',                                     
                                        fontWeight: 700,
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        }}
                                    >
                                        ita
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem sx={{background:'white'}} />
                            <Grid item xs container  sx={{ my: 1,mx:1, color: 'white'}}>
                                <Box >
                                    <Typography variant="subtitle1" component="div" sx={{fontSize:15}}>
                                    (55) 48457290
                                    </Typography>
                                </Box>
                                
                                
                                <Typography variant="subtitle1" component="div" sx={{fontSize:12}}>
                                contacto.consult.ita@gmail.com
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box justifyContent="center">
                     <Typography justifyContent="center">Contacto: 70381804 - 67532905 -73794821</Typography>

                    </Box>
                    
                    
                </Paper>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
       
        

    )
}
export default Footer;