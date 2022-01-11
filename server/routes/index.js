const Router = require('express')
const imagesRouter =require('./images/imagesRouter')
const itemRouter =require('./api/itemRoute')

const router =new Router()

router.use('/images', imagesRouter)
router.use('/api', itemRouter)

module.exports =router