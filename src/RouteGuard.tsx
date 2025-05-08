import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Navigate } from "react-router-dom";

type RouteGuardProps = {
    children: React.ReactNode;
    isBusiness?: boolean;
    adminOnly?: boolean;
}

const RouteGuard = (props: RouteGuardProps) => {
    const {children,  isBusiness, adminOnly} = props;

    const UserState = useSelector(
        (state:RootState) => state.userSlice, 
    )

    const user = UserState.user!;

    if (!UserState.isLoggedIn) {
        return <Navigate to="/" />
    }

    if (isBusiness && !user.isBusiness) {
        return <Navigate to='/' />
    }

    if (adminOnly && !user.isAdmin) {
        return <Navigate to='/' />
    }

    return <>{children}</>
}

export default RouteGuard