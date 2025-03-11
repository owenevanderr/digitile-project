const { Router } = require("express");
const authControllers = require('../controllers/authControllers');
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router();

router.get('/signup', authControllers.signup_get);
router.post('/signup', authControllers.signup_post);
router.get('/login', authControllers.login_get);
router.post('/login', authControllers.login_post);
router.get('/users', requireAuth, authControllers.users_get);
router.get('/users/:uuid', authControllers.find_users_byid);
router.get('/logout', authControllers.logout_get);

module.exports = router;