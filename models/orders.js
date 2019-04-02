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

    static update(id, orderData) {
        return db.result(`
            update orders
            set first_name = $1, last_name = $2, email = $3, coffee_order = $4
            where id=$5
        `, [orderData.first_name, orderData.last_name, orderData.email, orderData.coffee_order, id]);
    }

    // options:
    // 1. Set the this.email property to the newEmail and then call .save()
    async updateEmail(newEmail) {
        this.email = newEmail;
        await this.save();
    }

    // 2. Write a clever updater where the argument looks like: { first_name: 'oakley' }
    // or { email: 'oakley@oakley.com', last_name: 'smith' }
    async update(updatedInfo) {
        Object.keys(updatedInfo).forEach(key => {
            this[key] = updatedInfo[key];
        });
        await this.save();
    }

    static delete(id) {
        return db.result(`delete from orders where id=$1`, [id]);
    }

    save() {
        return db.result(`
            update orders set
                first_name='${this.firstName}',
                last_name='${this.lastName}',
                email='${this.email}',
                coffee_order='${this.coffeeOrder}'
            where id='${this.id}'
        `);
    }
}

Order.getAll();

module.exports = Order;