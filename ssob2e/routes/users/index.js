var express = require('express');
var userCtrl = require('../../controllers/users.controller');

var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('users首頁');
});

router.post('/signin', userCtrl.userCtrlSignin);

router.post('/checkstatus', userCtrl.userCtrlCheckStatus);

router.post('/signout', userCtrl.userCtrlSignout);

router.post('/signoutall', userCtrl.userCtrlSignoutAll);

router.get('/signintokens', userCtrl.userCtrlSigninTokens);

router.put('/signintokens/:accountId', userCtrl.userCtrlSigninTokens);

router.get('/accountid/:accountId', userCtrl.userCtrlAccountId);

router.post('/resetpswd', userCtrl.userCtrlResetPswd);

module.exports = router;
