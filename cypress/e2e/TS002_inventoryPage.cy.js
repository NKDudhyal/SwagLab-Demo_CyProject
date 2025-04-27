/// <reference types="cypress"/>
import {
  inventorypagepom,
  setupEnv,
  logindetails_fix,
  cartpagepom,
  headerpom,
  footerpom,
  url_fix,
} from "../support/setup.js";

describe("Inventory page test cases", () => {
  setupEnv();

  it('TC001 ==> Click random "Add to cart", get name & price, go to cart and verify both', () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Add a random product to the cart and verify it.");
    cy.addRandomProductAndVerifyInCart();
  });

  it("TC002 ==> Add two random products and verify cart count", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Add the first random product to the cart.");
    cy.addRandomProductToCart().then((firstIndex) => {
      cy.log("Step 3: Navigate to the cart and continue shopping.");
      inventorypagepom.cart_lnk().click();
      cartpagepom.continueShopping_btn().click();

      cy.log("Step 4: Add another random product to the cart.");
      cy.addRandomProductToCart(firstIndex);

      cy.log("Step 5: Verify that the cart contains two items.");
      cy.verifyCartItemCount(2);
    });
  });

  it("TC003 ==> Verify that Burger menu is visible and works properly.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Open the burger menu and verify its items.");
    headerpom.burgerMenu_btn().should("be.visible").click();
    headerpom.bm_AllItems_btn().should("be.visible");
    headerpom.bm_About_lnk().should("be.visible");
    headerpom.bm_Logout_btn().should("be.visible");
    headerpom.bm_ResetAppStore_btn().should("be.visible");
  });

  it("TC004 ==> Verify logout functionality works properly.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Open the burger menu and click on 'Logout' button.");
    headerpom.burgerMenu_btn().click();
    headerpom.bm_Logout_btn().should("be.visible").click();

    cy.log("Step 3: Verify that the user is redirected to the login page.");
    cy.url().should("eq", url_fix.loginPage_url);
  });

  it("TC005 ==> Verify cart icon functionality works properly.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Click on the cart icon and verify the URL.");
    headerpom.cartIcon().click();
    cy.url().should("eq", url_fix.cartPage_url);
  });

  it("TC006 ==> Verify that 'Swag Labs' heading is visible.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Verify that the 'Swag Labs' heading is visible.");
    headerpom.logo().should("be.visible").and("have.text", "Swag Labs");
  });

  it("TC007 ==> Verify that 'Products' text is visible.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Verify that the 'Products' heading is visible.");
    headerpom.product_txt().should("be.visible").and("have.text", "Products");
  });

  it("TC008 ==> Verify that 'Name (A to Z)' is the default selected filter.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Verify that 'Name (A to Z)' is the default filter option.");
    headerpom
      .filterDropdown()
      .find("option:selected")
      .should("have.text", "Name (A to Z)");
  });

  it("TC009 ==> Verify that filter dropdown functionality works properly.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    const options = [
      "Name (A to Z)",
      "Name (Z to A)",
      "Price (low to high)",
      "Price (high to low)",
    ];

    options.forEach((optionText) => {
      // Select the dropdown option
      cy.log(`Step 2: Select filter option: ${optionText}`);
      headerpom.filterDropdown().select(optionText);
      cy.wait(3000); // Wait for the results to update

      // Verify the selected text in the visible span
      cy.log(`Step 3: Verify that the selected filter text is displayed: ${optionText}`);
      headerpom
        .dropdownActive()
        .should("be.visible")
        .and("have.text", optionText);
    });
  });

  it("TC010 ==> Verify that after selecting option from dropdown it should reflect in the result section.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    headerpom.dropdownActive().should("have.text", "Name (A to Z)");

    let azProductNames = [];
    cy.log("Step 2: Get product names sorted by 'Name (A to Z)'.");
    inventorypagepom
      .product_name()
      .each(($el) => {
        azProductNames.push($el.text().trim());
      })
      .then(() => {
        cy.log("🔤 Products in Name (A to Z) order:");
        azProductNames.forEach((name) => cy.log(name));

        cy.log("Step 3: Select 'Name (Z to A)' filter.");
        headerpom.filterDropdown().select("Name (Z to A)");

        let zaProductNames = [];
        cy.log("Step 4: Get product names sorted by 'Name (Z to A)'.");
        inventorypagepom
          .product_name()
          .each(($el) => {
            zaProductNames.push($el.text().trim());
          })
          .then(() => {
            cy.log("🔁 Products in Name (Z to A) order:");
            zaProductNames.forEach((name) => cy.log(name));

            const reversedAZ = [...azProductNames].reverse();
            expect(zaProductNames).to.deep.equal(reversedAZ);
          });
      });
  });

  it("TC011 ==> Verify that footer social link display and works properly.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Verify Twitter (X) link.");
    footerpom.twitter_lnk().should("have.attr", "href", url_fix.twitter_url);

    cy.log("Step 3: Verify Facebook link.");
    footerpom.facebook_lnk().should("have.attr", "href", url_fix.facebook_url);

    cy.log("Step 4: Verify LinkedIn link.");
    footerpom.linkedIn_lnk().should("have.attr", "href", url_fix.linkedIn_url);
  });

  it("TC012 ==> Verify that copyright text is displayed properly.", () => {
    cy.log("Step 1: Login with valid credentials.");
    cy.login(logindetails_fix.username, logindetails_fix.password);

    cy.log("Step 2: Verify that the copyright text is correct.");
    footerpom
      .copyright_txt()
      .should(
        "have.text",
        "© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
      );
  });
});
