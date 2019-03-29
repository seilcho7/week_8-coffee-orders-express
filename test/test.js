const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const Order = require('../models/orders');

describe('Order model', () => {
    it('should be able to retreive all orders', async () => {
        const theOrder = await Order.getAll();
        expect(theOrder).to.be.instanceOf(Array);
        console.log(theOrder);
    });

    it('should be able to retreive orders by id', async () => {
        const theOrder = await Order.getById(1);
        expect(theOrder).to.be.instanceOf(Order);
        console.log(theOrder);
    });
});