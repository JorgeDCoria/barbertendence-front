import {
  Box,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import logo from "../../assets/logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useState } from "react";
interface Props {}

const Login: React.FC<Props> = ({}) => {
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAreaCodeChange = (event: any) => {
    setAreaCode(event.target.value);
  };

  const handlePhoneNumberChange = (event: any) => {
    setPhoneNumber(event.target.value);
  };
  return (
    <Grid
      container
      sx={{
        backgroundImage:
          "linear-gradient(to bottom, #1F6BB5 7.57%, #7F217D 70%)",
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
        sx={{
          background: "white",
          placeContent: "space-around",
          height: "90vh",
          borderRadius: "16px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* contenedor de logo */}
        <Grid
          item
          xs={12}
          border="2px solid white"
          sx={{
            background: "white",
            border: "2px solid red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              width: { xs: 250, sm: 400 },
              border: "2px solid red",
            }}
            src={logo}
          ></Box>
        </Grid>
        {/* contenedor de los inputs */}
        <Grid
          item
          xs={12}
          md={10}
          border="2px solid red"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={4} my={4} component="form" sx={{ width: "90%" }}>
            {/* Numero telefono */}
            <TextField
              label="Phone Number"
              value={`${areaCode} ${phoneNumber}`}
              onChange={handlePhoneNumberChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    +1 ({areaCode})
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="input-password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" color="primary">
              Ingresar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
