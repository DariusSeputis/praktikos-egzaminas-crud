import { UserModel } from '../models/userModel.js';

// GET ALL FROM USERS COLLECTION
export const getAllUsers = (req, res) => {
  UserModel.fird()
    .then((data) => res.json())
    .catch((err) => console.log(err));
};
