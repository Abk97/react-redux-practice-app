import { useState } from "react";
import NewTodoForm from "./Form";
import Button from "react-bootstrap/Button";
import classes from "./NewTodo.module.css";

function NewTodo({ addTodo }) {
  const [showForm, setShowForm] = useState(false);

  const hideFormHandler = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && <NewTodoForm onClose={hideFormHandler} addTodo={addTodo} />}
      <div className={classes.padding_bottom_20}>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Create Todo
        </Button>
      </div>
    </>
  );
}

export default NewTodo;
