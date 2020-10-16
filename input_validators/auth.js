const { API_KEY } = require('../config');

exports.isAuth = function(req, res, next) {
    const { key } = req.query;
    if(!key) return res.status(401).json({success:false, error: 'Query param key missing'});
    if(key!==API_KEY) return res.status(401).json({success:false, error:'API Key invalid'});
    
    return next(); 
}