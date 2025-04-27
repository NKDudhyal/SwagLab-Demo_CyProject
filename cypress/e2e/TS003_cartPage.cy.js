/// <reference types="cypress"/>
import {
  inventorypagepom,
  setupEnv,
  logindetails_fix,
  cartpagepom,
  headerpom,
  url_fix,
} from "../support/setup.js";

describe("Cart Page Test Cases", () => {
  setupEnv();

  it("TC001 ==> Verify that title is displayed properly and also cart page.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    
    cy.log("🔍 Verifying that the cart title is displayed.");
    const expectedTitle = "Your Cart";
    cartpagepom
      .cartTitle_txt()
      .should("be.visible")
      .invoke("text")
      .then((actualTitle) => {
        if (actualTitle.trim() === expectedTitle) {
          cy.log(`✅ Title matches expected: ${expectedTitle}`);
        } else {
          cy.log(`❌ Title mismatch: Expected '${expectedTitle}', but got '${actualTitle.trim()}'`);
        }
        expect(actualTitle.trim()).to.equal(expectedTitle);
      });
  });

  it("TC002 ==> Verify that Continue Shopping button is visible and button text is proper.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    
    cy.log("🔍 Verifying Continue Shopping button visibility and text.");
    const expectedButtonName = "Continue Shopping";
    cartpagepom
      .continueShopping_btn()
      .should("be.visible")
      .invoke("text")
      .then((actualButtonName) => {
        if (actualButtonName.trim() === expectedButtonName) {
          cy.log(`✅ Button text matches expected: ${expectedButtonName}`);
        } else {
          cy.log(`❌ Button text mismatch: Expected '${expectedButtonName}', but got '${actualButtonName.trim()}'`);
        }
        expect(actualButtonName.trim()).to.equal(expectedButtonName);
      });
  });

  it("TC003 ==> Verify that Checkout button is visible and button text is proper.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    
    cy.log("🔍 Verifying Checkout button visibility and text.");
    const expectedButtonName = "Checkout";
    cartpagepom
      .checkout_btn()
      .should("be.visible")
      .invoke("text")
      .then((actualButtonName) => {
        if (actualButtonName.trim() === expectedButtonName) {
          cy.log(`✅ Button text matches expected: ${expectedButtonName}`);
        } else {
          cy.log(`❌ Button text mismatch: Expected '${expectedButtonName}', but got '${actualButtonName.trim()}'`);
        }
        expect(actualButtonName.trim()).to.equal(expectedButtonName);
      });
  });

  it("TC004 ==> Verify that Continue Shopping functionality works properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    
    cy.log("🔍 Verifying Continue Shopping button functionality.");
    cy.url().should("eq", url_fix.cartPage_url);
    cartpagepom.continueShopping_btn().click();
    
    cy.url().should("eq", url_fix.inventoryPage_url);
    cy.log("✅ Continue Shopping functionality works as expected.");
  });

  it("TC005 ==> Verify that Checkout functionality works properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    
    cy.log("🔍 Verifying Checkout button functionality.");
    cy.url().should("eq", url_fix.cartPage_url);
    cartpagepom.checkout_btn().click();
    
    cy.url().should("eq", url_fix.chkoutOnePage_url);
    cy.log("✅ Checkout functionality works as expected.");
  });

  it("TC006 ==> Verify that added product should be visible in cart page properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    cy.addRandomProductAndVerifyInCart();
    cy.log("✅ Added product verified in cart page.");
  });

  it("TC007 ==> Verify remove button should be visible after adding product.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    inventorypagepom.addSouceLabBackpack().click();
    headerpom.cartIcon().click();
    
    cy.url().should("eq", url_fix.cartPage_url);
    
    cy.log("🔍 Verifying Remove button visibility.");
    const expectedButtonName = "Remove";
    cartpagepom
      .remove_btn()
      .should("be.visible")
      .invoke("text")
      .then((actualButtonName) => {
        if (actualButtonName.trim() === expectedButtonName) {
          cy.log(`✅ Remove button is visible with expected text: ${expectedButtonName}`);
        } else {
          cy.log(`❌ Remove button mismatch: Expected '${expectedButtonName}', but got '${actualButtonName.trim()}'`);
        }
        expect(actualButtonName.trim()).to.equal(expectedButtonName);
      });
  });

  it("TC008 ==> Verify that after adding two products then two remove buttons should be visible", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();
    headerpom.cartIcon().click();
    
    // Get cart count properly
    headerpom.cartCount().then(($totalCount) => {
      const cartCountText = $totalCount.text().trim();
      const cartCount = parseInt(cartCountText);

      cy.log(`🔍 Verifying Remove button count: ${cartCount}`);
      
      // Now verify the Remove buttons
      cartpagepom.removeList_btn().should("have.length", cartCount);
      cy.log(`✅ Verified that ${cartCount} Remove buttons are visible.`);
    });
  });
});
