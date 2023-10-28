import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';


const userSignUp = (req, res, next) => {
    const {
        firstName,
        lastName,
        password,
        email,
        dob,
        age,
        schoolName,
        schoolContact,
        phone
    } = req.body;


    const query = { email };

    Model.UserModel.findOne(query)
        .then((user) => {
            if (user) {
                if (user.email == email) {
                    res.status(400);
                    next(new Error('Email Already Taken.'));
                }
            } else {
                bcryptjs.hash(password, 12).then((hashedpassword) => {
                    const User = new Model.UserModel({
                        firstName,
                        lastName,
                        email,
                        dob,
                        age,
                        schoolName,
                        schoolContact,
                        password: hashedpassword,
                        phone,
                        userType: 'user',
                    });
                    // console.log(User);
                    User.save()
                        .then((SavedUser) => {
                            console.log(SavedUser);
                            return res.status(200).send({
                                Message: 'Account Created Successfully.',
                                SavedUser,
                            });
                        })
                        .catch((err) => {
                            res.status(500);
                            next(
                                new Error(
                                    `Unable to Create User. Please Try later. ${err}`,
                                ),
                            );
                        });
                });
            }
        })
        .catch((err) => {
            res.status(500);
            next(new Error(err));
        });


};


export default userSignUp;