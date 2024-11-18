describe('Chuck Norris API Tests', () => {
    const apiUrl = 'https://api.chucknorris.io/jokes/random';
    let validApiResponse;  // For valid endpoint response
    let invalidApiResponse; // For invalid endpoint response
  
    // Single setup for both valid and invalid API calls
    before(() => {
      // Fetch the valid API response
      cy.request(apiUrl).then((response) => {
        validApiResponse = response;
      });
  
      // Fetch the invalid API response
      cy.request({
        url: `${apiUrl}/invalid`,
        failOnStatusCode: false, // Prevent Cypress from failing the test
      }).then((response) => {
        invalidApiResponse = response;
      });
    });
  
    it('Should fetch a random joke and validate the response', () => {
      expect(validApiResponse.status).to.eq(200);
  
      // Assert response body structure
      expect(validApiResponse.body).to.have.property('icon_url');
      expect(validApiResponse.body).to.have.property('id');
      expect(validApiResponse.body).to.have.property('value');
  
      // Assert joke content is not empty
      expect(validApiResponse.body.value).to.be.a('string').and.not.be.empty;
  
      cy.log('Joke:', validApiResponse.body.value);
    });
  
    it('Should validate that the API returns JSON', () => {
      expect(validApiResponse.headers['content-type']).to.include('application/json');
    });
  
    it('Should handle invalid endpoints gracefully', () => {
      expect(invalidApiResponse.status).to.eq(404);
    });
  });
  