
🛒 E-commerce Site - Cypress Automation

This project automates the **Add to Cart** and **Checkout** flow for an E-commerce web application using **Cypress** with **JavaScript**.  
It follows best practices like **Page Object Model (POM)** design, **Mocha** testing framework structure (`describe` and `it` blocks), dynamic test reporting, and GitHub integration.

✨ Key Features
- ✅ Automated "Add to Cart" and "Checkout" scenarios with success validation
- ✅ Built using **Cypress** and **Mocha** framework
- ✅ **Page Object Model (POM)** implemented for clean, maintainable code
- ✅ Dynamic test report generation with **Mocha Reporter**
- ✅ Integrated useful Cypress **plugins** to enhance testing
- ✅ Test data management (username, password, URLs, validations, etc.) stored separately
- ✅ Code versioned and pushed to **GitHub Repository**

📂 Project Structure
```
cypress/
  ├── integration/    (Test specs)
  ├── pages/          (Page Object Models)
  ├── fixtures/       (Test Data - username, password, URLs)
  ├── plugins/        (Cypress plugins)
  ├── support/        (Custom commands and reusable functions)
mochawesome-report/   (Dynamic Mocha Reports)
cypress.config.js     (Cypress Configuration)
package.json          (Dependencies and scripts)
```

🚀 How to Run
1. Clone the repository
2. Run `npm install` to install dependencies
3. Execute tests using `npx cypress open` or `npx cypress run`
4. View detailed reports in the `mochawesome-report` folder

📜 Tech Stack
- Cypress
- JavaScript
- Mocha
- Mochawesome Reporter
- Page Object Model (POM)
- GitHub


