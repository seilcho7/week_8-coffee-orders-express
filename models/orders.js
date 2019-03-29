const db = require('./conn');

class Order {
    constructor(id, first_name, last_name, email, coffee_order) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.coffeeOrder = coffee_order;
    }

    static getAll() {
        return db.any('select * from orders')
            .then((arrayOfOrders) => {
                return arrayOfOrders.map((orderData) => {
                    const orderInstance = new Order (
                        orderData.id,
                        orderData.first_name,
                        orderData.last_name,
                        orderData.email,
                        orderData.coffee_order
                    );
                    return orderInstance;
                });
            });
    };

    static getById(id) {
        return db.one(`select * from orders where id=${id}`)
            .then((orderData) => {
                const orderInstance = new Order(
                    orderData.id,
                    orderData.first_name,
                    orderData.last_name,
                    orderData.email,
                    orderData.coffee_order
                );
                return orderInstance;
            });
    }

    static add(orderData) {
        return db.one(`
            insert into orders
                (first_name, last_name, email, coffee_order)
            values
                ($1, $2, $3, $4)
            returning id
        `, [orderData.first_name, orderData.last_name, orderData.email, orderData.coffee_order])
            .then((data) => {
                return data.id;
            }); 
    }
}

Order.getAll();

module.exports = Order;