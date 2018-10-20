const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bycrypt = require('bcrypt-nodejs');

let firstNameLengthCheck = (firstName) => {
    if (!firstName) {
        return false;
    }
    else {
        if (firstName.length < 3 || firstName.length > 10) {
            return false;
        }
        else {
            return true;
        }
    }
};

let firstNameFormatCheck = (firstName) => {
    if (!firstName) {
        return false;
    }
    else {
        const fNExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return fNExp.test(firstName);
    }
}

let lastNameLengthCheck = (lastName) => {
    if (!lastName) {
        return false;
    }
    else {
        if (lastName.length < 3 || lastName.length > 10) {
            return false;
        }
        else {
            return true;
        }
    }
};

let lastNameFormatCheck = (lastName) => {
    if (!lastName) {
        return false;
    }
    else {
        const lNExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return lNExp.test(lastName);
    }
}

let emailLengthCheck = (email) => {
    if (!email) {
        return false;
    }
    else {
        if (email.length < 3 || email.length > 30) {
            return false;
        }
        else {
            return true;
        }
    }
};

let emailFormatCheck = (email) => {
    if (!email) {
        return false;
    }
    else {
        const emailExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailExp.test(email);
    }
}

let passwordLengthCheck = (password) => {
    if (!password) {
        return false;
    }
    else {
        if (password.length < 8 || password.length > 10) {
            return false;
        }
        else {
            return true;
        }
    }
};

let passwordFormatCheck = (password) => {
    if (!password) {
        return false;
    }
    else {
        //min 8 letter password, with at least a symbol, upper and lower case letters and a number
        const passwordExp = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
        return passwordExp.test(password);
    }
}

const firstNameValidators = [
    {
        validator: firstNameLengthCheck,
        message: "FirstName min-length 3 and max-length 10"
    },
    {
        validator: firstNameFormatCheck,
        message: "FirstName format is not valid"
    }
];

const lastNameValidators = [
    {
        validator: lastNameLengthCheck,
        message: "LastName min-length 3 and max-length 10"
    },
    {
        validator: lastNameFormatCheck,
        message: "LastName format is not valid"
    }
];

const emailValidators = [
    {
        validator: emailLengthCheck,
        message: "email min length 3 and max length 30"
    },
    {
        validator: emailFormatCheck,
        message: "email format is not valid"
    }
];

const passwordValidators = [
    {
        validator: passwordLengthCheck,
        message: "password min length 8 and max length 10"
    },
    {
        validator: passwordFormatCheck,
        message: "password format is not valid"
    }
];


const registerUserSchema = new Schema({
    firstName: { type: String, required: true, validate: firstNameValidators },
    lastName: { type: String, required: true, validate: lastNameValidators },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: emailValidators },
    password: { type: String, required: true, validate: passwordValidators },
    dob: { type: Date, required: true },
    secretQuestion: { type: String, required: true },
    secretAnswer: { type: String, required: true }
});

registerUserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    else {
        bycrypt.hash(this.password, null, null, (err, hash) => {
            if (err) { return next(err) }
            else {
                this.password = hash;
                next();
            }
        })
    }
})

registerUserSchema.methods.comparePsssword = function (password) {
    return bycrypt.compareSync(password, this.password);
}


//module.exports = mongoose.model('loginUser',loginUserSchema);  
module.exports = mongoose.model('RegisterUser', registerUserSchema);