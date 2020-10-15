const router = require('express').Router();
const fileUploadHelper = require('../middleWare/fileUploadHelper');
const { uploadContent, getContentByCode, getAllContent } = require('../controllers/content');

// router.get('/:code', renderVDSPage)
router.post('/api/content/upload/:vdsCode', fileUploadHelper, uploadContent);
router.get('/api/content/:vdsCode', getContentByCode);
router.get('/api/content', getAllContent);
// router.get('/api/vds', getAllVDS)
// router.get('api/vds/:code', getVDS);

// // router.post('/vds/')

module.exports = router;

