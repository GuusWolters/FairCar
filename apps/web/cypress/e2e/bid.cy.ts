describe("Placing Bids", () => {
  const carTitle = "Fiat Tipo";
  const minimumBid = 18000;
  it("should show error when placing bid lower than minimum bid", () => {
    cy.visit("/");

    cy.get('[cy-data="search-filter-button"]').click();
    cy.get("h3").contains(carTitle).click();

    cy.wait(1000);

    cy.get("input").type((minimumBid - 1).toString());
    cy.get("button").contains("Bieden").click();

    cy.get("ol").should("contain", "Bod moet hoger zijn dan het minimum bod");
  });

  it("passes", () => {
    cy.visit("/");

    cy.get('[cy-data="search-filter-button"]').click();
    cy.get("h3").contains(carTitle).click();

    cy.wait(1000);

    cy.get('[cy-data="no-bids"]').should("be.visible");

    cy.get("input").type(minimumBid.toString());
    cy.get("button").contains("Bieden").click();

    cy.get('[cy-data="no-bids"]').should("not.exist");
    cy.get('[cy-data="bids"]').should("exist");
    cy.wait(500);
    cy.get("ol").should("contain", "Bod geplaatst");
  });

  it("should show error when placing bid equeal to highest bid", () => {
    cy.visit("/");

    cy.get('[cy-data="search-filter-button"]').click();
    cy.get("h3").contains(carTitle).click();

    cy.wait(1000);

    cy.get("input").type(minimumBid.toString());
    cy.get("button").contains("Bieden").click();

    cy.get("ol").should("contain", "Bod moet hoger zijn dan het hoogste bod");
  });

  it("should show error when placing bid lower than highest bid", () => {
    cy.visit("/");

    cy.get('[cy-data="search-filter-button"]').click();
    cy.get("h3").contains(carTitle).click();

    cy.wait(1000);

    cy.get("input").type((minimumBid - 1).toString());
    cy.get("button").contains("Bieden").click();

    cy.get("ol").should("contain", "Bod moet hoger zijn dan het hoogste bod");
  });
});
