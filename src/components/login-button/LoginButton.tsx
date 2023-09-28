import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <Link to={"https://fair-red-drill-belt.cyclic.cloud/api/auth/google/signin"}>
            <Button variant="outlined" fullWidth color="primary" size="large">
                Ingresar con Gmail
            </Button>{" "}
        </Link>
    );
};
export default LoginButton;
