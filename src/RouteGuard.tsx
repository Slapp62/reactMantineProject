import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { Navigate } from "react-router-dom";

type RouteGuardProps = {
    children: React.ReactNode;
    isBusiness?: boolean;
    isAdmin?: boolean;
}

const RouteGuard = (props: RouteGuardProps) => {
    const {children,  isBusiness, isAdmin} = props;

    const user = useSelector((state:RootState) => {
        return state.userSlice.user;
    });
        
    if (!user) {
        return <Navigate to="/login" replace state={{message: 'You must login to access this page.'}}/>
    }

    if (isBusiness && !user.isBusiness) {
        return <Navigate to='/' replace state={{message: 'You must login to access this page.'}}/>
    }

    if (isAdmin && !user.isAdmin) {
        return <Navigate to='/' replace state={{message: 'You must login to access this page.'}}/>
    }

    return <>{children}</>
}

export default RouteGuard