const router = require('express').Router();
const { createVDSInputValidator } = require('../input_validators/vds');
const { createVDS, getVDS, getAllVDS, renderVDSPage } = require('../controllers/vds');

router.get('/:code', renderVDSPage)
router.post('/api/vds/create', createVDSInputValidator, createVDS),
router.get('/api/vds', getAllVDS)
router.get('/api/vds/:code', getVDS);
router.post('/vds/')

module.exports = router;

