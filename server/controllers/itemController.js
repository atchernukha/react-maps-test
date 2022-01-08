// const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const s3 = require('../s3')
const { Item } = require('../models/models')


class ItemController {
    async create(req, res) {
        const { lat, long, name, info } = req.body

        try {
            await s3.uploadFile(req.file)
            const item = await Item.create({ lat, long, name, info, img: req.file.filename })

            res.status(201).json(
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [item.lat, item.long]
                    },
                    "properties": {
                        "id": item.id,
                        "name": item.name,
                        "info": item.info,
                        "img": "images/" + item.img
                    }
                }
            )
        }
        catch {
            res.status(404).json({ message: "Item not created" })
        }
    }

    async update(req, res) {
        const { id, lat, long, name, info } = req.body
        try {
            await Item.update(
                { id, lat, long, name, info },
                { where: { id: id } })
            res.status(200).json({ message: "Updated successfully" });
        }
        catch (e) {
            res.status(404).json({ message: "Item not found" })
        }
    }

    async getAll(req, res) {
        try {
            const items = await Item.findAll()
            return res.json(
                {
                    "type": "FeatureCollection",
                    "features": items.map(item => (
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [item.lat, item.long]
                            },
                            "properties": {
                                "id": item.id,
                                "name": item.name,
                                "info": item.info,
                                "img": "images/" + item.img
                            }
                        }
                    ))
                }
            )
        }
        catch (e) {
            res.status(404).json(e.message)
        }

    }
    async delete(req, res) {
        const { id } = req.params
        try {
            const item = await Item.findOne({ where: { id } })
            await Item.destroy({ where: { id: id } })
            fs.unlinkSync(path.resolve(__dirname, '..', 'static', item.img))
            await s3.deleteFile(item.img)
            res.status(200).json({ message: "Deleted successfully" });
        }
        catch (e) {
            res.status(404).json(e.message)
        }
    }
}

module.exports = new ItemController()