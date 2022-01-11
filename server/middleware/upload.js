const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'static/')
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString()+'-'+file.originalname)
    }
})

const types =  ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 *1024 * 5
}

module.exports = multer({storage, fileFilter, limits})