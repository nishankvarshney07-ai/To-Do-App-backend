
const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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

    },
     passwordResetToken:{
        type : String
     },
     passwordResetExpires: {
        type: Date
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
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 10
        );
        return JWTTimestamp < changedTimestamp
    }
    return false;
}
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.createPasswordResetToken = function(){
    //randombytes -> random token banata hai
    //crypto.randombytes(32)
    //createhash->existing token ka hash banata hai
    const resetToken = crypto.randomBytes(32).toString('Hex');
    this.passwordResetToken = crypto         //
    .createHash('sha256')    //sha-256 hashing algorithm use karke ek hash operation start karo 
    .update(resetToken)
    .digest('hex');   //ye hashed result ko hexadecimal string ke form mai return krta h 

    this.passwordReseteExpires = Date.now() + 10*60*100;
    return resetToken;
    
};
//forgotpassword 


const User = mongoose.model('User', userSchema);
module.exports = User;