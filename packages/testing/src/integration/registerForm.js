describe("Register Form Interactions", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/suppliers/register");
  });

  it("it enters form values", () => {
    cy.get("input[name=firstName]").type("Robin");
    cy.get("input[name=lastName]").type("Fey");
    cy.get("input[name=email]").type("tester@example.com");
    cy.get("input[name=companyName]").type("The Not Lead Company");
    cy.get("input[name=vatNumber]").type("123456789");
    cy.get("input[name=web]").type("https://linkedin.com/yolo");
  });
});
