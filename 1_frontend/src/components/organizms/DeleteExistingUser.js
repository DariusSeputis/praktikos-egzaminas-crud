import React, { useContext, useState } from 'react';
import axios from 'axios';

import { DataFromDBContext } from '../templates/Main';

const DeleteExistingUser = () => {
  const { dataFromDB, setDataFromDB, loading, setLoading } =
    useContext(DataFromDBContext);
  // Hooks
  // - State
  // -- Local
  const [selectValue, setSelectValue] = useState('');

  // CUSTOM FUNCTION
  const deleteUserFromDB = () => {
    console.log(selectValue);
    axios
      .delete(`http://127.0.0.1:5000/deleteUser/${selectValue}`)
      .then((res) => setDataFromDB(res.data.usersData))
      .catch((err) => console.log(err));
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
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
      <button
        onClick={() => {
          if (!selectValue || selectValue === 'user') {
            alert('Pleace select user');
          } else {
            deleteUserFromDB();
          }
        }}
      >
        Delete user
      </button>
    </div>
  );
};

export default DeleteExistingUser;
