require('dotenv').config({path: './config/config.env'})
const express = require('express')
const sequelize = require('./db')
const path = require('path')
const cors = require('cors') 
const fileUpload = require('express-fileupload')
const router =require('./routes/index.js')

const app = express();
app.use(cors()); 
app.use(fileUpload({}));
app.use(express.json());
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.static(path.resolve(__dirname, '../client/build'))); // need only for heroku deploy
app.get("/*", (req, res) => {res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));  })  // need only for heroku deploy

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