import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddTodoMutation } from '../Features/todo/todoApi';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

const AddTodo = () => {
    const [title, setTitle] = useState([]);
    const [details, setDetails] = useState([]);

    const navigate = useNavigate();

    const [addTodo, { data, isLoading, isSuccess }] = useAddTodoMutation();

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (title?.length > 0 && details?.length > 0) {
            addTodo({ title: title, description: details })
        }
    }

    useEffect(() => {
        if (data !== undefined && data?.status === 201) {
            toast(`${data.msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "addTodo1",
                //toast id dile toast ekbar ee show korbe***
            });
            if (isSuccess) {
                return navigate("/todo");
            }
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
                toastId: "addTodo2",
            });
        }
    }, [data, navigate, isSuccess])

    return (
        <div className='p-5'>
            {
                isLoading && <Loading />
            }
            <form onSubmit={handleAddTodo}>
                <div className="space-y-12 mt-5">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Add Todo
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            /</span>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            autoComplete="title"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Todo title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                    Todo Details
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        placeholder='Add todo details'
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600 font-bold">Write todo details.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => navigate("/todo")} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        disabled={isLoading || (title.length === 0 && details.length === 0)}
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;