const app = require('./config/headers').app;
const localConfig = require('./config/headers').localConfig;
const PORT = process.env.PORT || localConfig.port //Default: 3000

require('./routers/routes')()

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});