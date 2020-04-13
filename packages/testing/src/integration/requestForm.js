describe("Request Form Interactions", function () {
  beforeEach(function () {
    cy.visit(
      "http://localhost:3000/suppliers/5db35dab-d936-49df-90c7-df813ec2f394/request"
    );
  });

  it("it enters form values", () => {
    cy.get("input[name=firstName]").type("Robin");
    cy.get("input[name=lastName]").type("Fey");
    cy.get("input[name=email]").type("tester@example.com");
    cy.get("input[name=phoneNumber]").type("+491751109743");
    cy.get("input[name=companyName]").type("The Not Lead Company");
    cy.get('[type="checkbox"]').last().parent("label").click();
    cy.get('input[name="requestedProducts.data[1].amount"]').type("5000");
    cy.get('button[type="submit"]').click();
  });
});
