const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {PORT} = require('./config/serverConfig');
const ApiRoutes = require('./routes/index');
const db = require('./models/index');

const setUpAndStartServer =  () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', ApiRoutes);

    app.listen(PORT, async () => {
        console.log("Server started at Port:",PORT);

        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true})
        }
        
    });
}

setUpAndStartServer();