describe("Listings", () => {
  it("should show 404 error when car not found", () => {
    cy.visit("/cars/1234567890", {
      failOnStatusCode: false,
    });
    cy.get("h1").contains("404");
  });

  it("should show 404 error when end time is in the past", () => {
    cy.visit("/cars/19", {
      failOnStatusCode: false,
    });
    cy.get("h1").contains("404");
  });
});
