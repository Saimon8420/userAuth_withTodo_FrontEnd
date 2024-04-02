import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const auth = useAuth();
    useEffect(() => {
        if (!auth) {
            navigate('/', { replace: true });
        }
    }, [navigate, auth]);

    return children;

};

export default ProtectedRoute;