import React,{useState} from 'react'
import { Grid, Container, Paper,Avatar, TextField, Typography,Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { WindowSharp } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
    root:{
        background: 'white'
    },
    container:{
        height:'60%'
        

    },
    div:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px'

    },
    avatar:{
        margin:'30px'
    },
    form:{
        width:'100%'
    }
}))

const Login = () => {
    const [body,setBody] = useState({email: '', password: ''})
    const [name,setName] = useState({name: '', email:''})
    const [login,setLogin]=useState('')
    const classes = useStyles()

    const handleChange = e =>{
        setBody({
            ...body,
            [e.target.name]: e.target.value
            
        })
        setLogin('')

    }
    
    const onSubmit=async ()=>{
        const response = await fetch(
            `https://localhost:44324/api/authentication/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
        const data = await response.json()
        setLogin(data.message)
        setName({name:data.name,email:data.email})
        if (login==="success")
        {
            window.location.replace('/UsersAdmin');
        }
    }

    const saludo = login==="Credenciales invalidos"?
    <Typography color="red">{login}</Typography>:<></>
    
    return (
        <Grid container componet='main' className = {classes.root}>
            <Container component={Paper} elevation={5} maxWidth='xs' className = {classes.container}> 
                <div className={classes.div}>
                    <Avatar className={classes.avatar}>
                        <LockOpenIcon/>

                    </Avatar>
                    <Typography component='h1' variant='subtitle' >Ingresar</Typography>
                    <form className={classes.form}>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label= 'Correo'
                            name="email"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label= 'Contraseña'
                            name="password"
                            onChange={handleChange}
                        />
                        {saludo}
                        <Button
                        fullWidth
                        variant='contained'
                        color= 'primary'
                        onClick={()=>onSubmit()}
                        LinkComponent={Login.js}>
                            Ingresar
                        </Button>
                    </form>

                </div>

            </Container>
            
        </Grid>
    )
}

export default Login;
