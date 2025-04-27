class cartPage_POM {
  continueShopping_btn() {
    return cy.get('[data-test="continue-shopping"]');
  }

  cartBadge_icon() {
    return cy.get(".shopping_cart_badge");
  }

  cartTitle_txt(){
    return cy.get(".title")
  }

  checkout_btn(){
    return cy.get("#checkout")
  }

  remove_btn(){
    return cy.get(".item_pricebar button")
  }

  removeList_btn(){
    return cy.get(".cart_list .cart_button")
  }
}

export default cartPage_POM;
