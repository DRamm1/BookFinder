/* This is importing the createUser function from the API.js file, the Auth.js file, the React library,
the Form, Button, and Alert components from the react-bootstrap library. */
import { createUser } from '../utils/API';
import Auth from '../utils/auth';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

/**
 * We're creating a function called CreateAccount that returns a form that allows a user to create an
 * account
 */
const CreateAccount = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

/**
 * The function takes in an event, and then sets the userFormData state to the current userFormData
 * state, plus the name and value of the event target
 * @param event - the event that is triggered when the input is changed
 */
  const ChangeInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

/**
 * The function is called when the form is submitted. It prevents the default action of the form
 * submission, which is to reload the page. It then checks to see if the form is valid. If it is not
 * valid, it prevents the default action and stops the propagation of the event.
 * @param event - The event that triggered the function.
 */
  const SubmitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    /* This is a try/catch block. It is trying to create a user with the userFormData. If it is not
    successful, it throws an error. */
    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('Something did not work!');
      }

      /* This is a try/catch block. It is trying to create a user with the userFormData. If it is not
      successful, it throws an error. */
      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };


  return (
    <>
      {}
      <Form noValidate validated={validated} onSubmit={SubmitForm}>
        {}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        { /* This is a form group that is taking in the username, and it is setting the type to text,
        the placeholder to username, the name to username, the onChange to ChangeInput, the value to
        userFormData.username, and it is required. */ }
        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='username'
            name='username'
            onChange={ChangeInput}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is needed!</Form.Control.Feedback>
        </Form.Group>

        {/* This is a form group that is taking in the email, and it is setting the type to email,
        the placeholder to email address, the name to email, the onChange to ChangeInput, the value
        to
        userFormData.email, and it is required.  */}
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='email address'
            name='email'
            onChange={ChangeInput}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is needed!</Form.Control.Feedback>
        </Form.Group>

        {/* This is a form group that is taking in the password, and it is setting the type to password, 
        the placeholder to Your password, the name to password, the onChange to ChangeInput, 
        the value to userFormData.password, and it is required.  */}
        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={ChangeInput}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is needed!</Form.Control.Feedback>
        </Form.Group>
        {/* This is a button that is disabled if the username, email, and password are not filled out.  */}
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

/* Exporting the CreateAccount function. */
export default CreateAccount;