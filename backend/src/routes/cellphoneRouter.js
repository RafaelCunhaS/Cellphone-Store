const router = require('express').Router();
const cellphoneController = require('../controllers/cellphoneController');
const validatePhone = require('../middlewares/validateCellphone');
const validateAuth = require('../middlewares/authorization');
const validateUpdatePhone = require('../middlewares/validateUpdateCellphone');
const pagination = require('../utils/pagination');
const validateCellphoneQuery = require('../middlewares/validateCellphoneQuery');

router.get('/', validateAuth, validateCellphoneQuery, pagination, cellphoneController.getAll);

router.get('/:id', validateAuth, cellphoneController.getById);

router.post('/', validateAuth, validatePhone, cellphoneController.create);

router.put('/:id', validateAuth, validateUpdatePhone, cellphoneController.update);

router.delete('/:id', validateAuth, cellphoneController.remove);

module.exports = router;
