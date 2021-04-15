const Ad = require("../models/Ad");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const ads = await Ad.find().lean();

    res.status(200).json({
        success: true,
        data: ads,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const ad = await Ad.findById(req.params.id).lean();

    if (!ad) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: ad,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const ad = await Ad.create(req.body);

    res.status(201).json({
        success: true,
        data: ad,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!ad) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: ad,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Ad.findByIdAndDelete(req.params.id);
    res.status(204).json({
        success: true,
        data: null,
    });
});
