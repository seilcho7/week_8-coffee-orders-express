const Order = require('./models/orders');

class Controller {
    static log(req, res, next) {
        console.log(`They asked for ${req.url}`);
        next();
    }

    static checkForUser(req, res, next) {
        const isLoggedIn = false;
        if (isLoggedIn) {
            req.user = {
                username: 'seilcho7'
            };
            next();
        } else {
            res.redirect('/login');
        }
    }
    
    static loginPage(req, res) {
        res.send('You need to log in first.');
    }
    
    static homePage(req, res) {
        if (req.user) {
            res.send(`Hey ${req.user.username}!`);
        } else {
            res.send('You need to login please.');
        }
    }

    static async orderGetAll(req, res) {
        const allOrders = await Order.getAll();
        res.json(allOrders);
    }

    static async orderGetById(req, res) {
        const theOrder = await Order.getById(req.params.id);
        res.json(theOrder);
    }

    static async orderAdd(req, res) {
        res.json(req.body);
        await Order.add(req.body);
    }

    static async orderUpdate(req, res) {
        const {id} = req.params;
        await Order.update(id, req.body);
        res.end(`{ "id": "updated order ${id}}`);
    }

    static async orderDelete(req, res) {
        await Order.delete(req.params.id);
        res.end(`{ "id": "deleted order ${req.params.id}}`);
    }
}

module.exports = Controller;