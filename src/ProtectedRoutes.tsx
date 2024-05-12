import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "./store/authStore";

interface IProtectedRoutesProps {
    auth?: boolean
}

export const ProtectedRoutes = observer(({ auth = false }: IProtectedRoutesProps) => {
    const authenticated = authStore.authenticated;

    if (authenticated === undefined) {
        return null;
    }

    return (
        authenticated === auth ? <Outlet /> : <Navigate to={auth ? '/' : '/todos'} />
    );
})
