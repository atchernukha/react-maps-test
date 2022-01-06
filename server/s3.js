const S3 = require('aws-sdk/clients/s3');
const fs = require('fs')

const accessKey = process.env.S3_BUCKET_ACCESS_KEY
const secretKey = process.env.S3_BUCKET_ACCESS_SECRET
const region = process.env.S3_BUCKET_REGION

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

function uploadFile(file) {
  let fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName, 
    Key: file.filename, 
    Body: fileStream
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

function getFileStream(fileKey) {
  const downloadParams = {
      Bucket: bucketName,
      Key: fileKey,
  }

  let fileStream = s3.getObject(downloadParams).createReadStream()
  return fileStream
}
exports.getFileStream = getFileStream