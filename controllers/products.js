const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

// sort by fields by popularity, rating, skidka, date, name

exports.getAll = catchAsync(async (req, res, next) => {
    let query = {};
    let {
        type,
        price,
        price_min,
        price_max,
        discount,
        car,
        car_model,
        brand,
        page,
        quantity,
        buy_count
    } = req.query;

    if (price) {
        price = price.split(",");
        query.price = { $gte: price[0], $lte: price[1] || 10000000 };
    }
    // price_min && (query.price_min = { $gte: price_min });
    // price_max && (query.price_max = { $lte: price_max });

    type && (query.type = type);
    car && (query.car = car);
    car_model && (query.car_model = car_model);
    quantity && (query.quantity = { $gte: quantity });
    buy_count && (query.buy_count = { $gte: buy_count });
    brand && (query.brand = brand);
    discount && (query.discount = { $gte: discount });

    const products = await Product.find(query)
        .skip((page || 1) * 20)
        .limit(20)
        .sort({ createdAt: -1 })
        .lean();

    res.status(200).json({
        success: true,
        data: products,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
        .populate("brand")
        .populate("car")
        .lean();

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
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
        success: true,
        data: null,
    });
});
