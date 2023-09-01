import React from "react";
import NavBar from "../../../../components/Layout/NavBar";
import { TabNav } from "../../../../types/tabNav";

const items: TabNav[] = [
    { title: "Empleados", url: "#", icon: "" },
    { title: "Servicios", url: "#", icon: "" },
    { title: "Horarios", url: "#", icon: "" },
    { title: "licencias", url: "#", icon: "" },
    { title: "Reportes", url: "#", icon: "" },
];
const Management = () => {
    return (
        <div>
            <NavBar items={items}></NavBar>
            Management
        </div>
    );
};

export default Management;
