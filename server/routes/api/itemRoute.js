const Router = require('express')
const upload = require('../../middleware/upload')
const itemController = require('../../controllers/itemController')

const router = new Router()

router.post('/item', upload.single('img'), itemController.create)
router.patch('/item/:id', itemController.update)
router.get('/item', itemController.getAll)
router.delete('/item/:id', itemController.delete)

module.exports =router