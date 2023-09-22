import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hook/useStore";
import { PublicRoutes } from "../const";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthGuard = () => {
    const { isAuthenticated, user: userAuth } = useAuth0();
    console.log(isAuthenticated);
    console.log(userAuth);

    const { user } = useAppSelector((state) => state.userSate);
    return user ? <Outlet /> : <Navigate replace to={`/`} />;
};

export default AuthGuard;
