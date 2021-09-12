const Lesson = require("../models/Lesson");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures")
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    const features = await new ApiFeatures(Lesson.find(), req.query)
        .filter()
        .sort()

    const lessons = await features.query.populate(['lesson', 'teacher', 'students'])

    res.status(200).json({
        success: true,
        data: lessons
    })
});

exports.get = catchAsync(async (req, res, next) => {
    const lesson = await Lesson.findById(req.params.id).populate(['lesson', 'teacher', 'students'])

    if (!lesson) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: lesson
    })
});

exports.create = catchAsync(async (req, res, next) => {
    const lesson = await Lesson.create(req.body);

    res.status(201).json({
        success: true,
        data: lesson,
    });
});


exports.update = catchAsync(async (req, res, next) => {
    delete req.body.password;

    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!lesson) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: lesson,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    const lesson = await Lesson.findByIdAndRemove(req.params.id)

    if (!lesson) return next(new AppError(404, errors.NOT_FOUND));

    res.status(204).json({
        success: true,
        data: null
    })
});