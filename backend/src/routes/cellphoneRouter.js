const router = require('express').Router();
const phoneController = require('../controllers/cellphoneController');
const validatePhone = require('../middlewares/validateCellphone');
const validateAuth = require('../middlewares/authorization');
const validateUpdatePhone = require('../middlewares/validateUpdateCellphone');

router.get('/', validateAuth, phoneController.getAll);

router.post('/', validateAuth, validatePhone, phoneController.create);

router.put('/:id', validateAuth, validateUpdatePhone, phoneController.update);

router.delete('/:id', validateAuth, phoneController.remove);

module.exports = router;
