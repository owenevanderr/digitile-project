const { Router } = require("express");
const postControllers = require('../controllers/postControllers');

const router = Router();

router.post('/posts', postControllers.create_post);
router.get('/posts', postControllers.get_post); 
router.put('/posts/:uuid', postControllers.update_post);
router.delete('/posts/:uuid', postControllers.delete_post); 
router.get('/posts/:uuid', postControllers.find_post_byid);

module.exports = router;