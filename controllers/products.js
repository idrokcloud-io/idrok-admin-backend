const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.getAll = catchAsync(async (req, res, next) => {
    let query = {};
    const { lang, type, price, discount, car, brand } = req.query;

    type && (query.type = type);
    car && (query.car = car);
    brand && (query.brand = brand);
    price && (query.price = { $gte: price });
    discount && (query.discount = { $gte: discount });

    const products = await Product.find(query)
        .select(`+${lang ? lang : "uz"}`)
        .sort({ createdAt: -1 })
        .lean();

    res.status(200).json({
        success: true,
        data: products,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id).lean();

    if (!product) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: product,
    });
});

exports.create = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product,
    });
});

exports.update = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    }).lean();

    if (!product) return next(new AppError(404, errors.NOT_FOUND));

    res.status(200).json({
        success: true,
        data: product,
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    await Product.findById(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
