import { apiSlice } from "../api/apiSlice";
import { setTodo } from "./todoSlice";

export const todoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTodo: builder.mutation({
            query: (data) => ({
                url: "todo/addTodo",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Todos"],
        }),

        getTodo: builder.query({
            query: () => "todo/getTodo",
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setTodo({
                        todo: result?.data?.data
                    }))
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ["Todos"],
        }),

        getEachTodo: builder.query({
            query: (todoId) => `todo/getEach/${todoId}`,
            invalidatesTags: ["Todos"],
        }),

        updateTodo: builder.mutation({
            query: (data) => (console.log(data), {
                url: `todo/updateTodo/${data?.id}`,
                method: "PUT",
                body: data?.updatedData,
            }),
            invalidatesTags: ["Todos"],
        }),

        deleteTodo: builder.mutation({
            query: (data) => ({
                url: `todo/deleteTodo/${data?.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Todos"],
        }),
    })
})

export const { useGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useGetEachTodoQuery } = todoApi;