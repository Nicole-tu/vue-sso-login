const e = require("express");
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcryptjs');

const mongoDBConnectionUrl = `mongodb://${config.mongodb.HOST}:${config.mongodb.PORT}`;

const userModuleSignin = (values) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDBConnectionUrl, {
            useUnifiedTopology: true
        }).then((client) => {
            client.db(`${config.mongodb.DATABASE}`).collection("users", (error, collection) => {
                if (error) {
                    reject({ message: error });
                } else {
                    collection.findOne({ accountId: values.accountId }).then((user) => {
                        if (user) {
                            bcrypt.compare(values.password, user.password).then((result) => {
                                if (result) {
                                    const payload = {
                                        accountId: user.accountId,
                                        username: user.username,
                                        exp: Math.floor(Date.now() / 1000) + config.jwt.exp
                                    };
                                    const token = jwt.sign(payload, config.jwt.tokensecret);
                                    resolve({ message: '登入成功', token });
                                } else {
                                    reject({ message: '密碼錯誤' });
                                }
                            });
                        } else {
                            reject({ message: '無此帳號' });
                        }
                        client.close();
                    });
                }
            });
        }).catch(error => {
            reject({ message: error });
        });
    });
};

const getSigninTokens = (req, token) => {
    let signinTokens = req.signedCookies.SigninTokens ? req.signedCookies.SigninTokens : [];
    signinTokens.forEach(function (item) { item.active = false; });
    let signinToken = signinTokens.find(function (item) {
        let accountId = jwt.verify(item.token, config.jwt.tokensecret, (error, decoded) => {
            return decoded.accountId;
        });
        return accountId === req.body.accountId;
    });
    if (signinToken) {
        signinToken.token = token;
        signinToken.active = true;
    } else {
        signinTokens.push({ token, active: true });
    }
    return signinTokens;
};

const userModuleCheckStatus = (signinTokens) => {
    return new Promise((resolve, reject) => {
        if (signinTokens) {
            let signinToken = signinTokens.find(function (item) {
                return item.active;
            });
            if (signinToken) {
                jwt.verify(signinToken.token, config.jwt.tokensecret, (error, decoded) => {
                    if (error) {
                        reject({ message: error });
                    } else {
                        resolve();
                    }
                });
            } else {
                reject({ message: "尚未登入" });
            }
        } else {
            reject({ message: "尚未登入" });
        }
    });
};

const userModuleSignout = (signinTokens) => {
    return new Promise((resolve, reject) => {
        signinTokens.forEach(function (item) { item.active = false; });
        resolve(signinTokens);
    });
};

const userModuleSigninTokens = (signinTokens) => {
    return new Promise((resolve, reject) => {
        if (signinTokens) {
            let users = signinTokens.map(function (item) {
                let user;
                jwtDecode(item.token, (decoded) => {
                    user = {
                        accountId: decoded.accountId,
                        username: decoded.username,
                        active: item.active,
                    };
                });
                return user;
            });
            resolve({ users });
        } else {
            reject({ message: "尚未登入" });
        }
    });
};

const userModuleRemoveSigninToken = (signinTokens, accountId) => {
    return new Promise((resolve, reject) => {
        if (signinTokens) {
            if (accountId) {
                let signinTokensIndex = signinTokens.findIndex(function (item) {
                    let decodedAccountId;
                    jwtDecode(item.token, (decoded) => {
                        decodedAccountId = decoded.accountId
                    });
                    return decodedAccountId === accountId;
                });
                if (signinTokensIndex > -1) {
                    signinTokens.splice(signinTokensIndex, 1);
                    resolve(signinTokens);
                } else {
                    reject({ message: "無此帳號" });
                }
            } else {
                reject({ message: "帳戶不符規定" });
            }
        } else {
            reject({ message: "尚未登入" });
        }
    });
};

function jwtDecode(token, func) {
    jwt.verify(token, config.jwt.tokensecret, (error, decoded) => {
        if (error) {
            reject({ message: error });
        } else {
            func(decoded);
        }
    });
}

const userModuleAccountId = (values) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDBConnectionUrl, {
            useUnifiedTopology: true
        }).then((client) => {
            client.db(`${config.mongodb.DATABASE}`).collection("users", (error, collection) => {
                if (error) {
                    reject({ message: error });
                } else {
                    collection.findOne({ accountId: values.accountId }).then((user) => {
                        if (user) {
                            resolve({
                                accountId: user.accountId,
                                username: user.username
                            });
                        } else {
                            reject({ message: '無此帳號' });
                        }
                        client.close();
                    });
                }
            });
        }).catch(error => {
            reject({ message: error });
        });
    });
};

const userModuleResetPswd = (values) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDBConnectionUrl, {
            useUnifiedTopology: true
        }).then((client) => {
            client.db(`${config.mongodb.DATABASE}`).collection("users", (error, collection) => {
                if (error) {
                    reject({ message: error });
                } else {
                    collection.findOneAndUpdate({ accountId: values.accountId },
                        { $set: { password: bcrypt.hashSync(values.newPassword, 10) } }
                    ).then((result) => {
                        if (result.value === null) {
                            reject({ message: '無法重設密碼' });
                        } else {
                            resolve({ message: '重設完成' });
                        }
                    }).catch((error) => {
                        reject({ message: error });
                    }).finally(() => {
                        client.close();
                    });
                }
            });
        }).catch(error => {
            reject({ message: error });
        });
    });
};

module.exports = {
    userModuleSignin,
    getSigninTokens,
    userModuleCheckStatus,
    userModuleSignout,
    userModuleSigninTokens,
    userModuleRemoveSigninToken,
    userModuleAccountId,
    userModuleResetPswd,
};