const Controller = require(`./controller`);
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.get('/', Controller.log, Controller.checkForUser, Controller.homePage);

app.get('/login', Controller.log, Controller.loginPage);

app.get('/orders', Controller.orderGetAll);

app.get('/orders/:id', Controller.orderGetById);

app.post('/orders', Controller.orderAdd);

app.put('/orders/:id', Controller.orderUpdate);

app.delete('/orders/:id', Controller.orderDelete);

app.listen(port, () => {
    console.log(`Server is running on a port ${port}`);
});