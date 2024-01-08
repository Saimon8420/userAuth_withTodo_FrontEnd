import { useGetTodoQuery } from "../Features/todo/todoApi";
import Header from "../Header/Header";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTodo } from "../Features/todo/todoSlice";

const Todo = () => {
    const { isLoading, data, isSuccess, refetch } = useGetTodoQuery({
        refetchOnMountOrArgChange: true,
    });
    const [allTodo, setAllTodo] = useState([]);
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo);
    useEffect(() => {
        if (isSuccess) {
            refetch();
            dispatch(setTodo({ todo: data?.data }));
            setAllTodo(todo?.allTodo);
        }
    }, [isSuccess, data, todo])

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [filterOpt, setFilterOpt] = useState("");
    return (
        <div className="mt-20 grid gap-2">
            <div className="mb-5">
                <Header />
            </div>
            {
                isLoading ? <Loading /> :
                    <div>
                        <div className="flex items-center justify-between">
                            <h1 className="font-bold text-2xl">All Todo's</h1>
                            <button onClick={() => navigate("/addTodo")} className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Todo <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            </button>
                        </div>
                        {allTodo?.length === 0 ? <div className="mt-5">No todo found, please add some todo</div> : <>
                            <div className="mt-10 lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between sm:grid sm:grid-cols-1 sm:items-start sm:gap-5">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:mb-5">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900 text-left">
                                            Search todo by [Title/Details]
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Search todo"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-start filterDiv">
                                    <details className="hover:cursor-pointer">
                                        <summary>Filter Option</summary>
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" name="default" id=""
                                                value={""}
                                                onChange={(e) => setFilterOpt(e.target.value)} checked={filterOpt === "" ? true : false} />
                                            <label htmlFor="default">default</label>
                                        </div>
                                        <div className="flex items-center justify-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <input type="checkbox" name="completed" id="" placeholder="completed"
                                                    value={'completed'}
                                                    onClick={(e) => setFilterOpt(e.target.value)}
                                                    checked={filterOpt === "completed" ? true : false} />
                                                <label htmlFor="completed">completed</label>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <input type="checkbox" name="incomplete" id=""
                                                    value={'incomplete'}
                                                    onChange={(e) => setFilterOpt(e.target.value)} checked={filterOpt === "incomplete" ? true : false} />
                                                <label htmlFor="incomplete">incomplete</label>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                            <div className="mt-5 mb-10 grid gap-2
                        justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                                {

                                    allTodo
                                        ?.filter((each) => each?.title?.includes(search) || each?.description?.includes(search))
                                        ?.filter((each) => each?.status?.includes(filterOpt))
                                        ?.map((filteredTodo) => (
                                            <TodoList key={filteredTodo?._id} todo={filteredTodo} />
                                        ))
                                }
                            </div>
                        </>
                        }
                    </div>
            }
        </div>
    );
};

export default Todo;