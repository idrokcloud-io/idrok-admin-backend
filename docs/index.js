const main = require("./swagger.json");
const tags = require("./tags.json");

const productRoutes = require("./routes/product.json");
const adRoutes = require("./routes/ads.json");
const brandRoutes = require("./routes/brand.json");
const carRoutes = require("./routes/car.json");
const userRoutes = require("./routes/user.json");

const productModels = require("./models/product.json");
const adModels = require("./models/ads.json");
const brandModels = require("./models/brand.json");
const carModels = require("./models/car.json");
const userModels = require("./models/user.json");

const paths = {
    ...productRoutes,
    ...adRoutes,
    ...brandRoutes,
    ...carRoutes,
    ...userRoutes,
};

const definitions = {
    ...productModels,
    ...adModels,
    ...brandModels,
    ...carModels,
    ...userModels,
};

module.exports = {
    ...main,
    tags,
    definitions,
    paths,
    host: process.env.BASE_URL,
};
