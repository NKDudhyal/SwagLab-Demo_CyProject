/// <reference types='cypress'/>

let logindetails_fix;
let loginerrormessages_fix;
let placeholder_fix;
let url_fix;
let chkouterrormessage_fix;
let successfullmessage_fix;

let loginpagepom;
let inventorypagepom;
let cartpagepom;
let headerpom;
let chkoutonepom;
let chkouttwopom;
let compeletpagepom;
let footerpom;

let randomNames;
let randomZipCode;

import LoginPagePOM from "../pom/loginPage_pom";
import InventoryPagePOM from "../pom/inventoryPage_pom";
import CartPagePOM from "../pom/cartPage_pom";
import HeaderPOM from "../pom/header_pom";
import CheckoutOnePOM from "../pom/checkoutOnePage_pom";
import CheckoutTwoPOM from "../pom/checkoutTwoPage_pom";
import CompletePagePOM from "../pom/completePage_pom";
import FooterPOM from "../pom/footer_pom";

export function setupEnv() {
  beforeEach("", () => {
    cy.viewport("macbook-11");
    cy.visit("https://www.saucedemo.com/");
    cy.fixture("validLoginCredentials").then((data) => {
      logindetails_fix = data;
    });
    cy.fixture("loginValidation.json").then((data) => {
      loginerrormessages_fix = data;
    });
    cy.fixture("placeholders.json").then((data) => {
      placeholder_fix = data;
    });
    cy.fixture("urls.json").then((data) => {
      url_fix = data;
    });
    cy.fixture("checkoutValidation.json").then((data) => {
      chkouterrormessage_fix = data;
    });
    cy.fixture("successfullValidation.json").then((data) => {
      successfullmessage_fix = data;
    });

    loginpagepom = new LoginPagePOM();
    inventorypagepom = new InventoryPagePOM();
    cartpagepom = new CartPagePOM();
    headerpom = new HeaderPOM();
    chkoutonepom = new CheckoutOnePOM();
    chkouttwopom = new CheckoutTwoPOM();
    compeletpagepom = new CompletePagePOM();
    footerpom = new FooterPOM();

    Cypress.Commands.add("login", (username, password) => {
      loginpagepom.usename_txtFiled().type(username);
      loginpagepom.password_txtFiled().type(password);
      loginpagepom.login_btn().click();
    });
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("ResizeObserver loop completed")) {
        return false;
      }
      return false;
    });

    randomNames = Math.random().toString(36).substring(2, 10);
    randomZipCode = Math.floor(10000 + Math.random() * 90000); // Always 5 digits
  });

  afterEach(function () {
    if (this.currentTest.state === 'failed') {
      const screenshotName = `${Cypress.spec.name}--${this.currentTest.title}--${Date.now()}`;
      cy.screenshot(screenshotName); // Capture screenshot if the test fails
    }
  });
}

export {
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
  footerpom,
  randomNames,
  randomZipCode,
};
