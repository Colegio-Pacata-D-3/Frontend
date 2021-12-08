
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import { Table, TableContainer, TableHead, TableCell, TableBody,TableRow, Modal, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const baseUrl=`https://localhost:44324/api/user/`
const baseUrlPost=`https://localhost:44324/api/authentication/register`

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width : 400, 
        backgroundColor: "white",
        border: '2px solid #000',
        //padding: theme.spacing(2,4,3),
        padding: "10px 20px 15px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    iconos:{
        cursor: 'pointer'
    },
    inputMaterial:{
        width: '100%'
    },
    tituloModal:{
        padding:"30px",
        textAlign:"center"
    },
    tituloTabla:{
        padding:"10px",
        textAlign:"center"
    },
    botonSalir:{
        alignItems:"right"
    }
}));
function UsersAdmi(){
    const styles=useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false); 
    const [modalEditar, setModalEditar] = useState(false); 
    const [modalEliminar, setModalEliminar] = useState(false); 

    const [consolaSeleccionada, setConsolaSeleccionada]= useState({
        name: '',
        email: '',
        password:''
    })
    const handleChange=e=>{
        const {name,value}=e.target;
        setConsolaSeleccionada(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(consolaSeleccionada);
    }

    const peticionGet= async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data)
        })
    }
    const peticionPost= async()=>{
        await axios.post(baseUrlPost,consolaSeleccionada)
        .then(response=>{
            peticionGet()
            abrirCerrarModalInsertar()
        })
    }
    const peticionPut=async()=>{
        await axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
        .then(response=>{
            var dataNueva=data;
            dataNueva.map(consola=>{
                if(consolaSeleccionada.id===consola.id){
                    consola.id=consolaSeleccionada.id;
                    consola.name=consolaSeleccionada.name;
                    consola.email=consolaSeleccionada.email;
                    consola.password=consolaSeleccionada.password;
                }
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        })
        

    }
    const peticionDelete=async()=>{
        await axios.delete(baseUrl+consolaSeleccionada.id)
        .then(response=>{
            setData(data.filter(consola=>consola.id!==consolaSeleccionada.id))
        })
        abrirCerrarModalEliminar();
    }
    const abrirCerrarModalInsertar = () =>{
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEditar = () =>{
        setModalEditar(!modalEditar);
    }
    const abrirCerrarModalEliminar = () =>{
        setModalEliminar(!modalEliminar);
    }
    const seleccionarConsola=(consola, caso)=>{
        setConsolaSeleccionada(consola);
        if (caso==='Editar')
        {
            abrirCerrarModalEditar();
        }
        if(caso==='Eliminar')
        {
            abrirCerrarModalEliminar();
        }
    }
    useEffect(async()=>{
        await peticionGet();

    },[])  
    const bodyInsertar=(
        <div className={styles.modal}>
            <Typography className={styles.tituloModal}>Registro de Usuario</Typography>
            <TextField name="name" variant="standard" className={styles.inputMaterial} label = "Nombre" onChange={handleChange}/>
            <br/>
            <br/>
            <TextField name="email" variant="standard" className={styles.inputMaterial} label = "Corre electronico" onChange={handleChange}/>
            <br/>
            <br/>
            <TextField name="password" variant="standard" className={styles.inputMaterial} label = "Contraseña" onChange={handleChange}/>
            <br/>
            <br/>
            <div align="right">
                <Button onClick={()=>peticionPost()} color="primary" variant="outlined">Registrar</Button> 
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="error" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>               
            </div>
            

        </div>
    )
    const bodyEditar=(
        <div className={styles.modal}>
            <Typography className={styles.tituloModal}>Registro de Usuario</Typography>
            <TextField name="name" variant="standard" className={styles.inputMaterial} label = "Nombre" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.name}/>
            <br/>
            <br/>
            <TextField name="email" variant="standard" className={styles.inputMaterial} label = "Corre electronico" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.email}/>
            <br/>
            <br/>
            <TextField name="password" variant="standard" className={styles.inputMaterial} label = "Contraseña" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.password}/>
            <br/>
            <br/>
            <div align="right">
                <Button onClick={()=>peticionPut()} color="primary" variant="outlined">Editar</Button> 
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="error" onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>               
            </div>
        </div>
    )
    const bodyEliminar=(
        <div className={styles.modal}>
            <Typography className={styles.tituloModal}>Estas seguro que desas eliminar el usuario {consolaSeleccionada && consolaSeleccionada.nombre}?</Typography>
            
            <div align="right">
                <Button onClick={()=>peticionDelete()} color="primary" variant="outlined">Confirmar</Button> 
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="error" onClick={()=>abrirCerrarModalEliminar()}>Cancelar</Button>               
            </div>
        </div>
    )

    return (
        <div>
            <a className="botonSalir" href="/">
                <Button variant="contained">Salir</Button>
            </a>
            <Typography variant="h5" color="primary" className={styles.tituloTabla}>Lista de usuarios</Typography>
            <br></br>
            <Button variant="outlined" onClick={()=>abrirCerrarModalInsertar()}>Registrar Usuario</Button>
            
           <TableContainer>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Id</TableCell>
                           <TableCell>Nombre</TableCell>
                           <TableCell>Email</TableCell>
                           <TableCell>Contraseña</TableCell>
                           <TableCell>Acciones</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {data.map(user=>(
                           <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                           <    TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell> 
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <Edit className={styles.iconos} onClick={()=>seleccionarConsola(user,'Editar')}/>
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete className={styles.iconos} onClick={()=>seleccionarConsola(user,'Eliminar')}/>
                                </TableCell>
                           </TableRow>
                          
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
           <Modal
           open= {modalInsertar}
           onClose= {abrirCerrarModalInsertar}>
               {bodyInsertar}

           </Modal>
           <Modal
           open= {modalEditar}
           onClose= {abrirCerrarModalEditar}>
               {bodyEditar}

           </Modal>
           <Modal
           open= {modalEliminar}
           onClose= {abrirCerrarModalEliminar}>
               {bodyEliminar}

           </Modal>
        </div>
    );
}
export default UsersAdmi;