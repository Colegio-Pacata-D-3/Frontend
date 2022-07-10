
//import Routes from './routes/Routes';
import UsersAdmi from "./Paginas/UsersAdmi";
import Login from "./Paginas/Login";
import RegisterNote from "./Paginas/RegisterNote";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateSubjectDocente from "./Paginas/CreateSubjectDocente";
import VistaEstudiante from "./Paginas/VistaEstudiante";
import MenuAdm from "./Paginas/MenuAdm";
import Navbar from "./Header-footer/Navbar";
import Footer from "./Header-footer/Footer";
import MenuEstudiante from "./Paginas/MenuEstudiante";
import MenuDocente from "./Paginas/MenuDocente";



function App() {
  return (
    <div>
      <Navbar></Navbar>
      <br></br>
      <Router>      
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/UsersAdmin" element={<UsersAdmi/>}/>
          <Route exact path="/CreateSubject" element={<CreateSubjectDocente/>}/>
          <Route exact path="/RegisterNote/:grade/:trimester/:subject" element={<RegisterNote/>}/>
          <Route exact path="/Student/:id/:trimester" element={<VistaEstudiante/>}/> 
          <Route exact path="/MenuAdm" element={<MenuAdm/>}/> 
          <Route exact path="/MenuStudent/:id" element={<MenuEstudiante/>}/>
          <Route exact path="/MenuDocente/:id" element={<MenuDocente/>}/>
        </Routes>
      </Router>

    </div>
    
    
    
    
  );
}

export default App;
