import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allTodo: [],
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodo: (state, action) => {
            state.allTodo = action.payload.todo
        },
        deleteTodoCache: (state, action) => {
            const allTodo = state.allTodo.filter((each) => each?._id !== action.payload.todoId)
            state.allTodo = allTodo;
        }
    }
})
export const { setTodo, deleteTodoCache } = todoSlice.actions;
export default todoSlice.reducer;