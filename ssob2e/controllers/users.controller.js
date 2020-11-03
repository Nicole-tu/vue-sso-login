var userModule = require('../modules/users.module');

const userCtrlSignin = (req, res) => {
    userModule.userModuleSignin(req.body).then((moduleResult) => {
        res.cookie('SigninTokens', userModule.getSigninTokens(req, moduleResult.token), { signed: true });
        res.send(Object.assign({ success: true }, moduleResult));
    }).catch((error) => {
        res.send(Object.assign({ success: false }, error));
    })
};

const userCtrlCheckStatus = (req, res) => {
    userModule.userModuleCheckStatus(req.signedCookies.SigninTokens).then((moduleResult) => {
        res.send(Object.assign({ success: true }, moduleResult));
    }).catch((error) => {
        res.send(Object.assign({ success: false }, error));
    });
};

const userCtrlSignout = (req, res) => {
    userModule.userModuleSignout(req.signedCookies.SigninTokens).then((moduleResult) => {
        res.cookie('SigninTokens', moduleResult, { signed: true });
        res.send({ success: true });
    }).catch((error) => {
        res.send(Object.assign({ success: false }, error));
    });
};

const userCtrlSignoutAll = (req, res) => {
    res.cookie('SigninTokens', [], { signed: true });
    res.send({ success: true });
};

const userCtrlSigninTokens = (req, res) => {
    switch (req.method) {
        case 'GET':
            userModule.userModuleSigninTokens(req.signedCookies.SigninTokens).then((moduleResult) => {
                res.send(Object.assign({ success: true }, moduleResult));
            }).catch((error) => {
                res.send(Object.assign({ success: false }, error));
            });
            break;
        case 'PUT':
            userModule.userModuleRemoveSigninToken(req.signedCookies.SigninTokens, req.params.accountId)
                .then((moduleResult) => {
                    res.cookie('SigninTokens', moduleResult, { signed: true });
                    res.send({ success: true });
                })
                .catch((error) => {
                    res.send(Object.assign({ success: false }, error));
                });
            break;
    }
};

const userCtrlAccountId = (req, res) => {
    userModule.userModuleAccountId({
        accountId: req.params.accountId
    }).then((moduleResult) => {
        res.send(Object.assign({ success: true }, moduleResult));
    }).catch((error) => {
        res.send(Object.assign({ success: false }, error));
    });
};

const userCtrlResetPswd = (req, res) => {
    userModule.userModuleResetPswd({
        accountId: req.body.accountId,
        newPassword: req.body.newPassword,
    }).then((moduleResult) => {
        res.send(Object.assign({ success: true }, moduleResult));
    }).catch((error) => {
        res.send(Object.assign({ success: false }, error));
    });
};

module.exports = {
    userCtrlSignin,
    userCtrlCheckStatus,
    userCtrlSignout,
    userCtrlSignoutAll,
    userCtrlSigninTokens,
    userCtrlAccountId,
    userCtrlResetPswd,
}