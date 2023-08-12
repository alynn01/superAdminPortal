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

});