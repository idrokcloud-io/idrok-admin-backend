const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");
const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = function (req, res, next) {
    const token = req.header("x-token");

    if (!token) {
        return next(new AppError(401, errors.ACCESS_DENIED));
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (ex) {
        next(new AppError(400, errors.WRONG_INPUT));
    }
};
