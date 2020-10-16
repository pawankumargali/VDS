const router = require('express').Router();
const { createVDSInputValidator } = require('../input_validators/vds');
const { isAuth } = require('../input_validators/auth');
const { createVDS, getVDSByCode, getVDSByRefId, getAllVDS } = require('../controllers/vds');

router.post('/api/vds/create', isAuth, createVDSInputValidator, createVDS),
router.get('/api/vds', getAllVDS)
router.get('/api/vds/:code', getVDSByCode);
router.get('/api/vds/id/:refId', getVDSByRefId);

module.exports = router;

