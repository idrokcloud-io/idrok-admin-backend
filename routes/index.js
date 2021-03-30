const userRouter = require("./users");
const adsRouter = require("./ads");
const brandRouter = require("./brand");
const carRouter = require("./car");
const productRouter = require("./product");

module.exports = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/ads", adsRouter);
    app.use("/api/brands", brandRouter);
    app.use("/api/cars", carRouter);
    app.use("/api/products", productRouter);
};
