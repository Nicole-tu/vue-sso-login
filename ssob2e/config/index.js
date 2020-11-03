// https://ithelp.ithome.com.tw/articles/10247835
const mongodb = {
    HOST: 'localhost',
    PORT: 27017,
    DATABASE: 'Ironman12'
};

const cors = {
    origin: ['http://localhost:8080', 'http://localhost:8083']
}

const jwt = {
    tokensecret: 'THISISMYTOKENSECRET',
    exp: 60 * 60 * 24 * 30
}

const cs = {
    cookiesecret: 'THISISMYCOOKIESECRET'
}

module.exports = {
    mongodb,
    cors,
    jwt,
    cs
};
