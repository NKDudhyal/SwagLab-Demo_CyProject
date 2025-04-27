/// <reference types="cypress"/>
import {
  logindetails_fix,
  loginerrormessages_fix,
  setupEnv,
  loginpagepom,
  placeholder_fix,
  url_fix
} from "../support/setup.js";

describe("Login Page Test Cases", () => {
  setupEnv();

  it("TC001 ==> Verify that user should login with valid credentials.", () => {
    cy.log("Step 1: Type username in the username field.");
    loginpagepom.usename_txtFiled().type(logindetails_fix.username);

    cy.log("Step 2: Type password in the password field.");
    loginpagepom.password_txtFiled().type(logindetails_fix.password);

    cy.log("Step 3: Click on the login button.");
    loginpagepom.login_btn().click();

    cy.log("Step 4: Validate if the user is redirected to the inventory page.");
    cy.url().should("eq", url_fix.inventoryPage_url);
  });

  it("TC002 ==> Verify that after entering invalid credentials error message display as expected.", () => {
    cy.log("Step 1: Type invalid username in the username field.");
    loginpagepom.usename_txtFiled().type("testingxyz");

    cy.log("Step 2: Type invalid password in the password field.");
    loginpagepom.password_txtFiled().type("test@120");

    cy.log("Step 3: Click on the login button.");
    loginpagepom.login_btn().click();

    cy.log("Step 4: Validate the error message for invalid login.");
    loginpagepom
      .errorMsg_txt()
      .should("be.visible")
      .then(($el) => {
        const actualErrorMsg = $el.text().trim();
        const expectedErrorMsg = loginerrormessages_fix.expectedErroMessage_for_invalid_login_details;

        // If condition to check if the error message matches the expected message
        if (actualErrorMsg === expectedErrorMsg) {
          cy.log("Step 5: Error message is displayed as expected.");
        } else {
          cy.log("Step 5: Error message is not as expected.");
        }
        expect(actualErrorMsg).to.equal(expectedErrorMsg);
      });
  });

  it("TC003 ==> Verify that user should not login with empty credentials.", () => {
    cy.log("Step 1: Click on the login button with empty credentials.");
    loginpagepom.login_btn().click();

    cy.log("Step 2: Validate the error message for empty credentials.");
    loginpagepom.errorMsg_txt().then(($el) => {
      const actualErrorMsg = $el.text().trim();
      const expectedErrorMsg = loginerrormessages_fix.expectedErrorMessage_for_empty_credentails;

      // If condition to check if the error message matches the expected message
      if (actualErrorMsg === expectedErrorMsg) {
        cy.log("Step 3: Error message is displayed as expected.");
      } else {
        cy.log("Step 3: Error message is not as expected.");
      }
      expect(actualErrorMsg).to.equal(expectedErrorMsg);
    });
  });

  it("TC004 ==> Verify that user should not login with valid username and empty password.", () => {
    cy.log("Step 1: Type valid username in the username field.");
    loginpagepom.usename_txtFiled().type(logindetails_fix.username);

    cy.log("Step 2: Click on the login button with empty password.");
    loginpagepom.login_btn().click();

    cy.log("Step 3: Validate the error message for empty password.");
    loginpagepom
      .errorMsg_txt()
      .should("be.visible")
      .then(($el) => {
        const actualErrorMsg = $el.text().trim();
        const expectedErrorMsg = loginerrormessages_fix.expectedErrorMessage_for_empty_password;

        // If condition to check if the error message matches the expected message
        if (actualErrorMsg === expectedErrorMsg) {
          cy.log("Step 4: Error message is displayed as expected.");
        } else {
          cy.log("Step 4: Error message is not as expected.");
        }
        expect(actualErrorMsg).to.equal(expectedErrorMsg);
      });
  });

  it("TC005 ==> Verify placeholders for username and password fields.", () => {
    cy.log("Step 1: Check placeholder for username field.");
    loginpagepom
      .usename_txtFiled()
      .should(
        "have.attr",
        "placeholder",
        placeholder_fix.expected_username_placeholder
      )
      .then(() => {
        cy.log("Step 2: Placeholder for username field is as expected.");
      });

    cy.log("Step 3: Check placeholder for password field.");
    loginpagepom
      .password_txtFiled()
      .should(
        "have.attr",
        "placeholder",
        placeholder_fix.expected_password_placeholder
      )
      .then(() => {
        cy.log("Step 4: Placeholder for password field is as expected.");
      });
  });

  it('TC006 ==> Verify that login button is visible and name is "Login".', () => {
    cy.log("Step 1: Check if login button is visible.");
    loginpagepom.login_btn().should("be.visible");

    cy.log('Step 2: Verify that the login button has text "Login".');
    loginpagepom.login_btn().should("have.attr", "value", "Login");
  });
});
