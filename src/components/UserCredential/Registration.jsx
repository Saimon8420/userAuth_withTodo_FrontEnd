import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation, useUpdateMutation } from '../Features/auth/authApi';
import { toast } from 'react-toastify';

const Registration = () => {
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setPhone] = useState([]);
    const [address, setAddress] = useState([]);
    const [password, setPassword] = useState([]);
    const [confirmPass, setConfirmPass] = useState([]);
    // for unChanged password,
    const [unChangePass, setUnChangePass] = useState([]);
    // Check Validation
    const [emailVal, setEmailVal] = useState(false);
    const [passVal, setPassVal] = useState(false);
    const [phoneVal, setPhoneVal] = useState(false);
    const [matchedPass, setMatchedPass] = useState(false);
    // Show Password
    const [showPass, setShowPass] = useState(false);
    const [showConPass, setShowConPass] = useState(false);

    // pathName
    const pathName = location.pathname;
    // /updateUser
    const data = useSelector((state) => state.auth);
    const userData = data?.user;

    // for validate inputs
    useEffect(() => {
        setEmailVal(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email));

        setPassVal(/^(?=.*\d)(?=.*[!@#$ %^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password));

        setPhoneVal(/^(?:\+8801|01)[3-9]\d{8}$/.test(phone));

        setMatchedPass(() => {
            if (password === confirmPass)
                return true;
        });

    }, [email, password, confirmPass, phone])

    //for updateInfo
    useEffect(() => {
        if (pathName === "/updateUser" && userData !== undefined) {
            setFirstName(userData?.firstName);
            setLastName(userData?.lastName);
            setEmail(userData?.email);
            setPhone(userData?.phone);
            setAddress(userData?.address);
            // setPassword(userData?.password);
            setUnChangePass(userData?.password);
        }
    }, [pathName, userData])

    const [update, { data: userUpdatedData, isLoading: updateLoading }] = useUpdateMutation();
    const [register, { data: registerData, isSuccess, isError, isLoading: registerLoading }] = useRegisterMutation();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // For update user
        if (pathName === "/updateUser") {
            if (password.length === 0) {
                update({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    address: address,
                    phone: phone,
                    unChangePass: unChangePass,
                })
            }
            else {
                if (password === confirmPass) {
                    update({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        address: address,
                        phone: phone,
                        changedPass: password,
                    })
                }
                else {
                    console.log("password does not matched");
                }
            }
        }
        // For register user
        else {
            if (password === confirmPass) {
                if (firstName.length >= 4)
                    register({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        address: address,
                        phone: phone,
                        password: password,
                    })
                else {
                    toast.error(`FirstName length must be 5 character or more`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        toastId: "register2",
                    });
                }
            }
            else {
                console.log("password does not matched");
            }
        }
    }

    // for toast
    useEffect(() => {
        // user update toast
        if (userUpdatedData !== undefined && userUpdatedData?.status === 200) {
            toast(`${userUpdatedData?.msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "update1",
            });
        }
        // user register toast
        if (registerData !== undefined && registerData?.status === 201) {
            toast(`${registerData?.msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "register1",
            });
            if (isSuccess) {
                navigate("/login");
            }
        }
        if (registerData !== undefined && registerData?.status === 500) {
            toast.error(`${registerData?.msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "register2",
            });
            if (isError) {
                navigate("/home");
            }
        }
    }, [userUpdatedData, registerData, navigate, isSuccess, isError])

    return (
        <div className='p-5 registerDiv'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-5">
                <div className="flex items-center justify-center gap-5 mt-0">
                    <img
                        className="h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    {
                        pathName !== "/updateUser" && <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(79, 70, 229)" viewBox="0 0 24 24" className="w-auto h-10 cursor-pointer" onClick={() => navigate("/home")}>
                            <title>Go back to home</title>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    }
                </div>
                {
                    pathName !== "/updateUser" && <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register your account
                    </h2>
                }
                {
                    pathName === "/updateUser" && <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update User Info
                    </h2>
                }

            </div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="font-bold leading-7 text-gray-900 text-lg">{pathName === "/updateUser" && "Update "}Personal Information</h2>
                        {pathName === "/updateUser" &&
                            <div className="mt-3 underline font-semibold text-sky-400">
                                <Link to={"/"}>Back to profile</Link>
                            </div>
                        }
                        {
                            pathName === "/register" &&
                            <p className="mt-1 text-sm leading-6 text-gray-600">Fill-up all the (*) credentials for Sign Up.</p>
                        }
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* Name */}
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    {pathName === "/register" ? "First name *" : "First name"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    {
                                        firstName.length <= 5 && <p className="mt-1 text-sm leading-6 text-gray-600 opacity-50">The total length must be at least 5 characters or more..</p>
                                    }
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    {pathName === "/register" ? "Email address *" : "Email address"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {
                                    (email.length > 0 && !emailVal) && < label className='block text-sm font-medium leading-6 text-red-500'>Invalid Email</label>
                                }

                            </div>

                            {/* Number */}
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    {pathName === "/register" ? "Phone number *" : "Phone number"}
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        autoComplete="phone"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                {
                                    (phone.length > 0 && !phoneVal) && <label className='block text-sm font-medium leading-6 text-red-500'>Invalid Number</label>
                                }
                                {
                                    phone.length === 0 && <p className="mt-1 text-sm leading-6 text-gray-600 opacity-50">Can use +88, or any 11digits valid BD number.</p>
                                }

                            </div>

                            {/* Address */}
                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="sm:col-span-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    {pathName === "/register" ? "Password  *" : "Password"}
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
                                        required={pathName === "/register"}
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
                            <div className="sm:col-span-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    {pathName === "/register" ? "Confirm Password *" : "Confirm Password"}
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
                                        required={pathName === "/register"}
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
                        </div>
                    </div>
                    <button
                        disabled={updateLoading || registerLoading}
                        type="submit"
                        className="flex w-1/4 justify-center items-center rounded-md mx-auto bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {pathName === "/register" ? "Sign Up" : "Update Info"}
                    </button>
                </div>
            </form>
            {
                pathName === "/register" &&
                <p className="mt-10 text-center text-sm text-gray-500">
                    Have an account?{' '}
                    <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Please Sign-in
                    </Link>
                </p>
            }
        </div>
    );
};

export default Registration;


