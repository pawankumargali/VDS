const multer = require('multer');

// File temp storage path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
   
module.exports = multer({ storage }).array('mediaFiles', 12);