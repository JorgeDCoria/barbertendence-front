import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { SizeSMLValue } from "../../typesConfig";
interface LoginButtonProps {
    size?: SizeSMLValue;
}
const LoginButton: React.FC<LoginButtonProps> = ({ size = "large" }) => {
    return (
        <Link to={"https://fair-red-drill-belt.cyclic.cloud/api/auth/google/signin"}>
            <Button variant="outlined" fullWidth color="primary" size={size}>
                Ingresar con Gmail
            </Button>{" "}
        </Link>
    );
};
export default LoginButton;
