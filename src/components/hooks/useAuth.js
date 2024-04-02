import { useSelector } from "react-redux";
const useAuth = () => {
    const user = useSelector((state) => state?.auth);
    if (user?.user !== undefined) {
        return true
    }
    return false;
};

export default useAuth;