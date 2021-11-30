
//import Routes from './routes/Routes';
import UsersAdmi from "./Paginas/UsersAdmi";
import Login from "./Paginas/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/UsersAdmin" element={<UsersAdmi/>}/>
      </Routes>

    </Router>
    
    
    
  );
}

export default App;
