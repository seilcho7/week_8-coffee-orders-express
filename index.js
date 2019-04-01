// const http = require('http');
// const querystring = require('querystring');

// const hostname = '127.0.0.1';
const express = require('express');
const app = express();
const port = 3000;

const Order = require('./models/orders');

app.use(express.urlencoded({extended: true}));

app.get('/orders', async (req, res) => {
    const allOrders = await Order.getAll();
    res.json(allOrders);
});

app.get('/orders/:id', async (req, res) => {
    const theOrder = await Order.getById(req.params.id);
    res.json(theOrder);
});

app.post('/orders', async (req, res) => {
    res.json(req.body);
    await Order.add(req.body);
});

app.put('/orders/:id', async (req, res) => {
    const {id} = req.params;
    await Order.update(id, req.body);
    res.end(`{ "id": "added order to ${id}}`);
});

app.delete('/orders/:id', async (req, res) => {
    await Order.delete(req.params.id);
    res.end(`{ "id": "deleted order ${req.params.id}}`);
});


app.listen(port, () => {
    console.log(`Server is running on a port ${port}`);
});