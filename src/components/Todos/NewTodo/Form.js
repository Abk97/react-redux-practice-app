import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import classes from "./NewTodo.module.css";

const isEmpty = (value) => value.trim() === "";

function NewTodoForm({ onClose, addTodo }) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    date: true,
    time: true,
  });
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  const SubmitData = ({ date, time }) => {
    addTodo({ date, time });
    onClose();
  };

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;

    const enteredDateIsValid = !isEmpty(enteredDate);
    const enteredTimeIsValid = !isEmpty(enteredTime);

    setFormInputsValidity({
      date: enteredDateIsValid,
      time: enteredTimeIsValid,
    });
    const formIsValid = enteredDateIsValid && enteredTimeIsValid;
    if (!formIsValid) {
      return;
    }
    SubmitData({
      date: enteredDate.trim(),
      time: enteredTime.trim(),
    });
  };

  const dateControlClasses = `${classes.control} ${
    formInputsValidity.date ? "" : classes.invalid
  }`;
  const timeControlClasses = `${classes.control} ${
    formInputsValidity.time ? "" : classes.invalid
  }`;

  return (
    <Modal show onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={dateControlClasses}>
          <label htmlFor="date">Date (Required)</label>
          <input type="date" id="date" required ref={dateInputRef} />
          {!formInputsValidity.date && <p>Please enter a valid date!</p>}
        </div>
        <div className={timeControlClasses}>
          <label htmlFor="time">Time (Required)</label>
          <input type="time" id="time" required ref={timeInputRef} />
          {!formInputsValidity.time && <p>Please enter a valid time!</p>}
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

export default NewTodoForm;
