import { getSuperAdmin } from "../../fixtures/index.js";
import { LoginPage } from "../../support/pages/index";

const loginPage = new LoginPage();
const getSA = getSuperAdmin();

describe("Login Test", () => {
  beforeEach(() => {
    loginPage.accessLoginModal();
  });

  it("Test that user is unable to login with wrong email but correct password", () => {
    loginPage.login("damiuser001@yop", getSA.password);
    cy.get(`.Toastify__toast-body>div:last-child`, { timeout: 5000 }).should('contain', 'Invalid login details');
  });

  it("Test that user is unable to login with correct email but wrong password", () => {
    loginPage.login(getSA.email, "Password");
    cy.contains("Welcome to the MSIA NOC Global Switch!").should("be.visible");
    cy.get(`.Toastify__toast-body>div:last-child`, { timeout: 5000 }).should('contain', 'Invalid email or password');
  });

  it("Test that user is unable to login without email but correct password", () => {
    cy.get(`input[name="password"]`).type(getSA.password);
    cy.get(`button[type="submit"]`).contains("Sign In").click();
    cy.contains("email is a required field").should("be.visible");
  });

  it("Test that user is unable to login with correct email but no password", () => {
    cy.get(`input[name="email"]`).type(getSA.email);
    cy.get(`button[type="submit"]`).contains("Sign In").click();
    cy.contains("password is a required field").should("be.visible");
  });

  it("Test that user is unable to login without email or password", () => {
    cy.get(`button[type="submit"]`).contains("Sign In").click();
    cy.contains("email is a required field").should("be.visible");
    cy.contains("password is a required field").should("be.visible");
  });

  it("Test that user is unable to login with valid email and password", () => {
    loginPage.login(getSA.email, getSA.password);
    cy.contains("Welcome, Amayindi!").should("be.visible");
  });
});