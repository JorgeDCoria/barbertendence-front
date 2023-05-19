import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import BoxCode from "./components/BoxCode";

interface Props {}
const ConfirmForm: React.FC<Props> = ({}) => {
    // const codeAux: string[] = ["", "", "", "", "", ""];
    const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
    const theme = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const aux: string[] = [...code];
        aux[parseInt(e.target.name)] = e.target.value;
        setCode(aux);
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
                    <Button sx={{ height: "40px" }} variant="contained">
                        Cambiar Numero
                    </Button>{" "}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ConfirmForm;
