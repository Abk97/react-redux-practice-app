import React from "react";
import UsersPage from "./components/Users";
import TodosPage from "./components/Todos";
import { Routes, Route, NavLink } from "react-router-dom";
import classes from "./styles.module.css";

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <nav className={classes.navbar}>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              isActive ? classes.activeStyle : undefined
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? classes.activeStyle : undefined
            }
          >
            Users
          </NavLink>
        </nav>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="*" element={<UsersPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
