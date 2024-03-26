import { apiSlice } from "../api/apiSlice";

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

export const { useLazyGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useGetEachTodoQuery } = todoApi;