class header_POM {
  burgerMenu_btn() {
    return cy.get(".bm-burger-button button");
  }

  bm_AllItems_btn() {
    return cy.get(".bm-item-list a:nth-of-type(1)");
  }

  bm_About_lnk() {
    return cy.get(".bm-item-list a:nth-of-type(2)");
  }

  bm_Logout_btn() {
    return cy.get(".bm-item-list a:nth-of-type(3)");
  }

  bm_ResetAppStore_btn() {
    return cy.get(".bm-item-list a:nth-of-type(4)");
  }

  cartIcon() {
    return cy.get("#shopping_cart_container a");
  }

  cartCount(){
    return cy.get(".shopping_cart_badge")
  }

  logo() {
    return cy.get(".app_logo");
  }

  product_txt() {
    return cy.get("[data-test='title']");
  }

  filterDropdown() {
    return cy.get('select[data-test="product-sort-container"]');
  }

  dropdownActive() {
    return cy.get("span.active_option");
  }
}

export default header_POM;
