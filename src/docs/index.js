const main = require("./swagger.json");
const tags = require("./tags.json");

const userRoutes = require("./routes/user.json");
const groupRoutes = require("./routes/group.json");
const paymentRoutes = require("./routes/payment.json");
const lessonRoutes = require("./routes/lesson.json");

const userModels = require("./models/user.json");
const groupModels = require("./models/group.json");
const paymentModels = require("./models/payment.json");
const lessonModels = require("./models/lesson.json");

const paths = {
    ...userRoutes,
    ...groupRoutes,
    ...lessonRoutes,
    ...paymentRoutes
};

const definitions = {
    ...userModels,
    ...groupModels,
    ...lessonModels,
    ...paymentModels
};

module.exports = {
    ...main,
    definitions,
    tags,
    paths,
    host: "88.227.85.5:1002",
};
