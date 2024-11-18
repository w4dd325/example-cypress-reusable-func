describe('POST Request with Fixture and Shared Variable', () => {
  let response; // Shared variable to store the response

  // Use before block to load fixture and send the request
  before(() => {
    // Load the request body from fixture
    cy.fixture('requestBody.json').then((requestBody) => {
      // Send POST request and store the response in the shared variable
      cy.request({
        method: 'POST',
        url: 'https://jsonplaceholder.typicode.com/posts',
        body: requestBody,
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        response = res; // Store response in shared variable
      });
    });
  });

  // Test case using the shared variable
  it('should validate the POST request response', () => {
    // Use the shared response variable for assertions
    expect(response.status).to.eq(201); // Expect status code 201
    expect(response.body).to.have.property('id'); // Ensure 'id' exists in the response
    expect(response.body.title).to.eq('foo'); // Check title
    expect(response.body.body).to.eq('bar'); // Check body
    expect(response.body.userId).to.eq(1); // Check userId
  });
});
