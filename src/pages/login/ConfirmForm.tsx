import { Box, Button, Grid, Typography, useTheme, Modal, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import BoxCode from "./components/BoxCode";
import InputPhoneNumber from "./components/InputPhoneNumber";
import { Phone } from "../../types/phoneType";
import { InputError } from "../../types/inputError";

import { useAppDispatch } from "../../hook/useStore";

interface Props {}
const ConfirmForm: React.FC<Props> = ({}) => {
    // const codeAux: string[] = ["", "", "", "", "", ""];
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [numberPhone, setNumberPhone] = useState<Phone>({
        code: "",
        phone: 0,
    });
    const [error, setError] = useState<InputError>({
        error: false,
        message: "",
    });
    const theme = useTheme();
    const dispatch = useAppDispatch();
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

    const handleChangeNumberPhone = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setNumberPhone({ ...numberPhone, [e.target.name]: e.target.value });
    };
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let numberCode = code.join("");
        console.log(numberCode);

        //await dispatch(actionValidateNumberUser())
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
                        Gracias por registrarte !!
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
                                    codeName={"code"}
                                    codeValue={numberPhone.code}
                                    errorMessage={error.message}
                                    phoneName="phone"
                                    phoneValue={numberPhone.phone}
                                    sizeIcon="large"
                                    error={error.error}
                                    handleChange={handleChangeNumberPhone}
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
