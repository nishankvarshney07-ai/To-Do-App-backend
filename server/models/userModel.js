
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name ']
    },
    email: {
        type: String,
        required: [true, 'please provide a eemail'],
        validate: [validator.isEmail, 'please provide a valid email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please provide confirm password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'passwords are not same'
        }

    }

});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    this.passwordChangedAt = new Date(Date.now() - 1000);

});
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000,10
        );
        return JWTTimestamp < changedTimestamp
    }
    return false;
}


const User = mongoose.model('User', userSchema);
module.exports = User;