import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            variant="outlined"
            fullWidth
            color="primary"
            size="large"
            onClick={() => loginWithRedirect()}
        >
            Ingresar con Gmail{" "}
        </Button>
    );
};
export default LoginButton;
