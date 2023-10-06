import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";

import { PRIVATEROUTES } from "../../const";
import { usePersistData } from "../../hook/usePersistData";

const LoginLayout: React.FC<{}> = () => {
    const { idBarberShop } = useParams();
    const navigate = useNavigate();
    const { setPersistData, getUser, getIdBarberShop } = usePersistData();

    useEffect(() => {
        if (
            !localStorage.getItem("idBarberShop") ||
            localStorage.getItem("idBarberShop") !== idBarberShop
        ) {
            setPersistData("idBarberShop", idBarberShop);
            console.log(getIdBarberShop());
        }
        // if (getUser()) {
        //     navigate(`/${PRIVATEROUTES}`, { replace: true });
        // }
    }, []);

    return (
        <Grid
            container
            sx={{
                backgroundImage: "linear-gradient(to bottom, #1F6BB5 7.57%, #7F217D 70%)",
                height: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
            }}
        >
            {/* contenedor del formulario */}
            <Grid
                item
                xs={11}
                sm={8}
                md={6}
                lg={4}
                container
                sx={{
                    background: "white",
                    height: "90vh",
                    borderRadius: "16px",
                    boxSizing: "border-box",
                }}
            >
                {/* contenedor de logo */}
                <Box sx={{ height: "100%", width: "100%" }} display="flex">
                    <Grid container sx={{ height: "100%" }} justifyContent={"center"}>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: { xs: "25%", sm: "40%", md: "30%" },
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    height: "100%",
                                }}
                                src={logo}
                            ></Box>
                        </Grid>

                        {/* contenedor de los inputs */}
                        <Grid
                            item
                            xs={12}
                            sm={10}
                            md={12}
                            padding={2}
                            container
                            height={{ xs: "75%", sm: "60%", md: "70%" }}
                        >
                            <Outlet />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginLayout;
