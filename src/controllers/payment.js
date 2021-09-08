const Payment = require("../models/Payment");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const payments = await Payment.find();

    res.status(200).json({
        success: true,
        data: payments,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id);

    if (!payment) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: payment,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const payment = await Payment.create(req.body);

    res.status(201).json({
        success: true,
        data: payment,
    });
});


exports.update = catchAsync(async (req, res, next) => {
    delete req.body.password;

    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!payment) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: payment,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Payment.findByIdAndDelete(req.user.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});