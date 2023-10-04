import { useEffect, useRef } from "react";
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { PRIVATEROUTES } from "../const";
import { useAppDispatch } from "../hook/useStore";
import { actionSetBarberShopId } from "../redux/actions/barberShopAction";

const NavigateToPrivateRoute = () => {
    const dispatch = useAppDispatch();
    const { idBarberShop } = useParams();
    const navigate = useNavigate();
    const previousIdBarberShop = useRef<null | string>(null);

    useEffect(() => {
        if (idBarberShop !== null && idBarberShop !== undefined) {
            dispatch(actionSetBarberShopId(idBarberShop));
            navigate(`/${PRIVATEROUTES}`, { replace: true });
        }
    }, [dispatch]);

    return null;
};
export default NavigateToPrivateRoute;
