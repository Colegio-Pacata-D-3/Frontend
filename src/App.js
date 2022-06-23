
//import Routes from './routes/Routes';
import UsersAdmi from "./Paginas/UsersAdmi";
import Login from "./Paginas/Login";
import RegisterNote from "./Paginas/RegisterNote";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateSubjectDocente from "./Paginas/CreateSubjectDocente";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/UsersAdmin" element={<UsersAdmi/>}/>
        <Route exact path="/CreateSubject" element={<CreateSubjectDocente/>}/>
        <Route exact path="/RegisterNote/:grade/:trimester/:subject" element={<RegisterNote/>}/>
      </Routes>

    </Router>
    
    
    
  );
}

export default App;
