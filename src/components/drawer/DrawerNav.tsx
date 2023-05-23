import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React from "react";

import { TabNav } from "src/types/tabNav";
import s from "./DrawerNav.module.css";
import { Link } from "react-router-dom";
interface Props {
    items: TabNav[];
    openDrawer: boolean;
    handleClose: Function;
}
const DrawerNav: React.FC<Props> = ({ items, openDrawer, handleClose }) => {
    return (
        <Drawer
            anchor={"top"}
            open={openDrawer}
            onClick={(e) => handleClose(e)}
        >
            <List component={"ul"}>
                {items &&
                    items.map((item, index) => (
                        <Link to={item.url} key={index}>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemIcon>{item.icon}</ListItemIcon>{" "}
                                    <ListItemText
                                        primary={item.title}
                                        className={s.link}
                                    />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
            </List>
        </Drawer>
    );
};

export default DrawerNav;
