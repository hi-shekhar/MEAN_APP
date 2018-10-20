const User = require('../model/user');
//const LoginTrouble = require('../model/loginTrouble');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const updateProfile = ['firstName', 'lastName', 'gender', 'email', 'dob', 'secretQuestion', 'secretAnswer'];
const bycrypt = require('bcrypt-nodejs');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'you must provide email' });
        }
        else if (!req.body.firstName) {
            res.json({ success: false, message: 'you must provide firstName' });
        }
        else if (!req.body.lastName) {
            res.json({ success: false, message: 'you must provide lastName' });
        }
        else if (!req.body.gender) {
            res.json({ success: false, message: 'you must provide gender' });
        }
        else if (!req.body.password) {
            res.json({ success: false, message: 'you must provide password' });
        }
        else {
            let registeredUser = new User({
                firstName: req.body.firstName.toLowerCase(),
                lastName: req.body.lastName.toLowerCase(),
                gender: req.body.gender,
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                dob: req.body.dob,
                secretQuestion: req.body.secretQuestion,
                secretAnswer: req.body.secretAnswer.toLowerCase()
            });

            registeredUser.save((err) => {
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: err.errmsg });
                    }
                    else if (err.errors) {
                        if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        }
                        else if (err.errors.firstName) {
                            res.json({ success: false, message: err.errors.firstName.message });
                        }
                        else if (err.errors.lastName) {
                            res.json({ success: false, message: err.errors.lastName.message });
                        }
                        else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        }
                        else if (err.errors.dob) {
                            res.json({ success: false, message: err.errors.dob.message });
                        }
                        // ,
                        // else if (err.errors.secretQuestion) {
                        //     res.json({ success: false, message: err.errors.secretQuestion.message });
                        // },
                        // else if (err.errors.password) {
                        //     res.json({ success: false, message: err.errors.secretAnswer.message });
                        // }
                    }
                    else {
                        res.json({ success: false, message: 'user registration failed', err })
                    }
                }
                else {
                    res.json({ success: true, message: 'user registered succesfully' });
                }
            })
        }

    });

    router.post('/getEmail', (req, res) => {
        if (!req.body.dob) {
            res.json({ success: false, message: 'dob is not provided' });
        }
        else if (!req.body.secretQuestion) {
            res.json({ success: false, message: 'secret question not provided' });
        }
        else if (!req.body.secretAnswer) {
            res.json({ success: false, message: 'secret answer not provided' });
        }
        else {
            User.find({ dob: req.body.dob }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user.length) {
                        res.json({ success: false, message: 'Given dob not present in database' });
                    } else {
                        let filteredUser = user.filter((data) => data.secretAnswer === req.body.secretAnswer);
                        if (filteredUser.length) {
                            res.json({
                                success: true,
                                message: 'success',
                                email: filteredUser[0].email
                            });
                        }
                        else {
                            res.json({ success: false, message: 'security annswer is wrong' });
                        }
                    }
                }
            })
        }
    });
    router.put('/resetPassword', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'email not provided' });
        }
        else if (!req.body.password) {
            res.json({ success: false, message: 'password not provided' });
        }
        else {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: 'email id is invalid' });
                    }
                    else {
                        user.password = req.body.password;
                        user.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: err });
                            }
                            else {
                                res.json({ success: true, message: 'Password has been successfully reset' });
                            }
                        })
                    }
                }

            })
        }
    });
    router.get('/getGender/:param', (req, res) => {
        if (!req.params.param) {
            res.json({ success: false, message: 'email not provided' });
        }
        else {
            User.findOne({ email: req.params.param }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: 'email id is invalid' });
                    }
                    else {
                        res.json({ success: true, message: user.gender });
                    }
                }
            })
        }
    });
    router.post('/login', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'user email not provided' });
        }
        else if (!req.body.password) {
            res.json({ success: false, message: 'password not provided' });
        }
        else {
            //Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});

            User.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    if (!user) {
                        res.json({ success: false, message: 'email not present in database' });
                    }
                    else {
                        const isPasswordValid = user.comparePsssword(req.body.password);
                        if (!isPasswordValid) {
                            res.json({ success: false, message: 'password not matched' });
                        }
                        else {
                            // const token = jwt.sign({ userId: user._id }, config.secret, { algorithm: 'RS256'});
                            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                            res.json({
                                success: true,
                                message: 'Logged In Successfully',
                                token: token,
                                user: {
                                    FirstName: user.firstName,
                                    LastName: user.lastName,
                                    Gender: user.gender
                                }
                            })
                        }
                    }
                }
            })
        }
    });

    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/getProfile', (req, res) => {
        console.log(req.decoded.userId);
        if (!req.decoded.userId) {
            res.json({ success: false, message: 'Could not fetch profile' });
        }
        else {
            User.findById(req.decoded.userId, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Could not find Profile' });
                    }
                    else {
                        res.json({
                            success: true,
                            userDetails: {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                gender: user.gender,
                                email: user.email,
                                dob: user.dob,
                                secretQuestion: user.secretQuestion,
                                secretAnswer: user.secretAnswer
                            }
                        })
                    }
                }
            })
        }
    });

    router.put('/updateProfile', (req, res) => {
        updateProfile.forEach(element => {
            if (!req.body[element]) {
                res.json({ success: false, message: 'please enter correct' + element });
            };
        });
        if (!req.decoded.userId) {
            res.json({ success: false, message: 'Could not fetch profile' });
        } else {
            const updateObj = {};
            updateProfile.forEach(element => {
                updateObj[element] = req.body[element];
            });
            User.findByIdAndUpdate(req.decoded.userId, { $set: updateObj }, { new: true }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: 'err' });
                } else {
                    res.json({
                        success: true, message: 'Profile has been successfully Updated', updatedProfile: {
                            FirstName: user.firstName,
                            LastName: user.lastName,
                            Gender: user.gender
                        }
                    });
                }
            })
        }
    });

    router.put('/changePassword', (req, res) => {
        if (!req.decoded.userId) {
            res.json({ success: false, message: 'Could not fetch user data' });
        }
        else {

            // User.findByIdAndUpdate(req.decoded.userId, { $set: updateObj }, { new: true }, function (err, user) {
            //     if (err) {
            //         res.json({ success: false, message: 'err' });
            //     } else {
            //         res.json({ success: true, message: 'Profile has been successfully Updated', updatedProfile: user });
            //     }
            // })

            if (!req.body.password) {
                res.json({ success: false, message: 'password not provided' });
            }
            else {
                User.findById(req.decoded.userId, function (err, user) {
                    if (err) {
                        res.json({ success: false, message: err });
                    }
                    else {
                        if (!user) {
                            res.json({ success: false, message: 'user not found' });
                        }
                        else {
                            user.password = req.body.password;
                            user.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: err });
                                }
                                else {
                                    res.json({ success: true, message: 'Password has been successfully reset' });
                                }
                            })
                        }
                    }
    
                })
            }
        }
    });


    return router;
}