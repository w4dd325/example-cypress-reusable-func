describe('Reusable POST Request with Query Params from Spec File', () => {
  let response;
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Define the query parameters (as a variable in the spec file)
  let myParams = {
    key: 'value',  // Example query parameter
  };

  before(() => {
    // Load the request body from the fixture
    cy.fixture('requestBody.json').then((requestBody) => {
      // Make a POST request using the custom command with query params
      cy.customPostRequest(apiUrl,                    // URL from the spec file
        requestBody,                                  // Body from fixture
        //myParams                                      // Pass 'myParams' as query params
      ).then((res) => {
        response = res; // Store the response in a shared variable
      });
    });
  });

  it('should validate the response from the POST request with query params from spec file', () => {
    expect(response.status).to.eq(201); // Status code should be 201
    expect(response.body).to.have.property('id'); // Ensure 'id' exists in the response
    expect(response.body.title).to.eq('foo'); // Check title
    expect(response.body.body).to.eq('bar'); // Check body
    expect(response.body.userId).to.eq(1); // Check userId
    //expect(response.body).to.have.property('key'); // Check that the 'key' query param is included
  });
});
