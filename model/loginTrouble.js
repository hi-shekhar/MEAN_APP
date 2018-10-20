const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


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

const emailFoundValidators = [
    {
        validator: emailLengthCheck,
        message: "email min length 3 and max length 30"
    },
    {
        validator: emailFormatCheck,
        message: "email format is not valid"
    }
];
const loginTroubleSchema = new Schema({
    emailFound: { type: String, required: true, unique: true, validate: emailFoundValidators },
    userPassword: { type: String, required: true }
});

module.exports = mongoose.model('LoginTrouble',loginTroubleSchema);