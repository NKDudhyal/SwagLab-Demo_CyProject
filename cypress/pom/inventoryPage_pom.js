class inventoryPage_POM {
  addToCart_btn() {
    return cy.get('[data-test^="add-to-cart"]');
  }

  products_list() {
    return cy.get(".inventory_item");
  }

  product_name() {
    return cy.get(".inventory_item_name");
  }

  product_price() {
    return cy.get(".inventory_item_price");
  }

  cart_lnk() {
    return cy.get(".shopping_cart_link");
  }

  addSouceLabBackpack(){
    return cy.get("#add-to-cart-sauce-labs-backpack")
  }

  addSauceLabBikeLight(){
    return cy.get("#add-to-cart-sauce-labs-bike-light")
  }

}

export default inventoryPage_POM;
