import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/LoginForm";
import Register from "./pages/login/RegisterForm";
import LoginLayout from "./pages/login/LoginLayout";
import ConfirmForm from "./pages/login/ConfirmForm";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginLayout />}>
                    <Route index element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/confirmForm" element={<ConfirmForm />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
