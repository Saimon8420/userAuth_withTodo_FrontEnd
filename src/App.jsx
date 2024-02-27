import { Route, Routes } from 'react-router-dom';
import './App.css'
import Registration from './components/UserCredential/Registration';
import Login from './components/UserCredential/Login'
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import Todo from './components/Todos/Todo';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useGetUserInfoQuery } from './components/Features/auth/authApi';
import { setUser } from './components/Features/auth/authSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SendResetEmail from './components/UserCredential/SendResetEmail';
import ResetPassword from './components/UserCredential/ResetPassword';
import { ToastContainer } from 'react-toastify';
import AddTodo from './components/Todos/AddTodo';
import UpdateTodo from './components/Todos/UpdateTodo';
import Loading from './components/Loading/Loading';
import Home from './components/Home/Home';
import PublicRoute from './components/PublicRoute/PublicRoute';

function App() {
  const userData = useSelector(state => state?.auth);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, refetch } = useGetUserInfoQuery({ refetchOnMountOrArgChange: true, });

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("userAuth"));
    const token = getToken?.accessToken;
    if (token && userData?.accessToken === undefined && userData?.user === undefined) {
      dispatch(setUser({
        user: data?.data
      }));
    }
  }, [data, userData, dispatch]);

  return (
    <div className='app'>
      <ToastContainer />
      {isLoading && <Loading />}
      {
        !isLoading &&
        <Routes>
          <Route path="/home" element={
            <PublicRoute><Home /></PublicRoute>
          }></Route>

          <Route path="/login" element={
            <PublicRoute><Login /></PublicRoute>
          }></Route>

          <Route path="/register" element={
            <PublicRoute><Registration /></PublicRoute>
          }></Route>

          {/* for reset password */}
          <Route path="/reset" element={
            <PublicRoute><SendResetEmail /></PublicRoute>
          }
          ></Route>

          <Route path="/reset/resetPass/:token" element={
            <PublicRoute><ResetPassword /></PublicRoute>
          }></Route>

          {/* For updating userInfo */}
          <Route path="/updateUser" element={
            <ProtectedRoute><Registration /></ProtectedRoute>
          }></Route>

          <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>

          <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>}></Route>

          <Route path="/addTodo" element={<ProtectedRoute><AddTodo /></ProtectedRoute>}></Route>

          <Route path="/updateTodo/:id" element={<ProtectedRoute><UpdateTodo /></ProtectedRoute>}></Route>

          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      }
    </div>
  )
}

export default App;
