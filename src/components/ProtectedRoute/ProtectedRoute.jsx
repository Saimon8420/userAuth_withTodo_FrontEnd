import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state?.auth);
    if (user?.user === undefined) {
        return <Navigate to="/home" replace />;
    }
    else {
        return children;
    }
};

export default ProtectedRoute;