const express = require('../config/headers').express;
const app = require('../config/headers').app;

module.exports = function(){
    var router = express.Router()
    router.use(express.static(process.cwd() + '/public/dist/public'));
    app.use(router)

    app.get('/test', (req, res)=>{
        res.send("Test works!")
    })
}