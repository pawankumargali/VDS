const { newVDS, getVDSByCode, getAll } = require('../services/vds');

exports.createVDS = function(req, res) {
    const response={};
    newVDS(req.body, (err, data) => {
        if(err) {
            response.success=false;
            response.status=500
            response.error=err;   
        }
        if(data) {
            response.success=true;
            response.status=200;
            response.message="Created VDS successfully";
            response.data=data;
        }   
        return res.status(response.status).json(response);
    });
}

exports.getVDS = function(req, res) {
    if(!req.params.code) return res.status(400).json({success:false, error:'Missing route param vdsCode'});
    const response={};
    getVDSByCode(req.params.code, (err, data) => {
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

exports.getAllVDS = function(req, res) {
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

exports.renderVDSPage = function(req, res) {
    if(!req.params.code) return res.status(400).json({success:false, error:'Missing route param vdsCode'});
    res.send({msg:'Hello'});
}