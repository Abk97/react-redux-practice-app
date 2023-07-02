import { createSlice } from "@reduxjs/toolkit";

import { INITIAL_USERS } from "./constants";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: INITIAL_USERS,
  },
  reducers: {
    addUser(state, action) {
      const { users } = state;
      const newUser = action.payload;
      // const { email } = newUser || {};
      // const isEmailTaken = users.some((user) => user.email === email);
      // if (isEmailTaken) {
      //   return;
      // }
      const latestUserId = users[users.length - 1]?.id + 1 || 1;
      newUser.id = latestUserId;
      users.push(newUser);
    },
    removeUser(state, action) {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
    updateUser(state, action) {
      const { users } = state;
      const { userId, newData } = action.payload;
      const { name, email } = newData || {};
      // const isEmailTaken = users.some((user) => user.email === email);
      // if (isEmailTaken) {
      //   return;
      // }
      const existingUserIndex = users.findIndex((user) => user.id === userId);
      const existingUser = users[existingUserIndex];
      if (existingUser) {
        const updatedUser = { ...existingUser, name, email };
        users[existingUserIndex] = updatedUser;
      }
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice;
