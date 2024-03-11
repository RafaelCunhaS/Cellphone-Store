const router = require('express').Router();
const cellphoneController = require('../controllers/cellphoneController');
const validatePhone = require('../middlewares/validateCellphone');
const validateAuth = require('../middlewares/authentication');
const validateUpdatePhone = require('../middlewares/validateUpdateCellphone');
const pagination = require('../middlewares/pagination');
const validateUUID = require('../middlewares/validateUUID');

router.get('/', validateAuth, pagination, cellphoneController.getAll);

router.get('/:id', validateAuth, validateUUID, cellphoneController.getById);

router.post('/', validateAuth, validatePhone, cellphoneController.create);

router.put('/:id', validateAuth, validateUUID, validateUpdatePhone, cellphoneController.update);

router.delete('/:id', validateAuth, validateUUID, cellphoneController.remove);

module.exports = router;
