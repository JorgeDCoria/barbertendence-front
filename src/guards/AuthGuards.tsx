import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PRIVATEROUTES, PrivateAdminRoutes, PrivateUserRoutes, PublicRoutes, ROL } from "../const";
import { useAppSelector } from "../hook/useStore";

interface AuthGuardProps {
    redirectTo?: string;
}
export const AuthGuard: React.FC<AuthGuardProps> = () => {
    const { user } = useAppSelector((state) => state.userSate);
    const { idBarberShop } = useAppSelector((state) => state.barberShop);
    const navigate = useNavigate();
    console.log(idBarberShop);

    useEffect(() => {
        if (user) {
            if (user.rol == ROL.ADMINKEY)
                navigate(`/${PRIVATEROUTES}/${PrivateAdminRoutes.ADMIN}`, { replace: true });
            else navigate(`/${PRIVATEROUTES}/${PrivateUserRoutes.USER}`, { replace: true });
        } else navigate(`/${idBarberShop}/${PublicRoutes.LOGIN}`, { replace: true });
    }, [idBarberShop]);

    return null;
};

export default AuthGuard;
