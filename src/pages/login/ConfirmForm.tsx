import { Box, Button, Grid, Typography, useTheme, Modal, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import BoxCode from "./components/BoxCode";
import InputPhoneNumber from "./components/InputPhoneNumber";
import { useAppDispatch, useAppSelector } from "../../hook/useStore";
import { actionValidateNumberPhoneUser } from "../../redux/actions/userAction";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { PRIVATEROUTES } from "../../const";

interface Props {}
const ConfirmForm: React.FC<Props> = ({}) => {
    // const codeAux: string[] = ["", "", "", "", "", ""];
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [numberPhone, setNumberPhone] = useState<string>("");

    const { userTemp } = useAppSelector((state) => state.userSate);
    const { showNotification } = useNotification();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const aux: string[] = [...code];
        aux[parseInt(e.target.name)] = e.target.value;
        setCode(aux);
    };

    const handleShowModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShowModal(!showModal);
    };

    const handleChangeNumberPhone = (number: string): void => {
        setNumberPhone(number);
    };
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            let numberCode = code.join("");
            await dispatch(
                actionValidateNumberPhoneUser(userTemp?.token as string, Number(numberCode))
            );
            navigate(`/${PRIVATEROUTES}`, { replace: true });
            //console.log(response);
        } catch (e: any) {
            console.log(e.message);
            showNotification("Error, verifique el codigo de validacion", "error");
        }
    };
    useEffect(() => {}, []);
    return (
        <Box
            sx={{ height: "100%", width: "100%" }}
            component={"form"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Grid container sx={{ width: "100%", height: "100%" }}>
                <Grid item xs={12}>
                    <Typography
                        textAlign={"center"}
                        variant="h4"
                        fontWeight={"900"}
                        color={theme.palette.primary.main}
                    >
                        Valida tu numero!!
                    </Typography>
                    <Typography marginTop={2}>
                        Te enviamos un whatsapp con un codigo para poder validar tu numero,
                        ingresalo aqui abajo para poder continuar.
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    py={3}
                    display={"flex"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                >
                    {code.map((e, i) => (
                        <BoxCode handleChange={handleChange} key={i} value={e} name={`${i}`} />
                    ))}
                </Grid>
                <Grid item xs={12} justifyContent={"space-around"} alignItems={"center"} container>
                    <Button
                        variant="contained"
                        sx={{ height: "40px" }}
                        type="submit"
                        onClick={handleClick}
                    >
                        Confirmar
                    </Button>
                    <Button
                        sx={{ height: "40px" }}
                        variant="contained"
                        onClick={(e) => handleShowModal(e)}
                    >
                        Cambiar Numero
                    </Button>{" "}
                </Grid>
            </Grid>
            <Modal
                open={showModal}
                onClose={handleShowModal}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 1,
                }}
            >
                <Box
                    sx={{
                        width: "725px",
                        height: "400px",
                        background: "white",
                        borderRadius: "16px",
                    }}
                    py={2}
                >
                    <Stack
                        height={"100%"}
                        spacing={2}
                        justifyContent={"space-around"}
                        alignItems={"center"}
                    >
                        <Typography
                            fontSize={"2rem"}
                            fontWeight={500}
                            textAlign={"center"}
                            color={theme.palette.primary.main}
                        >
                            Cambiar Numero
                        </Typography>
                        <Typography textAlign={"center"}>
                            Ingresa un nuevo numero y te enviaremos un nuevo codigo de validacion
                        </Typography>
                        <Box
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Box
                                width={{ xs: "90%", md: "80%" }}
                                border={`2px solid ${theme.palette.primary.main}`}
                                borderRadius={"16px"}
                                p={{ xs: 3, md: 4 }}
                            >
                                <InputPhoneNumber
                                    sizeInput="medium"
                                    sizeIcon="large"
                                    handleChange={handleChangeNumberPhone}
                                    ifNumberExistError
                                />
                            </Box>
                        </Box>
                        <Box
                            display={"flex"}
                            justifyContent={"space-around"}
                            alignItems={"center"}
                            gap={{ xs: 2 }}
                            flexDirection={{ xs: "column", sm: "row" }}
                        >
                            <Button variant="contained" sx={{ width: "180px" }}>
                                Confimar
                            </Button>
                            <Button variant="contained" sx={{ width: "180px" }}>
                                Cancelar
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default ConfirmForm;
