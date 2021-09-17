const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures")
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const features = await new ApiFeatures(Group.find(), req.query)
        .filter()
        .sort()

    const groups = await features.query.populate(['lesson', 'teacher', 'students'])

    res.status(200).json({
        success: true,
        data: groups
    })
});

exports.get = catchAsync(async (req, res, next) => {
    const group = await Group.findById(req.params.id).populate(['lesson', 'teacher', 'students'])

    if (!group) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: group
    })
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

exports.removeStudent = catchAsync(async (req, res, next) => {
    delete req.body.password;

    const group = await Group.findByIdAndUpdate(
        req.params.groupId,
        {
            $pull: { students: req.params.studentId }
        })

    if (!group) return next(new AppError(404, errors.NOT_FOUND));

    res.status(204).json({
        success: true,
        data: null
    })
});

exports.addStudent = catchAsync(async (req, res, next) => {
    delete req.body.password;

    const group = await Group.findByIdAndUpdate(
        req.params.groupId,
        {
            $addToSet: { students: req.params.studentId }
        })

    if (!group) return next(new AppError(404, errors.NOT_FOUND));

    res.status(204).json({
        success: true,
        data: group
    })
});

exports.delete = catchAsync(async (req, res, next) => {
    const group = await Group.findByIdAndRemove(req.params.id)

    if (!group) return next(new AppError(404, errors.NOT_FOUND));

    res.status(204).json({
        success: true,
        data: null
    })
});