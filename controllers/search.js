const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.search = catchAsync(async (req, res, next) => {
    const search = await Product.find(
        {
            isActive: true,
            $text: {
                $search: req.query.search,
            },
        },
        {
            score: {
                $meta: "textScore",
            },
        }
    )
        .sort({ score: { $meta: "textScore" } })
        .lean();

    res.status(200).json({
        success: true,
        data: search,
    });
});
