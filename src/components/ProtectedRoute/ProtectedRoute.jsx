import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // const userData = useSelector((state) => state.auth);
    const getToken = JSON.parse(localStorage.getItem("userAuth"));
    // console.log(userData);
    // (userData?.user === undefined || userData?.user === "Unauthorized") &&
    const token = getToken?.accessToken;
    // console.log(token);
    if ((token === null || token === undefined)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;