import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEachTodoQuery, useUpdateTodoMutation } from '../Features/todo/todoApi';
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

const UpdateTodo = () => {
    const [title, setTitle] = useState([]);
    const [details, setDetails] = useState([]);
    const [status, setStatus] = useState([]);
    const [selected, setSelected] = useState([]);
    const todoId = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isSuccess: getSuccess, refetch } = useGetEachTodoQuery(todoId?.id, {
        refetchOnMountOrArgChange: true,
    });
    useEffect(() => {
        if (getSuccess) {
            refetch();
            setTitle(data?.data?.title);
            setDetails(data?.data?.description);
            setStatus(data?.data?.status);
            setSelected(data?.data?.status);
        }
    }, [data, getSuccess])

    const [updateTodo, { data: updateData, isSuccess, isLoading: updateLoading }] = useUpdateTodoMutation();

    const handleUpdateTodo = (e) => {
        e.preventDefault();
        updateTodo({ id: data?.data?._id, updatedData: { title: title, description: details, status: selected } });
        setTitle([]);
        setDetails([]);
        setStatus([]);
        setSelected([]);
    }

    useEffect(() => {
        if (updateData !== undefined && updateData?.status === 200) {
            toast(`${updateData.msg}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: "updateTodo1",
                //toast id dile toast ekbar ee show korbe***
            });
            if (isSuccess) {
                return navigate("/todo");
            }
        }
    }, [updateData, navigate, isSuccess])

    return (
        <div className='px-5 pt-2 pb-5 rounded-md shadow-md'>
            {isLoading ? <Loading /> :
                <form onSubmit={handleUpdateTodo}>
                    <div className="space-y-12 mt-5 ">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Update Todo
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

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                        Status
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={(e) => setSelected(e.target.value)}
                                        >
                                            <option>{status}</option>
                                            <option>{(status)?.includes("incomplete") ? "completed" : "incomplete"}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder='Add updated todo details'
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
                            disabled={updateLoading}
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            }
        </div>
    );
};

export default UpdateTodo;