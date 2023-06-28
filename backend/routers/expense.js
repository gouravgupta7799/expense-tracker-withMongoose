
const express = require('express');
const router = express.Router();
const controller = require('../controller/expense');
const middle = require('../middleware/auth');

// saving data by post request
router.post('/', middle.authorizerUser, controller.newExpense);

//send data by get request
router.get('/', middle.authorizerUser, controller.allExpense);

//delete data by delele request
router.delete('/', middle.authorizerUser, controller.deleteExpense);

//edit data by edit request
router.post('/editexp', middle.authorizerUser, controller.editexp);
router.put('/', middle.authorizerUser, controller.updateExpense);


module.exports = router;