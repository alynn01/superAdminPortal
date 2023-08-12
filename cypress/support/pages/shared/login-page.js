import { sharedData } from "../../../fixtures/index";

export class LoginPage {
  emailField = () => cy.get(`input[name="email"]`);
  passwordField = () => cy.get(`input[name="password"]`);
  loginButton = () => cy.get(`button[type="submit"]`).contains("Sign In");

  accessLoginModal() {
    cy.visit(sharedData.paths.login);
    cy.contains("Choose your default language").should('be.visible');
    cy.get('span').contains("Continue to Access").click();
  }

  clickLogin = () => {
    return this.loginButton().click({ force: true });
  };

  login = (email, password) => {
    this.emailField().type(email);
    this.passwordField().type(password);
    return this.clickLogin();
  };
}
