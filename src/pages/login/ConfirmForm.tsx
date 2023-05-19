import {
    Box,
    Button,
    Grid,
    Typography,
    useTheme,
    Modal,
    Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import BoxCode from "./components/BoxCode";
import InputPhoneNumber from "./components/InputPhoneNumber";
import { Phone } from "src/types/phoneType";
import { InputError } from "src/types/inputError";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const aux: string[] = [...code];
        aux[parseInt(e.target.name)] = e.target.value;
        setCode(aux);
    };

    const handleShowModal = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setShowModal(!showModal);
    };

    const handleChangeNumberPhone = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        e.preventDefault();
        setNumberPhone({ ...numberPhone, [e.target.name]: e.target.value });
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
                        Te enviamos un whatsapp con un codigo para poder validar
                        tu numero, ingresalo aqui abajo para poder continuar.
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
                        <BoxCode
                            handleChange={handleChange}
                            key={i}
                            value={e}
                            name={`${i}`}
                        />
                    ))}
                </Grid>
                <Grid
                    item
                    xs={12}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    container
                >
                    <Button
                        variant="contained"
                        sx={{ height: "40px" }}
                        type="submit"
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
                }}
            >
                <Box
                    sx={{
                        width: "725px",
                        height: "400px",
                        background: "white",
                        borderRadius: "16px",
                    }}
                >
                    <Stack>
                        <Typography
                            fontSize={"2.5rem"}
                            fontWeight={500}
                            textAlign={"center"}
                            color={theme.palette.primary.main}
                        >
                            Cambiar Numero
                        </Typography>
                        <Typography textAlign={"center"}>
                            Ingresa un nuevo numero y te enviaremos un nuevo
                            codigo de validacion
                        </Typography>
                        <Box>
                            <InputPhoneNumber
                                sizeInput="medium"
                                codeName={"code"}
                                codeValue={numberPhone.code}
                                errorMessage={error.message}
                                phoneName="phone"
                                phoneValue={numberPhone.phone}
                                sizeIcon="medium"
                                error={error.error}
                                handleChange={(e) => handleChangeNumberPhone(e)}
                            />
                        </Box>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default ConfirmForm;
