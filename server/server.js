require('dotenv').config({path: './config/config.env'})
const express = require('express')
const sequelize = require('./db')
const cors =require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const router =require('./routes/index.js')
const { listenerCount } = require('process')
console.log(process.env.NODE_ENV)

const app = express();

app.use(cors())
app.use(fileUpload({}))
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();