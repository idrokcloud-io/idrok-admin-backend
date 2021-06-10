const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const errors = require("../constants/errors");

exports.search = catchAsync(async (req, res, next) => {
    const search = await Product.find(
        // {
        //     isActive: true,
        //     $type: {
        //         $search: req.query.type,
        //     },
        // },
        // {
        //     score: {
        //         $meta: "textScore",
        //     },
        // }
        {
            slug: {
                $regex: req.query.search_text,
                $options: `$i`
            }
        }
    )
    // .sort({ score: { $meta: "textScore" } })
    // .lean();

    res.status(200).json({
        success: true,
        data: search,
    });
});
