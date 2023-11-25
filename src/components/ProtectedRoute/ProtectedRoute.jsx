import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const getToken = JSON.parse(localStorage.getItem("userAuth"));
    const token = getToken?.accessToken;
    const user = useSelector((state) => state?.auth);
    // console.log(user);
    if (((token === null || token === undefined) && (user?.user === null || user?.user === undefined))) {
        return <Navigate to="/home" replace />;
    }
    else {
        return children;
    }
};

export default ProtectedRoute;