import { Route, Routes } from 'react-router-dom';
import './App.css'
import Registration from './components/UserCredential/Registration';
import Login from './components/UserCredential/Login'
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import Todo from './components/Todos/Todo';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useGetUserInfoQuery } from './components/Features/auth/authApi';
import { setUser, userLoggedOut } from './components/Features/auth/authSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SendResetEmail from './components/UserCredential/SendResetEmail';
import ResetPassword from './components/UserCredential/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import AddTodo from './components/Todos/AddTodo';
import UpdateTodo from './components/Todos/UpdateTodo';
import Loading from './components/Loading/Loading';
import Home from './components/Home/Home';
import PublicRoute from './components/PublicRoute/PublicRoute';

function App() {
  const { isLoading, data, refetch, isSuccess } = useGetUserInfoQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch();
    if (data?.status === 401 && data?.msg && isSuccess) {
      dispatch(userLoggedOut());
      // toast.error(`${data?.msg}`, {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   toastId: "Auth1",
      //   //toast id dile toast ekbar ee show korbe***
      // });
    }
    if (data?.data && !isLoading) {
      dispatch(setUser({
        user: data?.data,
      }));
    }
  }, [data, dispatch, isLoading, refetch, isSuccess]);

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
