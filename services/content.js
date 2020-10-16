const { s3, docClient } = require('./core/aws');
const fs = require('fs');
const {v4:uuidv4} = require('uuid');
const { AWS_MEDIA_BUCKET, VDS_MEDIA_TABLE } = require('../config');

async function uploadMediaToVDS(files, vdsCode, callback) {
    try {
        const filesInfo = [];
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
            const { Key, Location } = data;
            filesInfo.push({name: originalname, key:Key, location:Location});
        }

        const updateParams = {
            TableName: VDS_MEDIA_TABLE,
            Key: {
                vdsCode: vdsCode
            },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #mediaField = list_append(if_not_exists(#mediaField, :empty_list), :mediaFiles)',
            ExpressionAttributeNames: {
              '#mediaField': 'media'
            },
            ExpressionAttributeValues: {
              ':mediaFiles': filesInfo,
              ':empty_list': []
            }
        }
        const { Attributes:data } = await docClient.update(updateParams).promise()
        return callback(null, data);
    }
    catch(err) {
        return callback(err, null);
    }
}

async function getContentByVDSCode(vdsCode, callback) {
  try {
    const getParams = {
        TableName: VDS_MEDIA_TABLE,
        Key: {
            vdsCode: vdsCode
        }
    };
    const { Item } = await docClient.get(getParams).promise();
    return callback(null, Item.media);
  }   
  catch(err) {
    console.log(err);
    return callback(err,null);
  }
}

async function getAll(limitParam, callback) {
    try {
        const limit = !limitParam ? 10 : Number(limitParam);
        const params = {
            TableName: VDS_MEDIA_TABLE,
            Limit: limit
        }
        const { Items, Count } = await docClient.scan(params).promise();
        return callback(null, {items: Items, count: Count});
    }
    catch(err) {
        return callback(err, null);
    }
}

module.exports = { uploadMediaToVDS, getContentByVDSCode, getAll };