import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
const { expect } = chai;


chai.use(chaiHttp);

describe('Data Ingestion API', () => {
  it('should create a new customer', (done) => {
    chai.request(server)
      .post('/api/data/customers')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '1234567890',
        total_spent: 1500.50,
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Customer created successfully');
        expect(res.body).to.have.property('customerId');
        done();
      });
  });

  it('should create a new order', (done) => {
    chai.request(server)
      .post('/api/data/orders')
      .send({
        customerId: 1,
        orderAmount: 300.75,
        orderDate: '2023-12-01',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'Order created successfully');
        expect(res.body).to.have.property('orderId');
        done();
      });
  });
});
