import { Navigate, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/LoginForm";
import Register from "./pages/login/RegisterForm";
import LoginLayout from "./pages/login/LoginLayout";
import ConfirmForm from "./pages/login/ConfirmForm";
import UserLayout from "./components/Layout/UserLayout";
import UserHome from "./pages/user/UserHome";
import NewOrder from "./pages/user/NewOrder";
import UserPerfil from "./pages/user/UserPerfil";
import { RoutesWithNotFound } from "./utilities";
import AuthGuard from "./guards/AuthGuards";
import { IDBARBERSHOP, PRIVATEROUTES, PrivateUserRoutes } from "./const";

const App = () => {
    return (
        <>
            <RoutesWithNotFound>
                <Route path={`/:${IDBARBERSHOP}/`} element={<LoginLayout />}>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="confirmForm" element={<ConfirmForm />} />
                    <Route
                        path="reset-password"
                        element={
                            <h1 style={{ textAlign: "center" }}>
                                Estamo trabajando en esta interfaz
                            </h1>
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate to={`/${localStorage.getItem("idBarberShop")}`} />}
                    />
                </Route>

                <Route path={`/${PRIVATEROUTES}/*`} element={<AuthGuard />} />
                <Route path={`/${PrivateUserRoutes.USER}/*`} element={<UserLayout />}>
                    <Route index element={<UserHome />} />
                    <Route path={`${PrivateUserRoutes.NEWORDER}`} element={<NewOrder />} />
                    <Route path={`${PrivateUserRoutes.PROFILE}`} element={<UserPerfil />} />
                </Route>
            </RoutesWithNotFound>
        </>
    );
};

export default App;
