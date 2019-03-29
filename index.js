const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const Order = require('./models/orders');

const server = http.createServer(async (req, res) => {
    console.log(req);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    if (req.url.startsWith("/orders")) {
        const parts = req.url.split('/');

        const method = req.method;
        if (method === "GET") {
            if (parts.length === 2) {
                const allOrders = await Order.getAll();
                const ordersJSON = JSON.stringify(allOrders);
                res.end(ordersJSON);
            } else if (parts.length === 3) {
                const orderId = parts[2];
                const theOrder = await Order.getById(orderId);
                const orderJSON = JSON.stringify(theOrder);
                res.end(orderJSON);
            } else {
                res.statusCode = 404;
                res.end('Resource not found.');
            }
        }
        
        if (method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const parsedBody = querystring.parse(body);
                const newOrderId = await Order.add(parsedBody);
                res.end(`{ "id": ${newOrderId}}`);
            });
        }

    } else {
        res.end(`{
            message: "Nooooooooooooooooooooo."
        }`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});