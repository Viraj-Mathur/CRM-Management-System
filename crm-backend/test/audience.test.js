describe('Audience Management API', () => {
    it('should create a new audience segment', (done) => {
      chai.request(server)
        .post('/api/audience')
        .send({
          name: 'High-Spenders',
          criteria: 'total_spent > 1000',
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Audience segment created successfully');
          expect(res.body).to.have.property('segmentId');
          done();
        });
    });
  
    it('should retrieve all audience segments', (done) => {
      chai.request(server)
        .get('/api/audience')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  