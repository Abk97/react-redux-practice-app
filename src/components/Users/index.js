import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NewUser from "./NewUser";
import TableView from "./TableView";
import EditUserForm from "./EditUser/Form";
import { usersActions } from "../../store/users-slice";
import classes from "./Users.module.css";

function UsersPage() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const [editingData, setEditingData] = useState(null);
  const isEditing = !!editingData?.id;

  const addUserHandler = (user) => {
    dispatch(usersActions.addUser(user));
  };

  const removeUserHandler = (id) => {
    dispatch(usersActions.removeUser(id));
  };

  const editUserHandler = (userId, newData) => {
    dispatch(usersActions.updateUser({ userId, newData }));
  };

  return (
    <div className={classes.pageContainer}>
      <NewUser addUser={addUserHandler} />
      <TableView
        data={users}
        onRemove={removeUserHandler}
        onEdit={(user) => setEditingData(user)}
      />
      {isEditing && (
        <EditUserForm
          onClose={() => setEditingData(null)}
          data={editingData}
          onSubmit={editUserHandler}
        />
      )}
    </div>
  );
}

export default UsersPage;
