const { s3 } = require('./aws');
const { AWS_MEDIA_BUCKET, AWS_QR_IMG_BUCKET } = require('../config');
const fs = require('fs');
const {v4:uuidv4} = require('uuid');

exports.uploadMediaFiles = async function(files) {
    try {
        const filesInfo=[];
        for(const file of files) {
            const { originalname, path } = file;
            const nameString = originalname.split('.');
            const fileType = nameString[nameString.length-1];
            const params = {
                ACL: 'public-read',
                Bucket: AWS_MEDIA_BUCKET,
                Key: `${uuidv4()}.${fileType}`,
                Body: fs.createReadStream(path)
            }
            const data = await s3.upload(params).promise();
            fs.unlinkSync(path);
            const { Bucket, Key, Location } = data;
            filesInfo.push({Name: originalname, Bucket, Key, Location});
            return filesInfo;
        }
    }
    catch(err) {
        return err;
    }
}

exports.uploadQRImg = async function(qrImg, uniqueCode) {
    try {
        const params = {
            ACL: 'public-read',
            Bucket: AWS_QR_IMG_BUCKET,
            Key: `${uniqueCode}.png`,
            Body: Buffer.from(qrImg,'base64')
        };
        const data = await s3.upload(params).promise();
        const { Location } = data;
        return Location;
    }
    catch(err) {
        return err;
    }
}