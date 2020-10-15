// // Check if VDS has media files mapped already
        // const getParams = {
        //     TableName: VDS_MEDIA_TABLE,
        //     Key: {
        //         vdsCode: vdsCode
        //     }
        // };
        // const { Item } = await docClient.get(getParams).promise();
        // // If VDS has media files mapped, add their info to array
        // const filesInfo = !Item ? [] : [...Item.media];

         // const putParams = {
        //     TableName:VDS_MEDIA_TABLE,
        //     Item: {
        //         vdsCode: vdsCode,
        //         media: filesInfo
        //     }
        // }
        // await docClient.put(putParams).promise();
        // return callback(null);