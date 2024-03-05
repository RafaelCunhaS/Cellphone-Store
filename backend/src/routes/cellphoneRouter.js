const router = require('express').Router();
const cellphoneController = require('../controllers/cellphoneController');
const validatePhone = require('../middlewares/validateCellphone');
const validateAuth = require('../middlewares/authorization');
const validateUpdatePhone = require('../middlewares/validateUpdateCellphone');

router.get('/', validateAuth, cellphoneController.getAll);

router.post('/', validateAuth, validatePhone, cellphoneController.create);

router.put('/:id', validateAuth, validateUpdatePhone, cellphoneController.update);

router.delete('/:id', validateAuth, cellphoneController.remove);

module.exports = router;
