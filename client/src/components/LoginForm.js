/* Importing the loginUser function from the API.js file, the Auth.js file, the React
library, the Form, Button, and Alert components from the react-bootstrap library. */
import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const FormLogin = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  /**
   * When the user types in the input field, the value of the input field is set to the value of the
   * userFormData state.
   * @param event - the event that is triggered when the input is changed
   */
  const ChangeInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  /**
   * The function is called when the form is submitted. It prevents the default action of the form
   * submission, which is to reload the page.
   * @param event - The event object that is passed to the function.
   */
  const SubmitForm = async (event) => {
    event.preventDefault();

    /* Checking if the form is valid. If it is not valid, it will prevent the default action of the
    form submission, which is to reload the page. */
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    /* Checking if the response is ok. If it is not ok, it will throw an error. */
    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error("There is something wrong!");
      }

      /* Destructuring the response.json() object. */
      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    /* Setting the state of the userFormData to an empty object. */
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    /* This is the form that is rendered on the page. It is a form that has a submit button. When the
      submit button is clicked, the SubmitForm function is called. The SubmitForm function prevents
      the default action of the form submission, which is to reload the page. It then checks if the
      form is valid. If it is not valid, it will prevent the default action of the form submission,
      which is to reload the page. It then checks if the response is ok. If it is not ok, it will
      throw an error. If the response is ok, it will destruct the response.json() object. It will
      then call the login function from the Auth.js file and pass the token as an argument. It will
      then set the state of the userFormData to an empty object. */
    <>
      <Form noValidate validated={validated} onSubmit={SubmitForm}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert}>
          Your credentials are invalid. Please try again!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor="email">E-mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={ChangeInput}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is needed!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={ChangeInput}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is needed!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
/* The above is the form that is rendered on the page. It is a form that has a submit button. When
the
submit button is clicked, the SubmitForm function is called. The SubmitForm function
prevents
the default action of the form submission, which is to reload the page. It then checks if
the
form is valid. If it is not valid, it will prevent the default action of the form
submission,
which is to reload the page. It then checks if the response is ok. If it is not ok, it will
throw an error. If the response is ok, it will destruct the response.json() object. It will
then call the login function from the Auth.js file and pass the token as an argument. It
will
then set the state of the userFormData to an empty object. */

/* Exporting the FormLogin function as the default export. */
export default FormLogin;
