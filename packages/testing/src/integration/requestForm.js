describe("Request Form Interactions", function () {
  beforeEach(function () {
    cy.visit(
      "http://localhost:3000/suppliers/5db35dab-d936-49df-90c7-df813ec2f394/request"
    );
  });

  it("it enters form values", () => {
    cy.get("input[name=firstName]").type("Doctor");
    cy.get("input[name=lastName]").type("Strange");
    cy.get("input[name=email]").type("i-strongly-need-masks@need-mask.com");
    cy.get("input[name=phoneNumber]").type("+49123456789");
    cy.get("select[name=companyType]").select("clinic");
    cy.get("input[name=companyName]").type("Johns Hopkins");
    cy.get('[type="checkbox"]').last().parent("label").click();
    cy.get('input[name="requestedProducts.data[1].amount"]').type("5000");
    cy.get('button[type="submit"]').click();
  });
});
