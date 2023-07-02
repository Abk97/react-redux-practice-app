import { useState } from "react";
import NewUserForm from "./Form";
import Button from "react-bootstrap/Button";
import classes from "./NewUser.module.css";

function NewUser({ addUser }) {
  const [showForm, setShowForm] = useState(false);

  const hideFormHandler = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && <NewUserForm onClose={hideFormHandler} addUser={addUser} />}
      <div className={classes.padding_bottom_20}>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          Create User
        </Button>
      </div>
    </>
  );
}

export default NewUser;
