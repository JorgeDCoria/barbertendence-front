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
import AdminHome from "./pages/admin/AdminHome";
import ClientTable from "./pages/admin/components/ClientTable";
import AdminLayout from "./pages/admin/AdminLayout";
import Management from "./pages/admin/components/management/Management";
import EmployesTable from "./pages/admin/components/management/employes/EmployesTable";
import ServiceTable from "./pages/admin/components/management/services/ServiceTable";
import Schedule from "./pages/admin/components/management/schedules/Schedule";
import License from "./pages/admin/components/management/licenses/License";
import Report from "./pages/admin/components/management/reports/Report";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound.utility";

const App = () => {
    return (
        <>
            <RoutesWithNotFound>
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
                <Route path="/admin/" element={<AdminLayout />}>
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
                <Route path="*" element={<>Not Fund</>} />
            </RoutesWithNotFound>
        </>
    );
};

export default App;
