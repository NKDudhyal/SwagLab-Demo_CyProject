///<reference types="cypress"/>

import {
  logindetails_fix,
  setupEnv,
  placeholder_fix,
  url_fix,
  chkouterrormessage_fix,
  randomNames,
  headerpom,
  cartpagepom,
  chkoutonepom,
  randomZipCode,
} from "../support/setup.js";

describe("Test Case for checkout step one page.", () => {
  setupEnv();

  it("TC001 ==> Verify that all validation or error messages display properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();
    chkoutonepom.continue_btn().click();

    // Check error message for all fields empty
    cy.log("🔍 Verifying error message when all fields are empty.");
    chkoutonepom
      .errorMsg_txt()
      .should("be.visible")
      .then(($el) => {
        const actualErrorMsg = $el.text().trim();
        if (actualErrorMsg === chkouterrormessage_fix.expectedErrorMessage_for_all_fileds_empty) {
          cy.log(`✅ Error message matches expected: ${chkouterrormessage_fix.expectedErrorMessage_for_all_fileds_empty}`);
        } else {
          cy.log(`❌ Error message mismatch: Expected '${chkouterrormessage_fix.expectedErrorMessage_for_all_fileds_empty}', but got '${actualErrorMsg}'`);
        }
        expect(actualErrorMsg).to.equal(chkouterrormessage_fix.expectedErrorMessage_for_all_fileds_empty);
      });

    // Check error message for first name
    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.continue_btn().click();
    cy.log("🔍 Verifying error message when last name is empty.");
    chkoutonepom
      .errorMsg_txt()
      .should("be.visible")
      .then(($el) => {
        const actualErrorMsg = $el.text().trim();
        if (actualErrorMsg === chkouterrormessage_fix.expectedErrorMessage_for_lastName_empty_filed) {
          cy.log(`✅ Error message matches expected: ${chkouterrormessage_fix.expectedErrorMessage_for_lastName_empty_filed}`);
        } else {
          cy.log(`❌ Error message mismatch: Expected '${chkouterrormessage_fix.expectedErrorMessage_for_lastName_empty_filed}', but got '${actualErrorMsg}'`);
        }
        expect(actualErrorMsg).to.equal(chkouterrormessage_fix.expectedErrorMessage_for_lastName_empty_filed);
      });

    // Check error message for last name
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.continue_btn().click();
    cy.log("🔍 Verifying error message when zip code is empty.");
    chkoutonepom
      .errorMsg_txt()
      .should("be.visible")
      .then(($el) => {
        const actualErrorMsg = $el.text().trim();
        if (actualErrorMsg === chkouterrormessage_fix.expectedErrorMessage_for_zipCode_empty_filed) {
          cy.log(`✅ Error message matches expected: ${chkouterrormessage_fix.expectedErrorMessage_for_zipCode_empty_filed}`);
        } else {
          cy.log(`❌ Error message mismatch: Expected '${chkouterrormessage_fix.expectedErrorMessage_for_zipCode_empty_filed}', but got '${actualErrorMsg}'`);
        }
        expect(actualErrorMsg).to.equal(chkouterrormessage_fix.expectedErrorMessage_for_zipCode_empty_filed);
      });
  });

  it("TC002 ==> Verify that placeholders for First Name, Last Name and Zipcode are visible properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();
    
    // Verifying placeholders
    cy.log("🔍 Verifying First Name placeholder.");
    chkoutonepom
      .firtName_field()
      .should(
        "have.attr",
        "placeholder",
        placeholder_fix.expected_firstname_placeholder
      );

    cy.log("🔍 Verifying Last Name placeholder.");
    chkoutonepom
      .lastName_field()
      .should(
        "have.attr",
        "placeholder",
        placeholder_fix.expected_lastname_placeholder
      );

    cy.log("🔍 Verifying Zip Code placeholder.");
    chkoutonepom
      .zipCode_field()
      .should(
        "have.attr",
        "placeholder",
        placeholder_fix.expected_zipcode_placeholder
      );
  });

  it("TC003 ==> Verify that Continue button is visible properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Verifying Continue button visibility and text.");
    chkoutonepom
      .continue_btn()
      .should("be.visible")
      .and("have.attr", "value", "Continue");
  });

  it("TC004 ==> Verify that Cancel button is visible and works properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Verifying Cancel button visibility and functionality.");
    chkoutonepom
      .cancel_btn()
      .should("be.visible")
      .and("have.text", "Cancel");

    chkoutonepom.cancel_btn().click();
    cy.url().should("eq", url_fix.cartPage_url);
    cy.log("✅ Cancel button works as expected.");
  });

  it('TC005 ==> Verify that First Name field works properly.', () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Verifying that First Name field works properly.");
    chkoutonepom.firtName_field().type(randomNames).should('have.value', randomNames);
  });

  it('TC006 ==> Verify that Last Name field works properly.', () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Verifying that Last Name field works properly.");
    chkoutonepom.lastName_field().type(randomNames).should('have.value', randomNames);
  });

  it('TC007 ==> Verify that Zip Code field works properly.', () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Verifying that Zip Code field works properly.");
    chkoutonepom.zipCode_field().type(randomZipCode).should('have.value', randomZipCode);
  });

  it('TC008 ==> Verify that Checkout Step Two page loads after entering details and clicking Continue button.', () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    cy.log("🔍 Entering data in First Name, Last Name, and Zip Code fields.");
    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);

    cy.log("🔍 Clicking on Continue button to move to next step.");
    chkoutonepom.continue_btn().click();
    
    cy.url().should('eq', url_fix.chkoutTwoPage_url);
    cy.log("✅ Successfully navigated to Checkout Step Two page.");
  });
});
