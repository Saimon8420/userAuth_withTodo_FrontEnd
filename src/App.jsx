import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import Registration from './components/UserCredential/Registration';
import Login from './components/UserCredential/Login'
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import Todo from './components/Todos/Todo';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
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

function App() {
  const getToken = JSON.parse(localStorage.getItem("userAuth"));
  const token = getToken?.accessToken;
  const userData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, refetch } = useGetUserInfoQuery({ refetchOnMountOrArgChange: true, });

  const [expTime, setExpTime] = useState(null);

  useEffect(() => {
    if (token !== null && token !== undefined && isSuccess || isSuccess) {
      refetch();
      dispatch(setUser({
        user: data?.data
      }));
      setExpTime(data?.expireTime);
    }
  }, [isSuccess, token, data, setExpTime, dispatch]);

  // for expired token
  useEffect(() => {
    if (token !== null && token !== undefined && expTime !== null && expTime !== undefined) {
      const intervalId = setInterval(() => {
        const curTime = new Date().getTime() / 1000;
        if (expTime < curTime) {
          dispatch(userLoggedOut());
          toast.error(`Session expired, please login again`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: "sessionExp1",
            //toast id dile toast ekbar ee show korbe***
          });
          clearInterval(intervalId); // Clear the interval once logged out
        }
      }, 1000);
    }
  }, [token, dispatch, expTime])

  return (
    <div className='app'>
      <ToastContainer />
      {isLoading && <Loading />}
      <Routes>
        {userData?.user === undefined && <Route path="/home" element={<Home />}></Route>
        }
        {
          userData?.user === undefined &&
          <Route path="/login" element={<Login />}></Route>
        }
        {
          userData?.user === undefined && <Route path="/register" element={<Registration />}></Route>
        }

        {/* For updating userInfo */}
        {
          userData?.user !== undefined && <Route path="/updateUser" element={<Registration />}></Route>
        }

        {
          userData?.user === undefined && <Route path="/reset" element={<SendResetEmail />}></Route>
        }

        {
          <Route path="/reset/resetPass/:token" element={<ResetPassword />}></Route>
        }


        <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>

        <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute>}></Route>

        <Route path="/addTodo" element={<ProtectedRoute><AddTodo /></ProtectedRoute>}></Route>

        <Route path="/updateTodo/:id" element={<ProtectedRoute><UpdateTodo /></ProtectedRoute>}></Route>

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default App;
