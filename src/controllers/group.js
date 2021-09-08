const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const groups = await Group.find().lean();

    res.status(200).json({
        success: true,
        data: groups,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const group = await Group.findById(req.params.id).lean();

    if (!group) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: group,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const group = await Group.create(req.body);

    res.status(201).json({
        success: true,
        data: group,
    });
});


exports.update = catchAsync(async (req, res, next) => {
    delete req.body.password;

    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!group) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: group,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Group.findByIdAndDelete(req.user.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});