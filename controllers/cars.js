const Car = require("../models/Car");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const cars = await Car.find().lean();

    res.status(200).json({
        success: true,
        data: cars,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const car = await Car.findById(req.params.id)
        .populate("brand")
        .populate("products")
        .lean();

    if (!car) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: car,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const car = await Car.create(req.body);

    res.status(201).json({
        success: true,
        data: car,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!car) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: car,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Car.findByIdAndDelete(req.params.id);
    res.status(204).json({
        success: true,
        data: null,
    });
});
