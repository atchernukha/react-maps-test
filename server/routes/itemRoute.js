const Router = require('express')
const itemController = require('../controllers/itemController')

const router =new Router()

router.post('/', itemController.create)
router.put('/', itemController.update)
router.get('/', itemController.getAll)
router.delete('/:id', itemController.delete)

module.exports =router