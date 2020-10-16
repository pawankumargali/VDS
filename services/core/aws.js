const { S3, DynamoDB } = require('aws-sdk');
const { AWS_ID, AWS_SECRET, AWS_REGION } = require('../../config');

// S3 Storage
const s3 = new S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
    region:AWS_REGION
});

// DynamoDB client
const docClient = new DynamoDB.DocumentClient({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
    region:AWS_REGION
});

module.exports = { s3, docClient };