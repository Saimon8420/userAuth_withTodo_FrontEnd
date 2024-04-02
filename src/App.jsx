import { Route, Routes } from 'react-router-dom';
import './App.css'
import Registration from './components/UserCredential/Registration';
import Login from './components/UserCredential/Login';
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
import { ToastContainer } from 'react-toastify';
import AddTodo from './components/Todos/AddTodo';
import UpdateTodo from './components/Todos/UpdateTodo';
import Loading from './components/Loading/Loading';
import Home from './components/Home/Home';
import PublicRoute from './components/PublicRoute/PublicRoute';
import UpdateProfile from './components/Profile/UpdateProfile';
import useAuth from './components/hooks/useAuth';

function App() {
  const { isLoading, data, isSuccess } = useGetUserInfoQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status === 401 && data?.msg && isSuccess) {
      dispatch(userLoggedOut());
    }
    if (data?.data && !isLoading) {
      dispatch(setUser({
        user: data?.data,
      }));
    }
  }, [data, dispatch, isLoading, isSuccess]);

  const auth = useAuth();

  return (
    <div className='app'>
      <ToastContainer />
      {isLoading && <Loading />}
      {
        !isLoading &&
        <Routes>
          <Route path="/" element={
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

          {
            auth && <>
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>

              <Route path="/updateUser" element={
                <ProtectedRoute><UpdateProfile /></ProtectedRoute>
              }></Route>

              <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>}></Route>

              <Route path="/addTodo" element={<ProtectedRoute><AddTodo /></ProtectedRoute>}></Route>

              <Route path="/updateTodo/:id" element={<ProtectedRoute><UpdateTodo /></ProtectedRoute>}></Route>
            </>
          }

          <Route path='*' element={<NotFound />}></Route>

        </Routes>
      }
    </div>
  )
}

export default App;
