import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Stack,
    Toolbar,
    useTheme,
    Hidden,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TabNav } from "src/types/tabNav";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logoTitle.png";
import DrawerNav from "../drawer/DrawerNav";
interface Props {
    items: TabNav[];
}

const NavBar: React.FC<Props> = ({ items }) => {
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const handleOpenDrawer = () => {
        setOpenDrawer(!openDrawer);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{ background: theme.palette.customDark?.main }}
            >
                <Toolbar>
                    <Hidden smUp>
                        <IconButton onClick={() => handleOpenDrawer()}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Container maxWidth="xl">
                        <Grid
                            container
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Grid item>
                                {" "}
                                <Box
                                    component={"div"}
                                    display={"flex"}
                                    height={"40px"}
                                >
                                    <Box
                                        component={"img"}
                                        height={"100%"}
                                        src={logo}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Hidden smDown>
                                    <Stack direction={"row"} spacing={4}>
                                        {items.map((e) => (
                                            <Link key={e.title} to={e.url}>
                                                <Button
                                                    sx={{ color: "white" }}
                                                    variant="text"
                                                >
                                                    {e.title}
                                                </Button>
                                            </Link>
                                        ))}
                                    </Stack>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
            <DrawerNav
                items={items}
                openDrawer={openDrawer}
                handleClose={handleOpenDrawer}
            />
        </Box>
    );
};

export default NavBar;
