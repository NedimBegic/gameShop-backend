"use strict";
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    res
        .status(error.statusCode || 500)
        .json({ success: false, message: error.message || "Server Error" });
};
module.exports = errorHandler;
