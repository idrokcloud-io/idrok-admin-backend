const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

// sort by fields by popularity, rating, skidka, date, name

exports.productAll = catchAsync(async (req, res, next) => {
    const products = await Product.find().sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        data: products,
    });
})

exports.getAll = catchAsync(async (req, res, next) => {
    let query = {};
    let {
        type,
        price,
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
    if (brand) {
        brands = brand.split(",");
        query.brand = brands
    }

    type && (query.type = type);
    car && (query.car = car);
    car_model && (query.car_model = car_model);
    quantity && (query.quantity = { $gte: quantity });
    buy_count && (query.buy_count = { $gte: buy_count });
    // brand && (query.brand = brand);
    discount && (query.discount = { $gte: discount });



    let sort = {}
    let { popular, rate, priceup, sale, newly } = req.query

    sort.createdAt = -1
    popular && (sort.buy_count = -1)
    rate && (sort.buy_count = -1)
    priceup && (sort.price = -1)

    const products = await Product
        .find(query)
        .skip((page || 1) * 20)
        .limit(20)
        .sort(sort)
        .lean();

    res.status(200).json({
        success: true,
        data: products,
    });
});

exports.get = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
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
