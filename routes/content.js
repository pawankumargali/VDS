const router = require('express').Router();
const { isAuth } = require('../input_validators/auth');
const fileUploadHelper = require('../middleWare/fileUploadHelper');
const { uploadContent, getContentByCode, getAllContent } = require('../controllers/content');

router.post('/api/content/upload/:vdsCode', isAuth, fileUploadHelper, uploadContent);
router.get('/api/content/:vdsCode', getContentByCode);
router.get('/api/content', getAllContent);

module.exports = router;

