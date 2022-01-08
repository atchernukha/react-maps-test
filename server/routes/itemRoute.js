const Router = require('express')
const upload = require('../middleware/upload')
const itemController = require('../controllers/itemController')

const router =new Router()

router.post('/', upload.single('img'), itemController.create)
router.patch('/:id', itemController.update)
router.get('/', itemController.getAll)
router.delete('/:id', itemController.delete)

module.exports =router