const { docClient } = require('./aws');
const { COUNTER_TABLE, COUNTER_ROW_ID } = require('../../config');

exports.getUniqueCount= async function() {
    try {
        const params = { TableName: COUNTER_TABLE };
        const { Items } = await docClient.scan(params).promise();
        return Items[0].counter;
    }
    catch(err) {
        return err;
    }
}

exports.updateUniqueCount= async function(newCount) {
    try {
        const params = {
            TableName: COUNTER_TABLE,
            Key: { id: Number(COUNTER_ROW_ID) },
            UpdateExpression: "set #count = :c",
            ExpressionAttributeValues: {
                ':c':newCount
            },
            ExpressionAttributeNames: {
                '#count':"counter"
            }
        }
        await docClient.update(params).promise();
        return;
    }
    catch(err) {
        return err;
    }
}