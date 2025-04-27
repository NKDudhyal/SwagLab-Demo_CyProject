class loginPage_POM {
  usename_txtFiled() {
    return cy.get("#user-name");
  }

  password_txtFiled() {
    return cy.get("#password");
  }

  login_btn() {
    return cy.get("#login-button");
  }

  errorMsg_txt() {
    return cy.get("div h3");
  }
}

export default loginPage_POM;
