const sequelize = require('../db')
const {DataTypes} =require('sequelize')


// const List = sequelize.define('list',{
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     listName: {type: DataTypes.STRING, unique: true}
// })


const Item = sequelize.define('item',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lat: {type: DataTypes.FLOAT},
    long: {type: DataTypes.FLOAT},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    info: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
})

// List.hasMany(Item)
// Item.belongsTo(List)

module.exports = {
    // List,
    Item
}
