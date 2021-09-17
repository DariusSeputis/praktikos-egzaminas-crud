import React, { useContext } from 'react';
import axios from 'axios';

import { DataFromDBContext } from '../templates/Main';

const DeleteExistingUser = () => {
  const { dataFromDB, setDataFromDB } = useContext(DataFromDBContext);

  return (
    <div>
      <select name='users'>
        {dataFromDB.map((user) => (
          <option key={user._id} value={user.email}>
            {user.name}, {user.email}
          </option>
        ))}
      </select>
      <button>Delete user</button>
    </div>
  );
};

export default DeleteExistingUser;
