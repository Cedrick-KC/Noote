const { Router } = require ('express');
import authController from './authController.js';

const router = Router();

router.get('/sign', authController.signup_get);
router.post('/sign', authController.signup_post);
router.get('/log', authController.login_get);
router.post('/log', authController.login_post);

module.exports = router;
