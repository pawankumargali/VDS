const { uploadMediaToVDS, getContentByVDSCode, getAll } = require('../services/content');

exports.uploadContent = function(req, res) {
    if(!req.files) return res.status(400).json({success:false, error: 'No files uploaded'});
    if(!req.params.vdsCode) return status(400).json({success:false, error:'Route param vdsCode is required'});
    const response={};
    uploadMediaToVDS(req.files, req.params.vdsCode, (err, data) => {
        if(err) {
            response.success=false;
            response.status=500
            response.error=err;   
        }
        if(data) {
            response.success=true;
            response.status=200;
            response.message="Added Media to VDS successfully";
            response.data=data;
        }   
        return res.status(response.status).json(response);
    });   
}

exports.getContentByCode = function(req, res) {
    if(!req.params.vdsCode) return status(400).json({success:false, error:'Route param vdsCode is required'});
    const response={};
    getContentByVDSCode(req.params.vdsCode, (err, data) => {
        if(err) {
            response.success=false;
            response.status=500
            response.error=err;   
        }
        if(data) {
            response.success=true;
            response.status=200;
            response.data=data;
        }   
        return res.status(response.status).json(response);
    });   
}

exports.getAllContent = function(req, res) {
    const response={};
    getAll(req.query.limit, (err, data) => {
        if(err) {
            response.success=false;
            response.status=500
            response.error=err;   
        }
        if(data) {
            response.success=true;
            response.status=200;
            response.data=data;
        }
        return res.status(response.status).json(response);
    });
}