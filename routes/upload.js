const router = require("express").Router();
const auth = require("../utils/auth");
const admin = require("../utils/admin");

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        const type = file.originalname.split(".");
        cb(null, `${new Date().getTime()}.${type[type.length - 1]}`);
    },
});

const fileFilter = (req, file, cb) => {
    // reject a file
    cb(null, file.mimetype.includes("image"));
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

function deleteFile(path) {
    fs.stat(path, function (err, stats) {
        if (err) {
            return console.error(err);
        }

        fs.unlink(path, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
}

router.post(
    "/",
    auth,
    admin,
    upload.single("image"),
    async (req, res, next) => {
        res.status(201).json({
            success: true,
            data: `uploads/${req.file.filename}`,
        });
    }
);

module.exports = router;
