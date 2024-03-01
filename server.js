const express = require('express');
const app = express();
const db = require('./src/models');
const initRoutes = require('./src/routes/web');

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync db.');
});

let port = 3000;
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});