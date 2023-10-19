import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";

import { IDBARBERSHOP, PRIVATEROUTES } from "../../const";
import { usePersistData } from "../../hook/usePersistData";
import { useAppDispatch } from "../../hook/useStore";
import { actionSetUser } from "../../redux/actions/userAction";
import { useNotification } from "../../context/notification.context";
import { UserRol } from "../../typesConfig";

const LoginLayout: React.FC<{}> = () => {
    const { idBarberShop } = useParams();
    const navigate = useNavigate();
    const { setPersistData, getUser, getIdBarberShop } = usePersistData();
    const dispatch = useAppDispatch();
    const { showNotification } = useNotification();
    const location = useLocation();
    useEffect(() => {
        if (
            //endPoint para validar idBarberShop
            !localStorage.getItem("user")
        ) {
            console.log("entre al primer if");

            if (!idBarberShop || (idBarberShop !== getIdBarberShop() && idBarberShop.length > 8)) {
                console.log(getIdBarberShop());

                setPersistData("idBarberShop", idBarberShop);
            } else {
                navigate(`/${getIdBarberShop()}`);
            }
        } else if (getUser()) {
            navigate(`/${PRIVATEROUTES}`);
        }
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get("token");
        const user = searchParams.get("user");
        const rol = searchParams.get("roles");
        if (token && user && rol)
            dispatch(actionSetUser(user, rol.toLowerCase() as UserRol, token))
                .then(() => {
                    navigate(`/${PRIVATEROUTES}`);
                })
                .catch((e: any) => {
                    console.log(e.message);
                    showNotification(
                        `Error al iniciar con cuenta gmail, intentelo mas tarde ${e.message}`,
                        "error"
                    );
                });
    }, [location]);

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
                    <Grid
                        container
                        sx={{ height: "100%" }}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: { xs: "20%", md: "25%" },
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
                            justifyContent={"center"}
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
