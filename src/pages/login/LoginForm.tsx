// import { useState } from "react";
import { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import InputPassword from "./components/InputPassword";
import InputPhoneNumber from "./components/InputPhoneNumber";

type Phone = {
    code: string;
    phone: number;
};
interface Props {}
interface Input {
    numberPhone: Phone;
    password: string;
}

const LoginForm: React.FC<Props> = ({}) => {
    const [input, setInput] = useState<Input>({
        numberPhone: { code: "", phone: 0 },
        password: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === "password")
            setInput({ ...input, [e.target.name]: e.target.value });
        else
            setInput({
                ...input,
                numberPhone: {
                    ...input.numberPhone,
                    [e.target.name]: e.target.value,
                },
            });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    };
    return (
        <Box
            sx={{ height: "100%" }}
            component={"form"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            onSubmit={handleSubmit}
        >
            {/* contenedor de los inputs */}
            <Grid
                padding={2}
                container
                rowGap={{ xs: 4, md: 0 }}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    height: { xs: "100%", sm: "90%", md: "100%" },
                }}
            >
                {/*  input phone */}
                <Grid item xs={12} lg={10}>
                    <InputPhoneNumber
                        sizeIcon="large"
                        sizeInput="medium"
                        codeName="code"
                        phoneName="phone"
                        codeValue={input.numberPhone.code}
                        phoneValue={input.numberPhone.phone}
                        handleChange={handleChange}
                    />
                </Grid>
                {/* Numero password */}

                <Grid
                    item
                    xs={12}
                    lg={10}
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <InputPassword
                        label="Password"
                        name="password"
                        sizeTextField="medium"
                        sizeIcon="large"
                        value={input.password}
                        handleChange={handleChange}
                    />
                </Grid>
                <Grid item xs={10} sx={{ height: "40px" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        color="primary"
                        size="large"
                    >
                        Ingresar
                    </Button>
                </Grid>
                <Grid item xs={10} sx={{ height: "40px" }}>
                    <Button
                        type="submit"
                        variant="outlined"
                        fullWidth
                        color="primary"
                        size="large"
                    >
                        Ingresar con gmail
                    </Button>
                </Grid>
                <Grid item xs={10}>
                    <Typography
                        component={"p"}
                        align="center"
                        color={"primary.main"}
                    >
                        ¿olvidate tu password?
                    </Typography>
                    <Typography component={"p"} align="center">
                        No tienes una cuenta{" "}
                        <Link to={"/register"}>
                            <Typography
                                component={"span"}
                                fontSize={"18px"}
                                color={"primary.main"}
                            >
                                Registrate
                            </Typography>{" "}
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;
