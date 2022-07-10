import React, { useState,useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@mui/styles";
import { Table, TableContainer, TableHead, TableCell, TableBody,TableRow, Modal, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import ExportExcel from 'react-export-excel';
import { Delete, Edit } from "@mui/icons-material";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;
const ExcelColumnGroup = ExportExcel.ExcelColumGroup;

const baseUrl=`https://localhost:44324/api/note/`;
const baseUrlUser = `https://localhost:44324/api/user/`

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
const VistaEstudiante = () =>{
    
    const styles=useStyles();
    const [data, setData] = useState([]);
    const [student, setStudent] = useState({});
    const [trimester, setTrimester] = useState();
    const [file, setFile] = useState('');

    const peticionGet= async()=>{
        let paths = window.location.pathname.split('/');
        let id = paths[paths.length-2];       
        let trimester = paths[paths.length-1];
        setTrimester(trimester);
        await axios.get(`${baseUrl}${id}/${trimester}`)
        .then(response=>{
            setData(response.data);
        })
    }
    const getStudent=async()=>{
        let paths = window.location.pathname.split('/');
        let id = paths[paths.length-2];
        await axios.get(`${baseUrlUser}${id}`)
        .then(response=>{
            setStudent(response.data);
        })

    }
    useEffect(async()=>{
        await peticionGet();
        await getStudent();
        setFile(student.name +"-"+ student.lastName + "Boletin");
    },[])  
    return (
        <div>
            <a className="botonSalir" href="/">
                <Button variant="contained">Salir</Button>
            </a>
            <Typography variant="h3" color="primary" className={styles.tituloTabla}>Boletin de calificaciones</Typography>
            <Typography variant="h4" color="primary" className={styles.tituloTabla}>Estudiante: {student.name} {student.lastName}</Typography>
            <Typography variant="h4" color="primary" className={styles.tituloTabla}>Curso: {student.course} Secundaria</Typography>
            <Typography variant="h5" color="primary" className={styles.tituloTabla}>Trimestre: {trimester} </Typography>

            <ExcelFile element={<Button variant="contained" color="success" >Exportar Boletin</Button>} filename={`${student.name}-${student.lastName}-${student.course} Secundaria - Boletin`} >
                        <ExcelSheet data={data} name="notas" >
                                <ExcelColumn name="inicio" label={`${student.name} ${student.lastName}`}/>
                                <ExcelColumn label={`${student.course} Secundaria`}/>
                                <ExcelColumn label="Materia" value="area" />
                                <ExcelColumn label="Ser" value="ser"/>
                                <ExcelColumn label="Saber 1" value="saber1"/>
                                <ExcelColumn label="Saber 2" value="saber2"/>
                                <ExcelColumn label="Saber 3" value="saber3"/>
                                <ExcelColumn label="Saber 4" value="saber4"/>
                                <ExcelColumn label="Hacer 1" value="hacer1"/>
                                <ExcelColumn label="Hacer 2" value="hacer2"/>
                                <ExcelColumn label="Hacer 3" value="hacer3"/>
                                <ExcelColumn label="Hacer 4" value="hacer4"/>
                                <ExcelColumn label="Decidir" value="decidir"/>
                                <ExcelColumn label="Ser estudiante" value="serE"/>
                                <ExcelColumn label="Decidir estudiante" value="decidirE"/>    
                                <ExcelColumn label="Promedio final" value ={(data)=>`${data.ser + ((data.saber1 + data.saber2 +data.saber3 +data.saber4)/4) + ((data.hacer1 + data.hacer2 +data.hacer3 +data.hacer4)/4) + data.decidir + data.serE + data.decidirE}`}/>                   
                        </ExcelSheet>
            </ExcelFile>
            
           <TableContainer className={styles.table}>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Materia</TableCell>
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
                           <TableCell>Promedio Total</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {data.map(user=>(
                           <TableRow key={user.id}>
                                <TableCell>{user.area}</TableCell>
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
                                <TableCell>{user.ser + ((user.saber1 + user.saber2 +user.saber3 +user.saber4)/4) + ((user.hacer1 + user.hacer2 +user.hacer3 +user.hacer4)/4) + user.decidir + user.serE + user.decidirE}</TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
        </div>
    );
}
export default VistaEstudiante