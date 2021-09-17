import React, { createContext, useState } from 'react';
import AddNewUserForm from '../organizms/AddNewUserForm';
import DeleteExistingUser from '../organizms/DeleteExistingUser';
import ShowExistingUsers from '../organizms/ShowExistingUsers';

export const DataFromDBContext = createContext();

const Main = () => {
  const [dataFromDB, setDataFromDB] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <DataFromDBContext.Provider
      value={{ dataFromDB, setDataFromDB, loading, setLoading }}
    >
      <main>
        <hr />
        <ShowExistingUsers />
        <hr />
        <AddNewUserForm />
        <hr />
        <DeleteExistingUser />
        <hr />
      </main>
    </DataFromDBContext.Provider>
  );
};

export default Main;
