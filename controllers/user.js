const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

const _ = require("lodash");
const bcrypt = require("bcryptjs");

exports.getAll = catchAsync(async (req, res, next) => {
    const users = await User.find().lean();

    res.status(200).json({
        success: true,
        data: users,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).lean();

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: user,
    });
});

exports.register = catchAsync(async (req, res, next) => {
    let user = new User(
        _.pick(req.body, ["fullName", "phone", "password", "role"])
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
        .populate("liked")
        .populate("cart")
        .populate("comparison");

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
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});

// Additional features like cart, liked, comparison
exports.changeCart = catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id);
    console.log(user)

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    const updateUser = await Product.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    res.status(200).json({
        success: true,
        data: user
    })
});

exports.changeLiked = catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id);

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    user.liked = req.body.liked;
    user = await user.save();

    res.status(200).json({
        success: true,
        data: user,
    });
});

exports.changeComparison = catchAsync(async (req, res, next) => {
    let user = await User.findById(req.user._id);

    if (!user) return next(new AppError(404, errors.NOT_FOUND));

    user.comparison = req.body.comparison;
    user = await user.save();

    res.status(200).json({
        success: true,
        data: user,
    });
});
