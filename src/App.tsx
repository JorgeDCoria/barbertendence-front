import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/LoginForm";
import Register from "./pages/login/RegisterForm";
import LoginLayout from "./pages/login/LoginLayout";
import ConfirmForm from "./pages/login/ConfirmForm";
import UserLayout from "./components/Layout/UserLayout";
import UserHome from "./pages/user/UserHome";
import NewOrder from "./pages/user/NewOrder";
import UserPerfil from "./pages/user/UserPerfil";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginLayout />}>
                    <Route index element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/confirmForm" element={<ConfirmForm />} />
                </Route>
                <Route path="/user/" element={<UserLayout />}>
                    <Route index element={<UserHome />} />
                    <Route path="newOrder" element={<NewOrder />} />
                    <Route path="perfil" element={<UserPerfil />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
