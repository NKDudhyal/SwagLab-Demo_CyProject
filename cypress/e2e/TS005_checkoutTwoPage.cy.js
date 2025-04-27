///<reference types="cypress"/>

import {
  setupEnv,
  logindetails_fix,
  loginerrormessages_fix,
  placeholder_fix,
  url_fix,
  chkouterrormessage_fix,
  inventorypagepom,
  loginpagepom,
  cartpagepom,
  headerpom,
  chkoutonepom,
  chkouttwopom,
  randomNames,
  randomZipCode
} from "../support/setup.js";

describe("Test Case for Checkout Step Two Page", () => {
  setupEnv();

  it("TC001 ==> Verify that the title displays properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);
    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    chkoutonepom.continue_btn().click();

    cy.log("🔍 Verifying the page title.");
    chkouttwopom.title_txt().should("have.text", "Checkout: Overview");
    cy.log("✅ Title matches expected: 'Checkout: Overview'");
  });

  it("TC002 ==> Verify that item price displays properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);

    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();

    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    chkoutonepom.continue_btn().click();

    cy.log("🔍 Verifying the item prices.");
    let itemPrices = [];

    chkouttwopom.productPrice_txt().each(($el) => {
      const priceText = $el.text().replace('$', '');
      itemPrices.push(parseFloat(priceText));
    }).then(() => {
      const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);
      cy.log(`✅ Subtotal calculated: $${subtotal}`);

      chkouttwopom.subTotalPrice_txt().invoke('text').then((subtotalText) => {
        const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
        expect(displayedSubtotal).to.eq(subtotal);
        cy.log("✅ Subtotal displayed correctly.");

        const tax = +(subtotal * 0.0801).toFixed(2);
        const expectedTotal = +(subtotal + tax).toFixed(2);

        chkouttwopom.totalPriceWithTax_txt().invoke('text').then((totalText) => {
          const displayedTotal = parseFloat(totalText.replace('Total: $', ''));
          expect(displayedTotal).to.eq(expectedTotal);
          cy.log("✅ Total price with tax displayed correctly.");
        });
      });
    });
  });

  it("TC003 ==> Verify that total price displays properly with tax.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);

    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();

    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    chkoutonepom.continue_btn().click();

    cy.log("🔍 Verifying that the total price with tax is correct.");
    let itemPrices = [];

    chkouttwopom.productPrice_txt().each(($el) => {
      const priceText = $el.text().replace('$', '');
      itemPrices.push(parseFloat(priceText));
    }).then(() => {
      const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);

      chkouttwopom.subTotalPrice_txt().invoke('text').then((subtotalText) => {
        const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
        expect(displayedSubtotal).to.eq(subtotal);

        const tax = +(subtotal * 0.0801).toFixed(2);
        const expectedTotal = +(subtotal + tax).toFixed(2);

        chkouttwopom.totalPriceWithTax_txt().invoke('text').then((totalText) => {
          const displayedTotal = parseFloat(totalText.replace('Total: $', ''));
          expect(displayedTotal).to.eq(expectedTotal);
          cy.log("✅ Total price with tax displayed correctly.");
        });
      });
    });
  });

  it("TC004 ==> Verify that the Cancel button functions properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);

    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();

    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    
    cy.log("🔍 Verifying Cancel button functionality.");
    chkouttwopom.cancel_btn().click();
    cy.url().should('eq', url_fix.cartPage_url);
    cy.log("✅ Cancel button works correctly and redirects to the cart page.");
  });

  it("TC005 ==> Verify that Finish button functions properly.", () => {
    cy.login(logindetails_fix.username, logindetails_fix.password);

    inventorypagepom.addSouceLabBackpack().click();
    inventorypagepom.addSauceLabBikeLight().click();

    headerpom.cartIcon().click();
    cartpagepom.checkout_btn().click();

    chkoutonepom.firtName_field().type(randomNames);
    chkoutonepom.lastName_field().type(randomNames);
    chkoutonepom.zipCode_field().type(randomZipCode);
    chkoutonepom.continue_btn().click();

    cy.log("🔍 Verifying Finish button functionality.");
    chkouttwopom.finish_btn().click();
    cy.url().should("eq", url_fix.completePage_url);
    cy.log("✅ Finish button works correctly and redirects to the complete page.");
  });
});
