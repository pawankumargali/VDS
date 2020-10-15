const { s3 } = require('./aws');
const { AWS_QR_IMG_BUCKET } = require('../config');


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