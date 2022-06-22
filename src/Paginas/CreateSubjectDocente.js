import React, { useState,useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import { Table, TableContainer, TableHead, TableCell, TableBody,TableRow, Modal, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';


const baseUrl=`https://localhost:44324/api/user/`
const baseUrlSubjects=`https://localhost:44324/api/subject/`

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
    iconEdit:{
        cursor: 'pointer',
        color: 'red',
        fontSize: 'large',
        alignContent: 'center'
    },
    iconDelete:{
        cursor: 'pointer',
        color: 'blue'
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
    },
    table:{
        borderStyle: "solid",
        borderWidth: "medium",
        borderColor: "blue"
    }
}));

const CreateSubjectDocente = () =>{
    const styles=useStyles();
    const [modalInsertar, setModalInsertar] = useState(false); 
    const [modalVer, setModalVer] = useState(false);
    const [data, setData] = useState([]);
    const [dataSub, setDataSub]= useState([]);


    const peticionGet= async()=>{
        await axios.get(baseUrl)
        .then(response=>{
           // console.log(response.data);
            
            setData(response.data.filter(x=>x.rol==='docente'));
            //console.log(response.data.filter(x=>x.rol==='docente'));
        })
    }
    const peticionGetSubjects= async()=>{
        await axios.get(baseUrlSubjects)
        .then(response=>{
           // console.log(response.data);
            
            setDataSub(response.data);
            console.log(dataSub);
        })
    }
    useEffect(async()=>{
        await peticionGet();
        await peticionGetSubjects();

    },[])  
     

    const [consolaSeleccionada, setConsolaSeleccionada]= useState({
        idteacher: '',
        name: '',
        grade:'',
    })
    const handleChange=e=>{
        const {name,value}=e.target;
        setConsolaSeleccionada(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(consolaSeleccionada);
    }
    const peticionPost= async()=>{
        consolaSeleccionada.idteacher=parseInt(consolaSeleccionada.idteacher)
        consolaSeleccionada.grade=parseInt(consolaSeleccionada.grade)
        console.log(consolaSeleccionada) 
        await axios.post(baseUrlSubjects,consolaSeleccionada)
        .then(response=>{
            abrirCerrarModalInsertar()
            peticionGetSubjects()
        })
        alert('curso agregado exitosamente');
    }
    const abrirCerrarModalInsertar = () =>{
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalVer = () =>{
        setModalVer(!modalVer);
    }
    const seleccionarConsola=(consola, caso)=>{
        setConsolaSeleccionada({idteacher:consola.id,name:'',grade:''});
        if(caso==='Ver')
        {
            abrirCerrarModalVer();
            console.log(consolaSeleccionada);
        }
        if (caso==='Editar')
        {
            abrirCerrarModalInsertar();
        }
    }  
    const bodyInsertar=(
        <div className={styles.modal}>
            <Typography className={styles.tituloModal}>Registro de Usuario</Typography>
            <TextField name="idteacher" variant="standard" type="number" className={styles.inputMaterial} label = "Id Docente" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.idteacher} disabled='true'/>
            <br/>
            <br/>
            <TextField name="name" variant="standard" className={styles.inputMaterial} label = "Nombre Materia" onChange={handleChange}/>
            <br/>
            <br/>
            <TextField name="grade" variant="standard" className={styles.inputMaterial} label = "Curso" onChange={handleChange}/>
            <br/>
            <br/>
            <div align="right">
                <Button onClick={()=>peticionPost()} color="primary" variant="outlined">Registrar</Button> 
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="error" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>               
            </div>
            

        </div>
    )
    const bodyVer=(
        <div className={styles.modal}>
           <TableContainer className={styles.table}>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Nombre</TableCell>
                           <TableCell>Curso</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {dataSub.filter(x=>x.idTeacher===consolaSeleccionada.idteacher).map(user=>(
                           <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.grade} Secundaria</TableCell>
                           </TableRow>
                          
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
            

        </div>
    )

    return (
        <div>
            <a className="botonSalir" href="/">
                <Button variant="contained">Salir</Button>
            </a>
            <Typography variant="h5" color="primary" className={styles.tituloTabla}>Plantel docente</Typography>
            <br></br>
            
           <TableContainer className={styles.table}>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Id</TableCell>
                           <TableCell>CI</TableCell>
                           <TableCell>Nombre</TableCell>
                           <TableCell>Apellido</TableCell>
                           <TableCell>Fecha de Nacimiento</TableCell>
                           <TableCell>Email</TableCell>
                           <TableCell>Rol</TableCell>
                           <TableCell>Materias</TableCell>  
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {data.map(user=>(
                           <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.ci}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.birth}</TableCell>
                                <TableCell>{user.email}</TableCell> 
                                <TableCell>{user.rol}</TableCell>
                                <TableCell>
                               
                                    <AddBoxIcon className={styles.iconEdit} onClick={()=>seleccionarConsola(user,'Editar')}/>
                                    &nbsp;&nbsp;&nbsp;
                                    <VisibilityIcon className={styles.iconEdit} onClick={()=>seleccionarConsola(user,'Ver')}/>
                                    
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
           open= {modalVer}
           onClose= {abrirCerrarModalVer}>
               {bodyVer}

           </Modal>
        </div>
    );
}
export default CreateSubjectDocente