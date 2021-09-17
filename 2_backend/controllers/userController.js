import { UserModel } from '../models/userModel.js';

// GET ALL FROM USERS COLLECTION
export const getAllUsers = (req, res) => {
  UserModel.find()
    .then((data) => res.json())
    .catch((err) => console.log(err));
};

// POST NEW USER TO DB
export const postNewUser = (req, res) => {
  const newUser = new UserModel(req.body);

  UserModel.find().then((result) => {
    const userExists = result.some(
      (userInDB) => userInDB.email === req.body.email
    );
    if (userExists) {
      res.json({
        status: 'failed',
        message: 'User with given email already exists',
      });
    } else {
      newUser
        .save()
        .then((data) =>
          res.json({
            status: 'success',
            message: 'User successfuly added to db',
          })
        )
        .catch((err) => console.log(err));
    }
  });

  // ---------------------------
};
