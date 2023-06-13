const express = require('express');
const router = express.Router();
const LinkController = require('../controllers/LinkController');


router.post('/create-link', LinkController.createLink);
router.get('/:code', LinkController.getLink);



module.exports = router;