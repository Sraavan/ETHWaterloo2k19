const app = require('./config/headers').app;
const localConfig = require('./config/headers').localConfig;
const PORT = process.env.PORT || localConfig.port //Default: 3000

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});