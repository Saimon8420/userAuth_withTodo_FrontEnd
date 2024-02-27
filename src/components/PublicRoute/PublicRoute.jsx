import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state?.auth);
    if (user?.user !== undefined) {
        return <Navigate to="/" replace />;
    }
    else {
        return children;
    }
};

export default PublicRoute;