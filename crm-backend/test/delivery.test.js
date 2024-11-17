describe('Delivery Status Tracking API', () => {
    it('should queue delivery status', (done) => {
      chai.request(server)
        .post('/api/delivery/delivery-receipt')
        .send({
          campaignId: 1,
          recipientId: 101,
          status: 'SENT',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Delivery status queued successfully');
          done();
        });
    });
  
    it('should update delivery status directly', (done) => {
      chai.request(server)
        .post('/api/delivery/update-status')
        .send({
          campaignId: 1,
          status: 'SENT',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Delivery status updated successfully');
          done();
        });
    });
  });
  