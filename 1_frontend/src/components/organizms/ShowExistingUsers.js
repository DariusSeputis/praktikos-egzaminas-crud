import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';

import { DataFromDBContext } from '../templates/Main';

const ShowExistingUsers = () => {
  const { dataFromDB, setDataFromDB, loading, setLoading } =
    useContext(DataFromDBContext);

  // Hooks
  // - State
  // -- Local
  const [fetchingError, setFetchingError] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/users')
      .then((res) => {
        setDataFromDB(res.data);
      })
      .catch((err) => setFetchingError(err))
      .finally(() => {
        !fetchingError ? setLoading(false) : console.log(fetchingError);
      });
  }, [fetchingError, setDataFromDB, setLoading]);

  return loading ? (
    <div>Loading..</div>
  ) : (
    <div className='cards'>
      {dataFromDB.map((user) => (
        <div key={user._id} className='card'>
          <span>{user.name}</span>
          <span>{user.age}</span>
          <span>{user.email}</span>
        </div>
      ))}
    </div>
  );
};

export default ShowExistingUsers;
