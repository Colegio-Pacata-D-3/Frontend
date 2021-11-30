import UsersAdmi from "../Paginas/UsersAdmi";
import Login from "../Paginas/Login";
const Routes = [
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/UsersAdmi",
        name: "UsersAdmi",
        component: UsersAdmi
    }
];
export default Routes;