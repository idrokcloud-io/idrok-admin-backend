const Brand = require("../models/Brand");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const brands = await Brand.find().lean();

    res.status(200).json({
        success: true,
        data: brands,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
        .populate("cars")
        .populate("products")
        .lean();

    if (!brand) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: brand,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const brand = await Brand.create(req.body);

    res.status(201).json({
        success: true,
        data: brand,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!brand) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: brand,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Brand.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
