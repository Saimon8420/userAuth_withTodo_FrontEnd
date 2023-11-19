import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
const Profile = () => {
    const userData = useSelector((state) => state.auth);
    const [user, setUser] = useState([]);

    useEffect(() => {
        setUser(userData?.user);
    }, [userData])

    // hadith
    const [hadith, setHadith] = useState([]);
    const min = 2932; // Minimum value (inclusive)
    const max = 2999; // Maximum value (inclusive)

    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await fetch(`https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${randomInteger}`);
                const data = await res.json();
                if (data) setLoading(false);
                setHadith(data);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="bg-white">
            <div className="mb-14">
                <Header />
            </div>
            <div className="mx-auto mt-0 grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-10 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:py-10 md:py-10 text-center">
                <div>
                    <div className='flex items-center justify-center gap-4'>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome, <br />{user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-1/12 lg:w-1/12 md:w-1/4 sm:w-1/4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>

                    {/* Hadith */}
                    <div className='rounded border-2 border-stone-500/15 m-3 p-4 text-justify divide-y divide-gray-100'>
                        {/* Hadith */}
                        {loading ? <Loading /> :
                            <>
                                <p className="mt-4 text-gray-500">
                                    Hadeeth : {hadith?.hadeeth}
                                    <br />
                                    <br />
                                    Grade : {hadith?.grade}
                                </p>

                                <details className="mt-4 text-gray-900 divide-y divide-gray-100">
                                    <summary className='font-bold '>Attribution:</summary>
                                    <p className='text-gray-500'>{hadith?.attribution}</p>
                                </details>

                                <details className="mt-4 text-gray-900 divide-y divide-gray-100">
                                    <summary className='font-bold'>Explanation:</summary>
                                    <p className='text-gray-500'>{hadith?.explanation}</p>
                                </details>
                            </>
                        }
                    </div>

                    {/* User information */}
                    <div className='mt-10 mb-10'>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                            <p className="mt-1 text-sm leading-6 text-gray-500 text-center">Personal details of user.</p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Phone
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.phone}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.email}</dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user?.address}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/updateUser")}
                        className="flex w-1/4 mx-auto justify-center mt-0 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Edit Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;