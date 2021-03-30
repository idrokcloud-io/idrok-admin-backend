const AppError = require("../utils/appError");
const errors = require("../constants/errors");

module.exports = function (req, res, next) {
    if (req.user.role != "admin") {
        return next(new AppError(401, errors.ACCESS_DENIED));
    }

    next();
};
