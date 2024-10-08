///<reference types="Cypress" />

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello I am the Doctor!");
    cy.get('[data-cy="contact-input-name"]').type("Doctor");
    cy.get('[data-cy="contact-btn-submit"').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });

    cy.get('[data-cy="contact-input-email"]').type("doctor@tardis.com{enter}");
    cy.screenshot();
    
    // cy.get('[data-cy="contact-btn-submit"')
    //   .contains("Send Message")
    //   .should("not.have.attr", "disabled");
    
    cy.get('[data-cy="contact-btn-submit"').as("submitBtn");
    cy.screenshot();

    // cy.get('@submitBtn').click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });
  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled"); //alternative way
      expect(el.text()).is.not.eq("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').focus().blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/); //more stable then using "then"

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/); //more stable then using "then"
   
    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr('class')).not.to.be.undefined;
        expect(el.attr('class')).to.contains('invalid');
      }); 
  });
});
