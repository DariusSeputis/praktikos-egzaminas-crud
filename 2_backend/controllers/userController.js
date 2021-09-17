import { UserModel } from '../models/userModel.js';

// GET ALL FROM USERS COLLECTION
export const getAllUsers = (req, res) => {
  UserModel.find()
    .then((data) => res.json(data))
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
          UserModel.find()
            .then((data) =>
              res.json({
                usersData: data,
                status: 'success',
                message: 'User added successfuly',
              })
            )
            .catch((err) => console.log(err))
        )
        .catch((err) => console.log(err));
    }
  });
};

// DELETE SINGLE USER FROM DB BASED ON ITS ID
export const deleteSingleUser = (req, res) => {
  const userId = req.params.id;

  UserModel.findByIdAndDelete(userId)
    .then((response) => {
      UserModel.find()
        .then((data) =>
          res.json({
            usersData: data,
            message: 'User succesfully deleted from DB',
          })
        )
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log(err));
};
