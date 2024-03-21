describe('Signup Component Tests', () => {
  beforeEach(() => {
    // visit signup page, baseUrl is set in config file.
    cy.visit('signup');
  });

  it('allows a user to signup', () => {
    // mock successful signup
    cy.intercept('POST', '**/api/v1/users', {
      statusCode: 201,
      body: {
        data: { id: '123', token: 'abc123' },
      },
    }).as('signUpRequest');
    cy.get('input[name=email]').type('testEmail@gmail.com');
    cy.get('input[name=password]').type('te$tPa55word');
    cy.get('input[name=username]').type('testUsername');
    cy.get('input[name=nickname]').type('testNickname');
    cy.get('form').submit();
    // check req, proceed res
    cy.wait('@signUpRequest');
    cy.url().should('include', '/');
  });

  it('should navigate to sign up page when click login button', () => {
    cy.get('.pageSwitch-link').contains('Login').click();
    cy.url().should('include', '/login');
  });

  const viewports = [
    { device: 'Mobile', width: 375, height: 667 }, // 代表移动设备
    { device: 'Desktop', width: 768, height: 1024 }, // 代表桌面设备
  ];

  viewports.forEach((viewport) => {
    it(`Should display navigation correctly on ${viewport.device}`, () => {
      cy.viewport(viewport.width, viewport.height);

      if (viewport.device === 'Desktop') {
        cy.get('.signUpBox__des').should('be.visible');
      } else {
        cy.get('.signUpBox__des').should('not.be.visible');
      }
    });
  });
});
