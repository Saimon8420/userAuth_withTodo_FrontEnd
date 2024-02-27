import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='homeDiv px-2'>

            <h2 className='font-bold text-3xl mb-5 pt-6 text-black flex gap-2 items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
                Todo App
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </h2>

            <div className='px-4 mx-auto rounded-lg shadow-lg w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2'>
                <p className='mt-10 text-justify font-extrabold p-3' style={{ color: "rgb(2, 33, 104)" }}>An user authentication system, where user can register. As a registered user, user can login, after login user will get user profile and user can update user info. As an extra feature user will get todo task features, where user can add,update,delete todo.
                </p>
                <br />

                <p className='text-justify font-extrabold p-3' style={{ color: "rgb(2, 33, 104)" }} >For secure login, we use jwt. Also use highly mechanism to hash user password, so that none can able to retrieve it, and no issues/worries of leaked password.</p>
                <br />


                <p className='text-justify font-extrabold p-3' style={{ color: "rgb(2, 33, 104)" }}>If any user forget password, then user can retrieve it, via an reset link which will send to users registered email.</p>
            </div>

            {/* <div className='mt-20 p-5 rounded text-left font-bold features  text-blue-700 lg:w-1/2 lg:mx-auto sm:w-full cursor-pointer'>
                <details className='mt-20'>
                    <summary className='underline'>Features: Click here</summary>
                    <p className='mt-10 text-justify font-extrabold' style={{ color: "rgb(2, 33, 104)" }}>An user authentication system, where user can register him/her, as a registered user he/she can login, after login he/she will get his/her profile and user can update his/her user info. As an extra feature he/she will get todo task features, where user can add,update,delete todo.
                    </p>
                    <br />

                    <p className='text-justify font-extrabold' style={{ color: "rgb(2, 33, 104)" }} >For secure login, we use jwt. Also use highly mechanism to hash user password, so that none can able to retrieve it, and no issues/worries of leaked password.</p>
                    <br />


                    <p className='text-justify font-extrabold' style={{ color: "rgb(2, 33, 104)" }}>If any user forget his/her password he/she can retrieve it, via an reset link which will send to his/her registered email.</p>
                </details>
            </div> */}

            <div className='lg:flex items-center justify-between lg:w-1/2 m-auto gap-2 sm:grid sm:grid-cols-1 mb-10'>
                <p className="mt-5 text-center text-sm text-zinc-700 flex items-center justify-center gap-2">
                    Have an account?{' '}
                    <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 flex gap-1 items-center justify-center">
                        Please Sign-in <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                    </Link>
                </p>
                <p className="mt-5 text-center text-sm text-zinc-700 flex items-center justify-center gap-2">
                    Not an user?{' '}
                    <Link to={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 flex gap-1 items-center justify-center">
                        Please SignUp <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Home;