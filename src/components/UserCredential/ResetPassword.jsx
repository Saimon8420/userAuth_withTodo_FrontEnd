import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../Features/auth/authApi';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const token = useParams();
    // converting btoa token into readable and convertible machine token
    const decodedToken = atob(token?.token);
    const [password, setPassword] = useState([]);
    const [confirmPass, setConfirmPass] = useState([]);
    const [matchedPass, setMatchedPass] = useState(false);
    const [passVal, setPassVal] = useState(false);
    // Show Password
    const [showPass, setShowPass] = useState(false);
    const [showConPass, setShowConPass] = useState(false);

    const navigate = useNavigate();

    const [resetPassword, { data, isSuccess }] = useResetPasswordMutation();

    useEffect(() => {
        setPassVal(/^(?=.*\d)(?=.*[!@#$ %^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password));
        setMatchedPass(() => {
            if (password === confirmPass)
                return true;
        });
    }, [password, confirmPass])

    const handleReset = () => {
        if (matchedPass) {
            resetPassword({ password: password, token: decodedToken });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            if (data !== undefined && data?.status === 200) {
                toast(`${data?.msg}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "resetPass1",
                });
                navigate("/");
            }
            if (data !== undefined && data?.status === 401) {
                toast.error(`${data?.msg}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "resetPass2",
                });
            }
            navigate("/");
        }
    }, [isSuccess])

    return (
        <div className='mt-10 mx-auto lg:w-1/2 md:w-1/2'>
            <h3 className='font-bold text-lg mt-5 mb-5'>Reset Password</h3>
            {/* Password */}
            <div className="sm:col-span-3">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Password  *
                </label>
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type={!showPass ? "password" : "text"}
                        name="password"
                        id="password"
                        autoComplete="password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={password}
                    />
                    {
                        !showPass ? <svg onClick={() => setShowPass(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg> : <svg onClick={() => setShowPass(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                </div>
                {
                    (password.length > 0 && !passVal) && <label className='block text-sm font-medium leading-6 text-red-500'>Invalid Password</label>
                }
                {
                    password.length === 0 && <p className="mt-1 text-sm leading-6 text-gray-600 opacity-50">Should contains each of [0-9], [!@#$%^&*], [A-Z], [a-z].The total length should be at least 8 characters..</p>
                }
            </div>

            {/* Confirm Password */}
            <div className="sm:col-span-3 mt-10">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                    Confirm Password *
                </label>
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type={!showConPass ? "password" : "text"}
                        name="confirm-password"
                        id="confirm-password"
                        autoComplete="confirm-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    {
                        !showConPass ? <svg onClick={() => setShowConPass(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg> : <svg onClick={() => setShowConPass(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                </div>
                {
                    (confirmPass.length > 0 && !matchedPass) && <label className='block text-sm font-medium leading-6 text-red-500'>Password does not matched</label>
                }
            </div>

            <div className="mt-10 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-12 ">
                <button onClick={() => navigate("/login")} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    onClick={() => handleReset()}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={password.length === 0 && !matchedPass}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;