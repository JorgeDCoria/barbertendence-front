import { Navigate, Outlet, Route, useLocation, useParams } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/LoginForm";
import Register from "./pages/login/RegisterForm";
import LoginLayout from "./pages/login/LoginLayout";
import ConfirmForm from "./pages/login/ConfirmForm";
import UserLayout from "./components/Layout/UserLayout";
import UserHome from "./pages/user/UserHome";
import NewOrder from "./pages/user/NewOrder";
import UserPerfil from "./pages/user/UserPerfil";
import AdminHome from "./pages/admin/AdminHome";
import ClientTable from "./pages/admin/components/ClientTable";
import AdminLayout from "./pages/admin/AdminLayout";
import Management from "./pages/admin/components/management/Management";
import EmployesTable from "./pages/admin/components/management/employes/EmployesTable";
import ServiceTable from "./pages/admin/components/management/services/ServiceTable";
import Schedule from "./pages/admin/components/management/schedules/Schedule";
import License from "./pages/admin/components/management/licenses/License";
import Report from "./pages/admin/components/management/reports/Report";
import { RoutesWithNotFound } from "./utilities";
import AuthGuard from "./guards/AuthGuards";
import { IDBARBERSHOP, PRIVATEROUTES, PrivateAdminRoutes, PrivateUserRoutes } from "./const";
import NavigateToPrivateRoute from "./guards/NavigateToPrivateRoute";
import { useAppSelector } from "./hook/useStore";

const App = () => {
    const { idBarberShop } = useAppSelector((state) => state.barberShop);
    console.log(localStorage.getItem("idBarberShop"));

    return (
        <>
            <RoutesWithNotFound>
                <Route path={`/:${IDBARBERSHOP}/*`} element={<LoginLayout />}>
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="confirmForm" element={<ConfirmForm />} />
                    <Route
                        path="*"
                        element={
                            <Navigate to={`/${localStorage.getItem("idBarberShop")}`} replace />
                        }
                    />
                </Route>

                <Route element={<AuthGuard />}>
                    <Route path={`/${PRIVATEROUTES}/*`} element={<Outlet />}>
                        <Route path={`${PrivateUserRoutes.USER}/*`} element={<UserLayout />}>
                            <Route index element={<UserHome />} />
                            <Route path={`${PrivateUserRoutes.NEWORDER}`} element={<NewOrder />} />
                            <Route path={`${PrivateUserRoutes.PROFILE}`} element={<UserPerfil />} />
                            R
                        </Route>
                        <Route path={`${PrivateAdminRoutes.ADMIN}/*`} element={<AdminLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route path="clients" element={<ClientTable />} />
                            <Route path="management/" element={<Management />}>
                                <Route index element={<EmployesTable />} />
                                <Route path="services" element={<ServiceTable />} />
                                <Route path="schedules" element={<Schedule />} />
                                <Route path="licenses" element={<License />} />
                                <Route path="reports" element={<Report />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </RoutesWithNotFound>
        </>
    );
};

export default App;
