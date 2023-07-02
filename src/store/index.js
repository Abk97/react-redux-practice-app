import { configureStore } from "@reduxjs/toolkit";

import usersSlice from "./users-slice";
import todosSlice from "./todos-slice";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export default store;
