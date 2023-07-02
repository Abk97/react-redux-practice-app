import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NewTodo from "./NewTodo";
import TableView from "./TableView";
import EditTodoForm from "./EditTodo/Form";
import { todosActions } from "../../store/todos-slice";
import classes from "./Todos.module.css";

function TodosPage() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);
  const [editingData, setEditingData] = useState(null);
  const isEditing = !!editingData?.id;

  const addTodoHandler = (todo) => {
    dispatch(todosActions.addTodo(todo));
  };

  const removeTodoHandler = (id) => {
    dispatch(todosActions.removeTodo(id));
  };

  const editTodoHandler = (todoId, newData) => {
    dispatch(todosActions.updateTodo({ todoId, newData }));
  };

  return (
    <div className={classes.pageContainer}>
      <NewTodo addTodo={addTodoHandler} />
      <TableView
        data={todos}
        onRemove={removeTodoHandler}
        onEdit={(todo) => setEditingData(todo)}
      />
      {isEditing && (
        <EditTodoForm
          onClose={() => setEditingData(null)}
          data={editingData}
          onSubmit={editTodoHandler}
        />
      )}
    </div>
  );
}

export default TodosPage;
