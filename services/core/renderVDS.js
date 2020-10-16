const { getByCode } = require('../vds');
const { getContentByVDSCode } = require('../content');


function renderVDSPage(req, res) {
    const { code } = req.params;
    if(!code) 
        return res.status(400).json({success:false, error:'Missing route param vdsCode'});
    let data={};
    getByCode(code, (error, vds) => {
        if(error) return res.send({ error });
        data=vds;
        getContentByVDSCode(code, (error, content) => {
            if(error) return res.send({ error });
            data.content=content;
            res.render('index', { data });
        })
    })
}   


module.exports = renderVDSPage;