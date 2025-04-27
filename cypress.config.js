const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports', // Keeps reports in cypress/reports folder
    overwrite: true,
    html: true,
    json: false,
    // Ensure the assets are copied to the new folder (they should stay together)
    assetsDir: 'cypress/reports/assets', // Store assets in the 'assets' folder under 'cypress/reports'
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', (results) => {
        const browserName = process.env.BROWSER || config.browser.name || 'unknown';
        const reportName = process.env.REPORT_NAME || "browser";
        const specPath = process.env.SPEC_PATH || 'UnknownSpec.cy.js';
        const specName = path.basename(specPath, '.cy.js');

        const date = new Date();
        const hh = date.getHours().toString().padStart(2, '0');
        const mm = date.getMinutes().toString().padStart(2, '0');
        const timeStamp = `${hh}_${mm}`;

        // Path to the generated report (mochawesome.html)
        const sourcePath = path.join(__dirname, 'cypress', 'reports', 'mochawesome.html');

        // Create browser-specific folder (chrome, firefox, etc.)
        const destFolder = path.join(__dirname, 'reports', browserName.toLowerCase());
        if (!fs.existsSync(destFolder)) {
          fs.mkdirSync(destFolder, { recursive: true });
        }

        // Ensure assets folder is copied over if it exists
        const assetsSrcFolder = path.join(__dirname, 'cypress', 'reports', 'assets');
        const assetsDestFolder = path.join(destFolder, 'assets');
        if (fs.existsSync(assetsSrcFolder)) {
          fs.cpSync(assetsSrcFolder, assetsDestFolder, { recursive: true });
        }

        // Dynamic filename based on spec name, browser, and timestamp
        const destinationFilename = `Report_For_${reportName}_${browserName}_${timeStamp}.html`;
        const destinationPath = path.join(destFolder, destinationFilename);

        // Move and rename the generated report
        if (fs.existsSync(sourcePath)) {
          fs.renameSync(sourcePath, destinationPath);
          console.log(`✅ Report moved successfully: ${destinationPath}`);
        } else {
          console.error('❌ Report not found at:', sourcePath);
        }

        // Clean up mochawesome.json if it exists
        const jsonReportPath = path.join(__dirname, 'cypress', 'reports', 'mochawesome.json');
        if (fs.existsSync(jsonReportPath)) {
          fs.unlinkSync(jsonReportPath);
          console.log('🧹 Cleaned up mochawesome.json');
        }

        // Optional: Delete the empty cypress/reports folder (clean-up)
        const cypressReportsFolder = path.join(__dirname, 'cypress', 'reports');
        if (fs.existsSync(cypressReportsFolder)) {
          fs.rmSync(cypressReportsFolder, { recursive: true, force: true });
          console.log('🧹 Deleted temporary cypress/reports folder');
        }
      });
    },
  },
});


