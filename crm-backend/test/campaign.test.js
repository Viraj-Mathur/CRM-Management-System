describe('Campaign Management API', () => {
    it('should create a new campaign', (done) => {
      chai.request(server)
        .post('/api/campaigns')
        .send({
          name: 'Holiday Promo',
          audienceId: 1,
          message: 'Enjoy 20% off on all purchases!',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Campaign created successfully');
          expect(res.body).to.have.property('campaignId');
          done();
        });
    });
  
    it('should retrieve all campaigns', (done) => {
      chai.request(server)
        .get('/api/campaigns')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  