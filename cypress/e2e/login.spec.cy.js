describe('Login Component Tests', () => {
  beforeEach(() => {
    // visit login page, baseUrl is set in config file.
    cy.visit('login');
  });

  it('allows a user to log in', () => {
    // mock successful login
    cy.intercept('POST', '**/api/v1/users/login', {
      statusCode: 201,
      body: {
        data: { userId: '123', token: 'abc123' },
      },
    }).as('loginRequest');
    cy.login('user@example.com', 'password');
    // check req, proceed res
    cy.wait('@loginRequest');
    cy.url().should('include', '/');
  });

  it('shows an error message for invalid login', () => {
    // mock failed login attempt, res
    cy.intercept('POST', '**/api/v1/users/login', {
      statusCode: 401,
      body: {
        message: 'Invalid email or password',
      },
    }).as('loginFailRequest401');
    cy.login('wrong@example.com', 'password');

    cy.wait('@loginFailRequest401');
    cy.get('.error-message').should('contain', 'Invalid email or password');
  });

  it('shows an error message for not exist email', () => {
    cy.intercept('POST', '**/api/v1/users/login', {
      statusCode: 404,
      body: {
        message: 'The email address you entered does not exist',
      },
    }).as('loginFailRequest404');
    cy.login('notexist@example.com', 'password');
    cy.wait('@loginFailRequest404');
    cy.get('.error-message').should('contain', 'This email does not exist');
  });

  it('should navigate to sign up page when click create button', () => {
    cy.get('.pageSwitch-link').click();
    cy.url().should('include', '/signup');
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
