# FABRIC Automation Framework ASSIGNMENT

This is an automated testing framework for the ParaBank application using Playwright and Allure reporting. The framework implements both UI and API testing capabilities.

## 🚀 Features

- UI Automation using Playwright
- API Testing capabilities
- Page Object Model (POM) implementation
- Allure reporting integration
- Cross-browser testing support
- Environment-specific configurations
- Data-driven testing approach
- CI/CD Integration with Jenkins

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Java Runtime Environment (JRE) for Allure reporting
- Jenkins Server (for CI/CD)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [https://github.com/godaramandeep/FabricAutomationAssignment.git]
cd fabricautomationassignment
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Install Allure command-line tool:
```bash
npm install -g allure-commandline
```

## 📁 Project Structure

```
├── api/                    # API test implementations
├── pages/                  # Page Object Models
├── tests/                  # Test specifications
├── utils/                  # Utility functions and helpers
├── testData/              # Test data files
├── playwright/            # Playwright configuration and auth
├── allure-results/        # Allure test results
└── playwright-report/     # Playwright HTML reports
```

## 🏃‍♂️ Running Tests

### Run all tests:
```bash
npm run test:prod
```

### Run tests with Allure reporting:
```bash
npm run test:allure:prod
```

### Run specific test tags:
```bash
# Run UI tests
npx playwright test --grep "@UI"

# Run API tests
npx playwright test --grep "@API"
```

## 📊 Reports

### Playwright Report
After test execution, view the Playwright report:
```bash
npx playwright show-report
```

### Allure Report
Generate and view Allure report:
```bash
allure generate ./allure-results --clean
allure open
```

## 🔧 Configuration

- `playwright.config.js` - Main configuration file for Playwright
- Environment variables can be set in `.env` file
- Test data can be modified in the `testData` directory

## 🧪 Test Structure

- API And UI Tests: Located in `tests/uiAPITest.spec.js`
- Page Objects: Located in `/pages/`
- Test Data: Located in `/testData/`

## 🔄 CI/CD with Jenkins

### Jenkins Setup Requirements

1. Required Jenkins Plugins:
   - NodeJS Plugin
   - Allure Jenkins Plugin
   - Pipeline Plugin

2. Global Tool Configuration:
   - Configure NodeJS installation (v18.x)
   - Configure Allure command-line tool

### Pipeline Configuration

1. Create a new Pipeline job in Jenkins:
   - Select "Pipeline script from SCM"
   - Choose Git as SCM
   - Specify your repository URL
   - Set the branch to build
   - Set the script path to "Jenkinsfile"

2. Pipeline Stages:
   - Checkout: Clones the repository
   - Setup Node.js: Configures Node.js environment
   - Install Dependencies: Installs npm packages and Playwright
   - Run Tests: Executes test suite
   - Generate Reports: Creates and publishes Allure reports

3. Post-build Actions:
   - Archives test results
   - Publishes Allure reports
   - Cleans workspace

### Running the Pipeline

The pipeline can be triggered:
- Manually through Jenkins UI
- Automatically on code push (if configured)
- On a schedule (if configured)

## 👥 Authors

- Mandeep Godara

## 🙏 Acknowledgments

- ParaBank for providing the test application
- Playwright team for the amazing testing framework
- Allure Framework for the reporting capabilities