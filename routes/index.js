const userRouter = require("./users");

module.exports = (app) => {
    app.use("/users", userRouter);
};
