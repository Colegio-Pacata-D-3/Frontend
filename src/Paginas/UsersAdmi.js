
import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody,TableRow } from "@mui/material";
import { Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";


const baseUrl='https://localhost:44324/api/user'
function UsersAdmi(){
    const [data, setData] = useState([]);

    const peticionGet= async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            console.log(response.data);
            setData(response.data)
        })
    }
    useEffect(async()=>{
        await peticionGet();

    },[])  

    return (
        <div>
            <Typography>Lista de usuarios</Typography>
            
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
                                    <Edit/>
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete/>
                                </TableCell>
                           </TableRow>
                          
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
           hola
        </div>
    );
}
export default UsersAdmi;