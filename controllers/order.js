const Order = require("../models/Order");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const orders = await Order.find().lean();

    res.status(200).json({
        success: true,
        data: orders,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const orders = await Order.findById(req.params.id)
        .populate("current_user")
        .lean();

    if (!orders) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: orders,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const orders = await Order.create(req.body);

    res.status(201).json({
        success: true,
        data: orders,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const orders = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!orders) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: orders,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Order.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
