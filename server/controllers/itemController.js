const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const { Item } = require('../models/models')

class ItemController {
    async create(req, res) {
        try {
            const { lat, long, name, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({ lat, long, name, info, img: fileName })
            return res.json(
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
                        "img": item.img
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
                    "features": items.map( item => (
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
                                "img": item.img
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
            res.status(200).json({ message: "Deleted successfully" });
        }
        catch (e) {
            res.status(404).json(e.message)
        }
    }
}

module.exports = new ItemController()