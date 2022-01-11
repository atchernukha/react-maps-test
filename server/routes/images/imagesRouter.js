const Router = require('express')
const s3 = require('../../s3')

const router = new Router()

router.get('/:filename', (req, res) => {
    const filename = req.params.filename
    const readStream = s3.getFileStream(filename)
    readStream.pipe(res)
  })

module.exports =router