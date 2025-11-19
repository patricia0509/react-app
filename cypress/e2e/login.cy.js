describe('Login Flow', () => {
  it('should display login form', () => {
    cy.visit('/login');
    cy.contains('Login').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should navigate to register page', () => {
    cy.visit('/login');
    cy.contains('Register here').click();
    cy.url().should('include', '/register');
  });
});