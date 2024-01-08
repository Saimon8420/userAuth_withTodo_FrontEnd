import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='homeDiv'>
            <h2 className='font-bold text-3xl mb-5 pt-6 text-black'>Welcome to Todo app</h2>
            <div className='mt-20 p-5 rounded text-left font-bold features  text-blue-700 lg:w-1/2 lg:mx-auto sm:w-full cursor-pointer'>
                <details className='mt-20'>
                    <summary className='underline'>Features: Click here</summary>
                    <p className='mt-10 text-justify font-extrabold' style={{ color: "rgb(2, 33, 104)" }}>An user authentication system, where user can register him/her, as a registered user he/she can login, after login he/she will get his/her profile and user can update his/her user info. As an extra feature he/she will get todo task features, where user can add,update,delete todo.
                    </p>
                    <br />

                    <p className='text-justify font-extrabold' style={{ color: "rgb(2, 33, 104)" }} >For secure login, we use jwt. Also use highly mechanism to hash user password, so that none can able to retrieve it, and no issues/worries of leaked password.</p>
                    <br />


                    <p className='text-justify font-extrabold' style={{ color: "rgb(2, 33, 104)" }}>If any user forget his/her password he/she can retrieve it, via an reset link which will send to his/her registered email.</p>
                </details>
            </div>
            <div className='lg:flex items-center justify-between lg:w-1/2 m-auto gap-5 sm:grid sm:grid-cols-1 mb-10'>
                <p className="mt-10 text-center text-sm text-zinc-700">
                    Have an account?{' '}
                    <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Please Sign-in
                    </Link>
                </p>
                <p className="mt-10 text-center text-sm text-zinc-700">
                    Not an user?{' '}
                    <Link to={"/register"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Please SignUp
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Home;