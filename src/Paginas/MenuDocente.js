import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import noteRegister from '../Images/noteRegister2.jpg'
import { Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody,TableRow, Modal, Button, TextField } from "@mui/material";


const useStyles = makeStyles((theme) => ({
    tituloTabla:{
        padding:"10px",
        textAlign:"center"
    },
    table:{
        borderStyle: "solid",
        borderWidth: "medium",
        borderColor: "blue"
    }
}));
const baseUrlSubjects=`https://localhost:44324/api/subject/`

const MenuDocente = () => {
    const styles=useStyles();
    const [data, setData]= useState([]);
    const [teacher, setTeacher] = useState();

    const [consolaSeleccionada, setConsolaSeleccionada]= useState({
        idteacher: '',
        name: '',
        grade:'',
    })
    const peticionGet= async()=>{
        var post=`${baseUrlSubjects}`;
        await axios.get(post)
        .then(response=>{
            setData(response.data);
        })
    }

    useEffect(async()=>{
        await peticionGet(); 
        let paths = window.location.pathname.split('/');
        let id = paths[paths.length-1];
        setTeacher(id);
        console.log(data);


    },[])
    const seleccionarConsola=(consola, caso)=>{
        setConsolaSeleccionada(consola);
        if (caso==='1')
        {
            var url = '/RegisterNote/'+consola.grade + "/1/"+consola.name;
            window.location.replace(url);         
        }
        if (caso==='2')
        {
            var url = '/RegisterNote/'+consola.grade + "/2/"+consola.name;
            window.location.replace(url);         
        }
        if (caso==='3')
        {
            var url = '/RegisterNote/'+consola.grade + "/3/"+consola.name;
            window.location.replace(url);         
        }
    }
    return (
        <div>
            <TableContainer className={styles.table}>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Nombre</TableCell>
                           <TableCell>Curso</TableCell>
                           <TableCell>Trimestre 1</TableCell>
                           <TableCell>Trimestre 2</TableCell>
                           <TableCell>Trimestre 3</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {data.filter(x=>x.idTeacher===parseInt(teacher)).map(user=>(
                           <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.grade} Secundaria</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success" onClick={()=>seleccionarConsola(user,'1')}>Registrar</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success" onClick={()=>seleccionarConsola(user,'2')}>Registrar</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success" onClick={()=>seleccionarConsola(user,'3')}>Registrar</Button>
                                </TableCell>
                           </TableRow>
                          
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>

        </div>
    )
}

export default MenuDocente;