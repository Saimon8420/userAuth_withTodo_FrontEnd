import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendResetEmailMutation } from "../Features/auth/authApi";
import { toast } from "react-toastify";

const SendResetEmail = () => {
    const [email, setEmail] = useState([]);
    const navigate = useNavigate();
    const [sendResetEmail, { data, isSuccess, isLoading }] = useSendResetEmailMutation();

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
                navigate("/register");
            }
        }
    }, [isSuccess])

    return (
        <div className="mt-20 mx-6">
            <p className="mb-5 text-center font-bold">Enter your registered user email address,<br />to reset your password</p>
            <div className="relative mt-2 rounded-md shadow-sm lg:w-1/2 md:w-1/2 sm:w-full m-auto">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </span>
                </div>
                <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-10 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-12 ">
                <button onClick={() => navigate("/login")} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    onClick={() => sendResetEmail({ email: email })}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={email?.length === 0 || isLoading}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SendResetEmail;