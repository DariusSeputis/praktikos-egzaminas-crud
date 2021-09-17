import React, { useState, useContext } from 'react';
import axios from 'axios';

import { DataFromDBContext } from '../templates/Main';

const AddNewUserForm = () => {
  // Context
  const { setDataFromDB } = useContext(DataFromDBContext);
  // Hooks
  // -- state
  // ---- local
  const [message, setMessage] = useState('');
  const [createUserName, setCreateUserName] = useState('');
  const [createUserAge, setCreateUserAge] = useState('');
  const [createUserEmail, setCreateUserEmail] = useState('');
  const [createUserPassword, setCreateUserPassword] = useState('');
  const [createUserConfirmPassword, setCreateUserConfirmPassword] =
    useState('');

  // custom functions
  const createUser = (e) => {
    e.preventDefault();

    if (createUserPassword !== createUserConfirmPassword) {
      setMessage('Passwords do not match');
      setCreateUserPassword('');
      setCreateUserConfirmPassword('');
      return;
    }
    let newUser = {
      name: createUserName,
      age: createUserAge,
      email: createUserEmail,
      password: createUserPassword,
    };
    axios
      .post('http://127.0.0.1:5000/addUser', newUser)
      .then((res) => {
        if (res.data.status === 'success') setDataFromDB(res.data.usersData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Add new user</h2>
      <form onSubmit={createUser}>
        <label htmlFor='createUserName'>Name: </label>
        <input
          type='text'
          value={createUserName}
          required
          onChange={(e) => setCreateUserName(e.target.value)}
        />
        <br />
        <label htmlFor='createUserAge'>Age: </label>
        <input
          type='text'
          value={createUserAge}
          required
          onChange={(e) => setCreateUserAge(e.target.value)}
        />
        <br />
        <label htmlFor='createUserEmail'>Email: </label>
        <input
          type='email'
          value={createUserEmail}
          required
          onChange={(e) => setCreateUserEmail(e.target.value)}
        />
        <br />
        <label htmlFor='createUserPassword'>Password: </label>
        <input
          type='password'
          value={createUserPassword}
          required
          onChange={(e) => setCreateUserPassword(e.target.value)}
        />
        <br />
        <label htmlFor='createUserConfirmPassword'>Confirm Password: </label>
        <input
          type='password'
          value={createUserConfirmPassword}
          required
          onChange={(e) => setCreateUserConfirmPassword(e.target.value)}
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
      <span>{message}</span>
    </div>
  );
};

export default AddNewUserForm;
