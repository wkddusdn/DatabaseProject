const express = require('express');
const router = express.Router();
const controller = require('../controllers/boardController');

router.get('/', controller.list);
router.get('/view/:id', controller.view);

router.get('/write', controller.writeForm);
router.post('/write', controller.write);

router.get('/edit/:id', controller.editForm);
router.post('/edit/:id', controller.edit);

router.get('/delete/:id', controller.delete);

module.exports = router;
