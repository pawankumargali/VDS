require('dotenv').config({path:__dirname+'/.env'});

const { 
    PORT, 
    AWS_ID, 
    AWS_SECRET, 
    AWS_MEDIA_BUCKET,
    AWS_QR_IMG_BUCKET, 
    COUNTER_TABLE,
    COUNTER_ROW_ID,
    VDS_CODE_TABLE,
    VDS_TABLE,
    VDS_MEDIA_TABLE,
    DOMAIN_NAME,
    API_KEY
} = process.env;

module.exports = { 
    PORT, 
    AWS_ID, 
    AWS_SECRET, 
    AWS_MEDIA_BUCKET, 
    AWS_QR_IMG_BUCKET, 
    COUNTER_TABLE, 
    COUNTER_ROW_ID, 
    VDS_CODE_TABLE,
    VDS_TABLE,
    VDS_MEDIA_TABLE,
    DOMAIN_NAME,
    API_KEY
};