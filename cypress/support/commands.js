Cypress.Commands.add("addRandomProductAndVerifyInCart", () => {
    cy.get(".inventory_item").then(($products) => {
      const randomIndex = Math.floor(Math.random() * $products.length);
      const selectedProduct = $products[randomIndex];
      cy.wrap(selectedProduct).as("randomProduct");
  
      cy.get("@randomProduct")
        .find(".inventory_item_name")
        .invoke("text")
        .then((productName) => {
          cy.get("@randomProduct")
            .find(".inventory_item_price")
            .invoke("text")
            .then((productPrice) => {
              cy.get("@randomProduct").contains("Add to cart").click();
  
              // Navigate to cart
              cy.get(".shopping_cart_link").click();
  
              // Verify product name and price in cart
              cy.get(".inventory_item_name").should(
                "have.text",
                productName.trim()
              );
              cy.get(".inventory_item_price").should(
                "have.text",
                productPrice.trim()
              );
            });
        });
    });
  });
  
  // Add random product (optionally skip an index)
  Cypress.Commands.add("addRandomProductToCart", (excludeIndex = null) => {
    return cy.get(".inventory_item").then(($items) => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * $items.length);
      } while (randomIndex === excludeIndex);
  
      // Click "Add to cart" for the randomly chosen item
      cy.wrap($items[randomIndex]).find("button").click();
  
      // Wrap the index so it can be used in Cypress chain
      return cy.wrap(randomIndex);
    });
  });
  
  // Verify cart badge count
  Cypress.Commands.add("verifyCartItemCount", (count) => {
    cy.get(".shopping_cart_badge")
      .should("be.visible")
      .and("have.text", count.toString());
  });
  