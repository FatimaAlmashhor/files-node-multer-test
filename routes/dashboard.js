const route = require('express').Router();
const multer = require('multer')
const InfoModal = require('./schemas/info');
const mongoose = require('mongoose');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('[filed]', file.fieldname);
        if (file.fieldname == 'avatar') {
            cb(null, './uploads/images')
        }
        else {
            cb(null, './uploads/files')
        }

    },
    filename: function (req, file, cb) {
        let extact = file.originalname.split('.')[1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extact
        cb(null, file.fieldname + '-' + uniqueSuffix)

    }
})

const upload = multer({
    storage: storage,

    fileFilter: (req, file, callback) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf"
        ) {
            callback(null, true);
        } else callback(null, false);
    },
    limits: 1024 * 1024 * 5,
}).fields([
    { name: "avatar", maxCount: 1 },
    { name: "cv", maxCount: 1 }]);


route.get(['/', '/dashboard'], async (req, res) => {
    res.render('index')
})



route.post('/dashboard', upload, async (req, res, next) => {
    console.log(req.files, req.body);
    var reqr = req.body;
    const instance = new InfoModal({
        id: mongoose.Types.ObjectId,
        fullname: reqr.fullname,
        email: reqr.email,
        image: req.files.avatar !== undefined ? req.files.avatar[0].filename : null,
        cv: req.files.cv !== undefined ? req.files.cv[0].filename : null
    });
    try {
        await instance.save((error, result) => {
            if (error)
                console.log(error.message);
            else
                console.log(result)
        });
        res.end();
        // res.send('Sucess')
        next()
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = route;