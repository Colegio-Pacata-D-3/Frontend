
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import { Table, TableContainer, TableHead, TableCell, TableBody,TableRow, Modal, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const baseUrl=`https://localhost:44324/api/note/`
const baseUrlstudents=`https://localhost:44324/api/user/`

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
        color: 'red'
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
const RegisterNote = () =>{
    
    const styles=useStyles();
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [grade, setGrade] = useState(0);
    const [subject, setSubject] = useState('');
    const [trimester, setTrimester] = useState(0)

    const [consolaSeleccionada, setConsolaSeleccionada]= useState({
        idEst: 0,
        area: 0,
        grade: 0,
        trimester: 2,
        ser: 0,
        saber1: 1,
        saber2: 0,
        saber3: 0,
        saber4: 0,
        hacer1: 0,
        hacer2: 0,
        hacer3: 0,
        hacer4: 0,
        decidir: 0,
        serE: 0,
        decidirE: 0
       
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
        let paths = window.location.pathname.split('/');
        let grade = paths[paths.length-3];
        let trimester = paths[paths.length-2];
        let subject = paths[paths.length-1];
        setGrade(paths[paths.length-3]);
        setTrimester(paths[paths.length-2]);
        setSubject(paths[paths.length-1]);
        var post=`${baseUrl}${grade}/${trimester}/${subject}`;
        await axios.get(post)
        .then(response=>{
            setData(response.data);
            console.log(response.data);
        })
    }
    const peticionPut=async()=>{
        var dataPut={
            id: parseInt(consolaSeleccionada.id),
            idEst: parseInt(consolaSeleccionada.idEst),
            area: consolaSeleccionada.area,
            grade: parseInt(consolaSeleccionada.grade),
            trimester: parseInt(consolaSeleccionada.trimester),
            ser: parseInt(consolaSeleccionada.ser),
            saber1: parseInt(consolaSeleccionada.saber1),
            saber2: parseInt(consolaSeleccionada.saber2),
            saber3: parseInt(consolaSeleccionada.saber3),
            saber4: parseInt(consolaSeleccionada.saber4),
            hacer1: parseInt(consolaSeleccionada.hacer1),
            hacer2: parseInt(consolaSeleccionada.hacer2),
            hacer3: parseInt(consolaSeleccionada.hacer3),
            hacer4: parseInt(consolaSeleccionada.hacer4),
            decidir: parseInt(consolaSeleccionada.decidir),
            serE: parseInt(consolaSeleccionada.serE),
            decidirE: parseInt(consolaSeleccionada.decidirE)
       
        }
        console.log(dataPut);
        await axios.put(baseUrl+consolaSeleccionada.id, dataPut)
        .then(response=>{
            var dataNueva=data;
            dataNueva.map(consola=>{
                if(consolaSeleccionada.id===consola.id){
                    consola.id=consolaSeleccionada.id;
                    consola.idEst = consolaSeleccionada.idEst;
                    consola.name=consolaSeleccionada.lastName;
                    consola.lastName=consolaSeleccionada.lastName;
                    consola.id=consolaSeleccionada.id;
                    consola.area=consolaSeleccionada.area;
                    consola.grade=consolaSeleccionada.grade;
                    consola.id=consolaSeleccionada.id;
                    consola.trimester=consolaSeleccionada.trimester;
                    consola.ser=consolaSeleccionada.ser;
                    consola.saber1=consolaSeleccionada.saber1;
                    consola.saber2=consolaSeleccionada.saber2;
                    consola.saber3=consolaSeleccionada.saber3;
                    consola.saber4=consolaSeleccionada.saber4;
                    consola.hacer1=consolaSeleccionada.hacer1;
                    consola.hacer2=consolaSeleccionada.hacer2;
                    consola.hacer3=consolaSeleccionada.hacer3;
                    consola.hacer4=consolaSeleccionada.hacer4;
                    consola.decidir=consolaSeleccionada.decidir;
                    consola.serE=consolaSeleccionada.serE;
                    consola.decidirE=consolaSeleccionada.decidirE;
                    
                }
            })
            setData(dataNueva);
            abrirCerrarModalEditar();
        })
        

    }
    
    const abrirCerrarModalEditar = () =>{
        setModalEditar(!modalEditar);
    }
    const seleccionarConsola=(consola, caso)=>{
        setConsolaSeleccionada(consola);
        abrirCerrarModalEditar();
    }
    useEffect(async()=>{
        await peticionGet(); 
        console.log(data);


    },[])  
    const bodyEditar=(
        <div className={styles.modal}>
            <Typography className={styles.tituloModal}>Registro de Usuario</Typography>
            <TextField name="idEst" variant="standard" className={styles.inputMaterial} label = "Id Estudiante" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.idEst} disabled='true'/>
            <TextField name="name" variant="standard" className={styles.inputMaterial} label = "Nombre" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.name}/>
         
            <TextField name="lastName" variant="standard" className={styles.inputMaterial} label = "Apellido" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.lastName}/>
            
            <TextField name="ser" variant="standard" className={styles.inputMaterial} label = "Ser" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.ser}/>
           
            <TextField name="saber1" variant="standard" className={styles.inputMaterial} label = "Saber 1" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.saber1}/>
            
            <TextField name="saber2" variant="standard" className={styles.inputMaterial} label = "Saber 2" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.saber2}/>
            
            <TextField name="saber3" variant="standard" className={styles.inputMaterial} label = "Saber 3" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.saber3}/>
            
            <TextField name="saber4" variant="standard" className={styles.inputMaterial} label = "Saber 4" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.saber4}/>
            
            <TextField name="hacer1" variant="standard" className={styles.inputMaterial} label = "Hacer 1" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.hacer1}/>
            
            <TextField name="hacer2" variant="standard" className={styles.inputMaterial} label = "Hacer 2" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.hacer2}/>
            
            <TextField name="hacer3" variant="standard" className={styles.inputMaterial} label = "Hacer 3" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.hacer3}/>
            
            <TextField name="hacer4" variant="standard" className={styles.inputMaterial} label = "Hacer 4" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.hacer4}/>
            
            <TextField name="decidir" variant="standard" className={styles.inputMaterial} label = "Decidir" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.decidir}/>
            
            <TextField name="serE" variant="standard" className={styles.inputMaterial} label = "Ser Estudiante" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.serE}/>
            
            <TextField name="decidirE" variant="standard" className={styles.inputMaterial} label = "Decidir Estudiante" onChange={handleChange} value={consolaSeleccionada&&consolaSeleccionada.decidirE}/>
        
            
            <div align="right">
                <Button onClick={()=>peticionPut()} color="primary" variant="outlined">Editar</Button> 
                &nbsp;&nbsp;&nbsp;
                <Button variant="outlined" color="error" onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>               
            </div>
        </div>
    )

    return (
        <div>
            <a className="botonSalir" href="/">
                <Button variant="contained">Salir</Button>
            </a>
            <Typography variant="h3" color="primary" className={styles.tituloTabla}>Lista de estudiantes</Typography>
            <Typography variant="h4" color="primary" className={styles.tituloTabla}>Materia: {subject}</Typography>
            <Typography variant="h4" color="primary" className={styles.tituloTabla}>Curso: {grade} Secundaria</Typography>
            <Typography variant="h5" color="primary" className={styles.tituloTabla}>Trimestre: {trimester} </Typography>

            <br></br>
            
           <TableContainer className={styles.table}>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Nombre</TableCell>
                           <TableCell>Apellido</TableCell>
                           <TableCell>Ser</TableCell>
                           <TableCell>Saber 1</TableCell>
                           <TableCell>Saber 2</TableCell>
                           <TableCell>Saber 3</TableCell>
                           <TableCell>Saber 4</TableCell>
                           <TableCell>Hacer 1</TableCell>
                           <TableCell>Hacer 2</TableCell>
                           <TableCell>Hacer 3</TableCell>
                           <TableCell>Hacer 4</TableCell>
                           <TableCell>Decidir</TableCell>
                           <TableCell>Ser estudiante</TableCell>
                           <TableCell>Decidir estudiante</TableCell>
                           <TableCell>Editar</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {data.map(user=>(
                           <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.lastName}</TableCell> 
                                <TableCell>{user.ser}</TableCell>
                                <TableCell>{user.saber1}</TableCell>
                                <TableCell>{user.saber2}</TableCell>
                                <TableCell>{user.saber3}</TableCell>
                                <TableCell>{user.saber4}</TableCell>
                                <TableCell>{user.hacer1}</TableCell>
                                <TableCell>{user.hacer2}</TableCell>
                                <TableCell>{user.hacer3}</TableCell>
                                <TableCell>{user.hacer4}</TableCell>
                                <TableCell>{user.decidir}</TableCell>
                                <TableCell>{user.serE}</TableCell>
                                <TableCell>{user.decidirE}</TableCell>


                                <TableCell>
                                    <Edit className={styles.iconEdit} onClick={()=>seleccionarConsola(user,'Editar')}/>
                                    
                                </TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
           
           <Modal
           open= {modalEditar}
           onClose= {abrirCerrarModalEditar}>
               {bodyEditar}

           </Modal>
        </div>
    );
}
export default RegisterNote