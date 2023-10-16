import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PRIVATEROUTES, PrivateAdminRoutes, PrivateUserRoutes, PublicRoutes, ROL } from "../const";
import { useAppSelector } from "../hook/useStore";
import { usePersistData } from "../hook/usePersistData";

interface AuthGuardProps {
    redirectTo?: string;
}
export const AuthGuard: React.FC<AuthGuardProps> = () => {
    //const { user } = useAppSelector((state) => state.userSate);
    const { getUser, getIdBarberShop } = usePersistData();
    //const navigate = useNavigate();

    useEffect(() => {
        console.log("private");
        // if (getUser() && !user) {
        //     //llamar api para cargar datos de usuario en la store
        //     console.log(getUser());
        // } else {
        //     navigate(`/${getIdBarberShop()}`, { replace: true });
        // }
        // if (user) {
        //     if (user.rol == ROL.ADMINKEY)
        //         navigate(`/${PRIVATEROUTES}/${PrivateAdminRoutes.ADMIN}`, { replace: true });
        //     else navigate(`/${PRIVATEROUTES}/${PrivateUserRoutes.USER}`, { replace: true });
        // } else navigate(`/${idBarberShop}/${PublicRoutes.LOGIN}`, { replace: true });
    }, []);

    return getUser() ? (
        getUser()?.rol === ROL.ADMINKEY ? (
            <Navigate to={`/${PrivateAdminRoutes.ADMIN}`} />
        ) : (
            <Navigate to={`/${PrivateUserRoutes.USER}`} />
        )
    ) : (
        <Navigate to={`/${getIdBarberShop()}`} />
    );
};

export default AuthGuard;
