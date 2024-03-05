const router = require('express').Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateAuth = require('../middlewares/authorization');

router.post('/', validateUser, userController.create);

router.post('/login', validateUser, userController.login);

router.delete('/', validateAuth, userController.remove);

module.exports = router;
