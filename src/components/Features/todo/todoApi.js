import { apiSlice } from "../api/apiSlice";

export const todoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodo: builder.query({
            query: () => "todo/getTodo",
        }),

        addTodo: builder.mutation({
            query: (data) => ({
                url: "todo/addTodo",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data: addedTodo } = await queryFulfilled;
                    // console.log(addedTodo);
                    dispatch(
                        apiSlice.util.updateQueryData("getTodo", undefined, (draft) => {
                            draft?.data?.push(addedTodo?.data)
                        })
                    )
                } catch (error) {
                    console.log(error?.message)
                }
            }
        }),

        getEachTodo: builder.query({
            query: (todoId) => `todo/getEach/${todoId}`,
        }),

        updateTodo: builder.mutation({
            query: (data) => ({
                url: `todo/updateTodo/${data?.id}`,
                method: "PUT",
                body: data?.updatedData,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data: updatedTodo }
                        = await queryFulfilled;
                    // console.log("updated todo data", updatedTodo?.data);
                    // console.log("args", args);

                    // update for all
                    dispatch(
                        apiSlice.util.updateQueryData("getTodo", undefined, (draft) => {
                            // console.log("draft", JSON.stringify(draft?.data));
                            let todo = draft?.data?.find((each) => each?._id === args?.id);
                            // console.log(todo);
                            todo.description = updatedTodo?.data?.description;
                            todo.status = updatedTodo?.data?.status;
                            todo.title = updatedTodo?.data?.title;
                        })
                    )

                    // // for only getEachTodo
                    // dispatch(
                    //     apiSlice.util.updateQueryData("getEachTodo", undefined, (draft) => {
                    //         let todo = draft?.data;
                    //         todo.description = updatedTodo?.data?.description;
                    //         todo.status = updatedTodo?.data?.status;
                    //         todo.title = updatedTodo?.data?.title;
                    //     })
                    // )

                } catch (error) {
                    console.log(error?.message)
                }
            }
        }),

        deleteTodo: builder.mutation({
            query: (data) => ({
                url: `todo/deleteTodo/${data?.id}`,
                method: "DELETE"
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    // console.log(args);
                    // here args the data which we send to server
                    dispatch(
                        apiSlice.util.updateQueryData("getTodo", undefined, (draft) => {
                            console.log("draft", JSON.stringify(draft?.data));
                            const newData = draft?.data?.filter((each) => each?._id !== args?.id);
                            // console.log(JSON.stringify(newData));
                            return newData;
                        })
                    )
                } catch (error) {
                    console.log(error?.message)
                }
            }
        }),

    })
})

export const { useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useGetEachTodoQuery, useGetTodoQuery } = todoApi;