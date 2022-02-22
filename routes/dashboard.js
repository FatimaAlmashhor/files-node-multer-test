const route = require('express').Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


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