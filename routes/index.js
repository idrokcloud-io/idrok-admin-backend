const userRouter = require("./users");
const adsRouter = require("./ads");
const brandRouter = require("./brand");
const carRouter = require("./car");
const carModelRouter = require("./carModel");
const productRouter = require("./product");
const orderRouter = require("./order");
const uploadRouter = require("./upload");

// search route
const search = require("../controllers/search");

module.exports = (app) => {
    app.get("/api/search", search.search);
    app.use("/api/users", userRouter);
    app.use("/api/ads", adsRouter);
    app.use("/api/brands", brandRouter);
    app.use("/api/cars", carRouter);
    app.use("/api/car-models", carModelRouter);
    app.use("/api/products", productRouter);
    app.use("/api/order", orderRouter);
    app.use("/api/uploads", uploadRouter);
};
