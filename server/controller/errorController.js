const AppError = require('./../utils/appError');

exports.globalErrorHandler = (err, req, res, next) => {
    //console.log(err.name);
    if (err.name === "ValidationError") {
        const validationErr = new AppError(err.message, 400);
        err = validationErr;
    }
    if (err.name === "CastError") {
        const newError = new AppError('invalid id  of todo ', 400);
        //err.status = 
        // err.message = 

        err = newError;
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error"
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};