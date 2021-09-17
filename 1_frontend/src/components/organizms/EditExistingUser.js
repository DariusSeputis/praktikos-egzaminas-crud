import React, { useState, useContext } from 'react';
import axios from 'axios';

import { DataFromDBContext } from '../templates/Main';

const EditExistingUser = () => {
  // Context
  const { dataFromDB, setDataFromDB, loading } = useContext(DataFromDBContext);
  // Hooks
  // -- state
  // ---- local
  const [selectValue, setSelectValue] = useState('');
  const [updateUserName, setUpdateUserName] = useState('');
  const [updateUserAge, setUpdateUserAge] = useState('');
  const [updateUserEmail, setUpdateUserEmail] = useState('');
  const [updateUserPassword, setUpdateUserPassword] = useState('');

  // Custom function
  const insertUserInfo = () => {
    let userToupdate = dataFromDB.filter((item) => item._id === selectValue);
    setUpdateUserName(userToupdate[0].name);
    setUpdateUserAge(userToupdate[0].age);
    setUpdateUserEmail(userToupdate[0].email);
    setUpdateUserPassword(userToupdate[0].password);
  };
  const updateUser = (e) => {
    e.preventDefault();

    let updatedUser = {
      name: updateUserName,
      age: updateUserAge,
      email: updateUserEmail,
      password: updateUserPassword,
    };
    axios
      .put(`http://127.0.0.1:5000/editUser/${selectValue}`, updatedUser)
      .then((res) => {
        if (res.data.status === 'success') setDataFromDB(res.data.usersData);
      })
      .catch((err) => console.log(err));
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>Update existing user</h2>
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        name='users'
      >
        <option value='user' default>
          Chose User
        </option>
        {dataFromDB.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}, {user.email}
          </option>
        ))}
      </select>
      <br />
      <button
        onClick={() => {
          if (!selectValue || selectValue === 'user') {
            alert('Pleace select user');
          } else {
            insertUserInfo();
          }
        }}
      >
        Insert user info to update
      </button>

      <form onSubmit={updateUser}>
        <label htmlFor='updateUserName'>Name: </label>
        <input
          type='text'
          value={updateUserName}
          required
          onChange={(e) => setUpdateUserName(e.target.value)}
        />

        <br />
        <label htmlFor='updateUserAge'>Age: </label>
        <input
          type='text'
          value={updateUserAge}
          required
          onChange={(e) => setUpdateUserAge(e.target.value)}
        />

        <br />
        <label htmlFor='updateUserEmail'>Email: </label>
        <input
          type='email'
          value={updateUserEmail}
          required
          onChange={(e) => setUpdateUserEmail(e.target.value)}
        />

        <br />
        <label htmlFor='updateUserPassword'>Password: </label>
        <input
          type='password'
          value={updateUserPassword}
          required
          onChange={(e) => setUpdateUserPassword(e.target.value)}
        />

        <br />
        <input type='submit' value='Update' />
      </form>
    </div>
  );
};

export default EditExistingUser;
