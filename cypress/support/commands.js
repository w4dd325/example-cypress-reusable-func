Cypress.Commands.add('customPostRequest', (url, body, params = {}) => {
    // Perform the POST request, using the 'params' field for query parameters
    cy.request({
      method: 'POST',
      url: url,
      body: body,
      //params: params,  // params defaults to {} if not passed to prevent errors
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });