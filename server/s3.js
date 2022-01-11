const S3 = require('aws-sdk/clients/s3');
const fs = require('fs')

const accessKey = process.env.S3_BUCKET_ACCESS_KEY
const secretKey = process.env.S3_BUCKET_ACCESS_SECRET
const region = process.env.S3_BUCKET_REGION

const s3 = new S3({
//   region,
    accessKeyId: process.env.S3_BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.S3_BUCKET_ACCESS_SECRET
})

function uploadFile(file) {
  let fileStream = fs.createReadStream(file.path)
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME, 
    Key: file.filename, 
    Body: fileStream
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

function getFileStream(fileKey) {
  const downloadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
  }

  let fileStream = s3.getObject(downloadParams).createReadStream()
  return fileStream
}
exports.getFileStream = getFileStream

const deleteFile = (fileName) => {
    // Setting up S3 delete parameters
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName, // File name you want to delete in S3
    };

    // Delete file in the bucket
    s3.deleteObject(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File deleted successfully. ${data}`);
    });
};

exports.deleteFile = deleteFile