const userRouter = require('./users')
const groupRoutes = require('./group')
const lessonRoutes = require('./lesson')
const paymentRoutes = require('./payment')
const swaggerDocs = require("../docs");

module.exports = (app) => {
    app.use("/api/user", userRouter)
    app.use("/api/group", groupRoutes)
    app.use("/api/lesson", lessonRoutes)
    app.use("/api/payment", paymentRoutes)
};