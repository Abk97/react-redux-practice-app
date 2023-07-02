import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import classes from "./NewUser.module.css";

const isEmpty = (value) => value.trim() === "";

function NewUserForm({ onClose, addUser }) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    email: true,
  });
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const SubmitData = ({ name, email }) => {
    addUser({ name, email });
    onClose();
  };

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredEmailIsValid =
      !isEmpty(enteredEmail) && enteredEmail.includes("@");

    setFormInputsValidity({
      name: enteredNameIsValid,
      email: enteredEmailIsValid,
    });
    const formIsValid = enteredNameIsValid && enteredEmailIsValid;
    if (!formIsValid) {
      return;
    }
    SubmitData({
      name: enteredName.trim(),
      email: enteredEmail.trim(),
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputsValidity.email ? "" : classes.invalid
  }`;

  return (
    <Modal show onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={nameControlClasses}>
          <label htmlFor="name">Name (Required)</label>
          <input type="text" id="name" required ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">Email (Required)</label>
          <input type="email" id="email" required ref={emailInputRef} />
          {!formInputsValidity.email && <p>Please enter a valid email!</p>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={confirmHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewUserForm;
