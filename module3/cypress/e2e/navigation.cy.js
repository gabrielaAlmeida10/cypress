///<reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173/');
    //data-cy explanetion on notion
    cy.get('[data-cy="header-about-link"]').click();
    cy.location('pathname').should('equal', '/about');

    cy.go('back');
    cy.location('pathname').should('equal', '/');

    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location('pathname').should('equal', '/');


  });
})