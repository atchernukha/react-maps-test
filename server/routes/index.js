const Router = require('express')

const router =new Router()
const itemRouter =require('./itemRoute')

router.use('/item', itemRouter)

module.exports =router