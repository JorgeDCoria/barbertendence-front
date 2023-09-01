import React from "react";
import NavBar from "../../../../components/Layout/NavBar";
import { TabNav } from "../../../../types/tabNav";
import { Outlet } from "react-router-dom";

const items: TabNav[] = [
    { title: "Empleados", url: "/admin/management", icon: "" },
    { title: "Servicios", url: "/admin/management/services", icon: "" },
    { title: "Horarios", url: "/admin/management/schedules", icon: "" },
    { title: "licencias", url: "/admin/management/licenses", icon: "" },
    { title: "Reportes", url: "/admin/management/reports", icon: "" },
];
const Management = () => {
    return (
        <div>
            <NavBar items={items}></NavBar>
            <Outlet />
        </div>
    );
};

export default Management;
