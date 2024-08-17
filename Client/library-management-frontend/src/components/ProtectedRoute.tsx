import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;