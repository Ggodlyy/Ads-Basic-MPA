const express = require('express');
const databaseConfig = require('./config/database.js');
const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);

    app.listen(3030, () => { console.log('Server is running on port 3030...') })
}