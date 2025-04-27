///<reference types="cypress"/>

import {
  setupEnv,
  logindetails_fix,
  loginerrormessages_fix,
  placeholder_fix,
  url_fix,
  chkouterrormessage_fix,
  successfullmessage_fix,
  inventorypagepom,
  loginpagepom,
  cartpagepom,
  headerpom,
  chkoutonepom,
  chkouttwopom,
  compeletpagepom,
  randomNames,
  randomZipCode,
} from "../support/setup.js";

describe("Test Cases for Success Page", () => {
  setupEnv();

  it("TC001 ==> Verify that heading displays properly after successful checkout.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    
    cy.log("🔍 Adding items to the cart.");
    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();

    cy.log("🔍 Navigating to the checkout page.");
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Filling in checkout details.");
    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    chkoutonepom.continue_btn().click();

    cy.log("🔍 Finalizing the checkout process.");
    chkouttwopom.finish_btn().click();
    cy.url().should("eq", url_fix.completePage_url);

    cy.log("🔍 Verifying success heading.");
    compeletpagepom
      .successfullHeading_txt()
      .should("have.text", successfullmessage_fix.expectedHeading_for_SuccessfullMessage);
    cy.log("✅ Success heading matches expected message.");
  });

  it("TC002 ==> Verify that the 'Back Home' button functionality works properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    
    cy.log("🔍 Adding items to the cart.");
    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();

    cy.log("🔍 Navigating to the checkout page.");
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Filling in checkout details.");
    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    chkoutonepom.continue_btn().click();

    cy.log("🔍 Finalizing the checkout process.");
    chkouttwopom.finish_btn().click();
    cy.url().should("eq", url_fix.completePage_url);

    cy.log("🔍 Verifying 'Back Home' button functionality.");
    compeletpagepom
      .backHome_btn()
      .should("be.visible")
      .and("have.text", "Back Home")
      .click();

    cy.log("🔍 Verifying redirection to the inventory page.");
    cy.url().should("eq", url_fix.inventoryPage_url);
    cy.log("✅ 'Back Home' button works correctly and redirects to inventory page.");
  });
});
