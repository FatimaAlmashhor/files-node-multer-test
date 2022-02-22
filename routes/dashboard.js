const route = require('express').Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            if (file.fieldname == 'avatar') {
                cb(null, './uploads/images')
            }
            else {
                cb(null, './uploads/files')
            }
        } catch (error) {
            console.log(error);
        }
    },
    filename: function (req, file, cb) {
        try {
            let extact = file.originalname.split('.')[1];
            console.log({ extact });
            console.log(file.fieldname);
            if (file.fieldname == 'avatar') {
                if (extact == 'jpg') {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extact
                    cb(null, file.fieldname + '-' + uniqueSuffix)
                } else if (file.fieldname == 'cv') {
                    if (extact == 'pdf') {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extact
                        cb(null, file.fieldname + '-' + uniqueSuffix)
                    }
                }
                else {
                    // cb(null, false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
})

const upload = multer({ storage: storage })

route.get('/dashboard', async (req, res) => {
    res.render('index')
})
route.post('/dashboard', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cv', maxCount: 1 }]),
    async (req, res) => {
        console.log(req.file, req.body)
    })

module.exports = route;