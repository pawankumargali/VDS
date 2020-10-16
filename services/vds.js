const { docClient } = require('./core/aws');
const { DOMAIN_NAME, VDS_CODE_TABLE, VDS_TABLE } = require('../config');
const { generateUniqueCode, generateQRCode } = require('../utils');
const { uploadQRImg } = require('./core/qrImgUpload');

async function newVDS(fields, callback) {
    try {
    const { resolutionWidth, resolutionHeight, orientation } = fields;
        if(!resolutionWidth) fields.resolutionWidth=1920;
        if(!resolutionHeight) fields.resolutionHeight=1080;
        if(!orientation) fields.orientation='0';
        
        const queryParams = {
            TableName: VDS_CODE_TABLE,
            KeyConditionExpression: "#refId = :id",
            ExpressionAttributeNames:{
                "#refId": "referenceId"
            },
            ExpressionAttributeValues: {
                ":id": fields.referenceId
            }
        };
        const { Count } = await docClient.query(queryParams).promise();
        if(Count>0) return callback('VDS alredy exists', null)

        const vdsCode = await generateUniqueCode();
        const vdsUrl = `${DOMAIN_NAME}/${vdsCode}`;
        const qrCode = await generateQRCode(vdsUrl);
        const qrCodeUrl = await uploadQRImg(qrCode.split(',')[1], vdsCode);

        // referenceId => vdsCode
        const createVDSCodeParams = {
            TableName:VDS_CODE_TABLE,
            Item: {
                referenceId: fields.referenceId,
                vdsCode: vdsCode
            }
        }
        await docClient.put(createVDSCodeParams).promise();

        // vdsCode => vds info fields
        const createVDSParams = {
            TableName: VDS_TABLE,
            Item: {
                vdsCode: vdsCode ,
                name : fields.name ,
                screenWidth: fields.screenWidth ,
                screenHeight : fields.screenHeight ,
                screenSizeDiagonal: fields.screenSizeDiagonal ,
                aspectRatio: fields.aspectRatio ,
                resolutionWidth: fields.resolutionWidth ,
                resolutionHeight: fields.resolutionHeight ,
                orientation: fields.orientation ,
                siteType: fields.siteType ,
                location: fields.location ,
                locationAddress: fields.locationAddress ,
                premises: fields.premises ,
                premisesType: fields.premisesType ,
                placement: fields.placement ,
                spotduration: fields.spotduration ,
                spotprice: fields.spotprice ,
                currency: fields.currency ,
                pricingUnit: fields.pricingUnit ,
                qrCodeUrl: qrCodeUrl 
            },
        };
        await docClient.put(createVDSParams).promise();
        return callback(null, { ...fields, vdsUrl, qrCodeUrl });
    }
    catch(err) {
        console.log(err);
        return callback(err, null);
    }
}


async function getByCode(code, callback) {
    try {
        if(!code) return callback('No code found in request query params', null);
        const params = {
            TableName: VDS_TABLE,
            Key: {
                vdsCode : code
            }
        };
        const result = await docClient.get(params).promise();
        if(Object.keys(result).length===0) return callback('No VDS found with this code', null);
        return callback(null, result.Item);
    }
    catch(err) {
        console.log(err);
        return callback(err, null);
    }
}

async function getByRefId(refId, callback) {
    try {
        if(!refId) return callback('No code found in request query params', null);

        const params = {
            TableName: VDS_CODE_TABLE,
            Key: {
                referenceId: Number(refId)
            }
        };
        const { Item } = await docClient.get(params).promise();
        if(!Item) return callback('No vds found with this refId', null);
        
        await getByCode(Item.vdsCode, callback);
    }
    catch(err) {
        console.log(err);
        return callback(err, null);
    }
}

async function getAll(limitParam, callback) {
    try {
        const limit = limitParam ? Number(limitParam) : 10;
        const params = {
            TableName: VDS_TABLE,
            Limit: limit
        }
        const { Items, Count } = await docClient.scan(params).promise();
        return callback(null, {items: Items, count: Count});
    }
    catch(err) {
        return callback(err, null);
    }
}

module.exports = { newVDS, getByCode, getByRefId, getAll }