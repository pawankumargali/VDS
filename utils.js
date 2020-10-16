const QRCode = require('qrcode');
const { getUniqueCount, updateUniqueCount } = require('./services/core/uniqueCount');

// Starting number => starting code AAAAAB
exports.generateUniqueCode = async function() {
    let count = await getUniqueCount();
    const code = _toBase62(count);
    count+=1;
    await updateUniqueCount(count);
    return code;
}

function _toBase62(num) {
    const exp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str='';
    while(num>0) {
        let rem= num%62;
        str+= exp[rem]==0 ? '0':exp[rem.toString()];
        num= parseInt(num/62);
    }
    return str;
}

exports.generateQRCode = function(str) {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(str, (err, url) => {
            if(err) reject(err);
            if(url) resolve(url);
        });
    });
}
