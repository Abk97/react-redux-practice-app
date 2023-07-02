import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_TODOS } from "./constants";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: INITIAL_TODOS,
  },
  reducers: {
    addTodo(state, action) {
      const { todos } = state;
      const newTodo = action.payload;
      const latestTodoId = todos[todos.length - 1]?.id + 1 || 1;
      newTodo.id = latestTodoId;
      todos.push(newTodo);
    },
    removeTodo(state, action) {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    updateTodo(state, action) {
      const { todos } = state;
      const { todoId, newData } = action.payload;
      const { date, time } = newData || {};
      const existingTodoIndex = todos.findIndex((todo) => todo.id === todoId);
      const existingTodo = todos[existingTodoIndex];
      if (existingTodo) {
        const updatedTodo = { ...existingTodo, date, time };
        todos[existingTodoIndex] = updatedTodo;
      }
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice;
