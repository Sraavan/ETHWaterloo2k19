const express = require('../config/headers').express;
const app = require('../config/headers').app;
const services = require('../services/services')
var cors = require('cors');

module.exports = function () {
    var router = express.Router()

    app.use(cors());
    
    // app.use('', express.static(process.cwd() + '/public/dist/public'));
    app.use('/public', express.static(process.cwd() + '/server/public'));
    app.use('/vendor', express.static(process.cwd()+ '/node_modules'));
    app.use('/contracts', express.static(process.cwd()+ '/contract/build/contracts'))

    app.get('/', function (req, res) {
        res.redirect('/public/Login')
    });

    // ----------------------------------- API -----------------------------------
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