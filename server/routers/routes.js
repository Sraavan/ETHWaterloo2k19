const express = require('../config/headers').express;
const app = require('../config/headers').app;
const services = require('../services/services')
var cors = require('cors');

module.exports = function () {
    var router = express.Router()
    router.use(express.static(process.cwd() + '/public/dist/public'));
    app.use(cors());
    app.use(router)

    app.get('/api/GetImage', (req, res) => {
        let result;
        services.getImage().then(result => {
            if (result) {
                res.jsonp({ "result": "Image download successfully" })
            } else {
                res.jsonp({ "result": "Failed to download image" })
            }
        });

    })
}