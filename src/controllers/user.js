const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures")
const errors = require("../constants/errors");

const _ = require("lodash");
const bcrypt = require("bcryptjs");

exports.getAll = catchAsync(async (req, res, next) => {
    const features = await new ApiFeatures(User.find(), req.query)
        .filter()
        .sort()

    const users = await features.query

    res.status(200).json({
        success: true,
        data: users
    })
});

exports.get = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: user,
    });
});

exports.register = catchAsync(async (req, res, next) => {
    let user = new User(
        _.pick(req.body, ["fullName", "phone", "password", "role", "profession"])
    );

    const check = await User.findOne({ phone: req.body.phone });

    if (check) {
        return next(new AppError(400, errors.ALREADY_EXISTS));
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const saved = await user.save();
    res.status(200).json({
        success: true,
        data: { ...user.toJSON(), "token": user.genToken() },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ phone: req.body.phone })
        .select("+password")

    if (!user) {
        return next(new AppError(404, errors.NOT_FOUND));
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        return next(new AppError(400, errors.WRONG_INPUT));
    }

    res.status(200).json({
        success: true,
        data: { ...user.toJSON(), "token": user.genToken() },
    });
});

exports.update = catchAsync(async (req, res, next) => {
    delete req.body.password;

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: user,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id)

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    res.status(204).json({
        success: true,
        data: null
    })
});