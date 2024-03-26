import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoRefetch: false,
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoRefetch: (state) => {
            state.todoRefetch = true;
        },
    }
})
export const { setTodoRefetch } = todoSlice.actions;
export default todoSlice.reducer;