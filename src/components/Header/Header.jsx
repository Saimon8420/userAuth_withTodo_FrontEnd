import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../Features/auth/authSlice';
import { toast } from 'react-toastify';
import { useLazyLogoutUserQuery } from '../Features/auth/authApi';

const navigation = [
    { name: 'Todos', href: '/todo' },
    { name: 'Profile', href: '/' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [logOut, setLogout] = useState(false);
    const dispatch = useDispatch();

    const [logoutUser, { data }] = useLazyLogoutUserQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (logOut) {
            const handleLogOut = () => {
                logoutUser();
                toast('User successfully logged out', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    toastId: "logout1",
                })
            }
            handleLogOut();
        }
    }, [logOut, dispatch, logoutUser])

    useEffect(() => {
        if (data?.status === 201) {
            dispatch(userLoggedOut());
            navigate("/");
        }
    }, [dispatch, navigate, data])

    return (
        <div className="bg-white">
            <header className="fixed inset-x-0 top-0 z-50 bg-slate-200">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <NavLink key={item.name}
                                to={item.href}
                                style={({ isActive, isPending, isTransitioning }) => {
                                    return {
                                        fontWeight: isActive ? "bold" : "",
                                        color: isPending ? "red" : "black",
                                        viewTransitionName: isTransitioning ? "slide" : "",
                                    };
                                }}
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <a onClick={() => setLogout(true)} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                            Log Out <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6 flex flex-col">
                                    {navigation.map((item) => (
                                        <NavLink key={item.name}
                                            to={item.href}
                                            style={({ isActive, isPending, isTransitioning }) => {
                                                return {
                                                    fontWeight: isActive ? "bold" : "",
                                                    color: isPending ? "red" : "black",
                                                    viewTransitionName: isTransitioning ? "slide" : "",
                                                };
                                            }}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => setLogout(true)}
                                    >
                                        Log Out &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    )
}
