import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Navbar = () =>{
    return (
            <AppBar  sx={{background:'#030943'}}  position='static' >
                <Container maxWidth="xl">
                    <Toolbar  disableGutters >
                        
                        <FacebookIcon sx={{ display: { md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="https://www.facebook.com/Unidad-Educativa-Pacata-D3-245066815968456/"
                            target="_blanck" 
                            sx={{
                            mr: 2,
                            display: {md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            Facebook
                        </Typography>
                    
                            
                        <Box justifyContent="center" sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                            mr: 2,
                            display: {md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            COLEGIO PACATA DISTRITO 3
                        </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="https://api.whatsapp.com/send?phone=59170381804"
                            target="_blanck"
                            sx={{
                            mr: 2,
                            display: {md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            70381804
                        </Typography>   
                        <WhatsAppIcon
                            
                            
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 3 }}
                        >
                            <MenuIcon />
                        </WhatsAppIcon>
                    </Toolbar>
                </Container>
            </AppBar>
       

    )
}
export default Navbar;