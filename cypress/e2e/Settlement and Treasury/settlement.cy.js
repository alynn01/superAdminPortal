import { it } from "mocha";
import { getSuperAdmin } from "../../fixtures/index.js";
import { LoginPage, SettlementPage } from "../../support/pages/index";

const loginPage = new LoginPage();
const getSA = getSuperAdmin();
const settlementPage = new SettlementPage();

describe("Settlement and Treasury", () => {
  beforeEach(() => {
    loginPage.accessLoginModal();
    loginPage.login(getSA.email, getSA.password);
    settlementPage.accessSettlementPage();
  });

  it("Test that the user is able to view emoney balance", () => {
    settlementPage.accessEMoneyBalance();
  });
  it("Test that the user is able to view company balance", () => {
    settlementPage.accessCompanyBalance();
  });
  it("Test that user can filter the report based on transaction  type", () => {
    settlementPage.filterByDebit();
  });
  it("Test that the user can filter the report based on company name", () => {
    settlementPage.filterByCompany();
  });
  it("Test that the user can filter the report based on amount", () => {
    settlementPage.filterByAmount();
  });
  it("Test that user can filter by date", () => {
    settlementPage.filterByDate();
  });
  it("Test that the user is able to search the report using the search field", () => {
    settlementPage.searchReport();
  })
});
