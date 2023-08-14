const serverId = "pilqbdug";
const serverDomain = serverId + "@mailosaur.io";
let usersEmail = "signyou" + serverDomain;


export class SettlementPage {
  settlementTab = () =>
    cy
      .get(":nth-child(5) > .menu_container_sidebar > .link_text")
      .contains("Settlement/treasury");
  viewEMoneyBalance = () =>
    cy.get(`[class="link_text_card"]`).contains("View eMoney balance");
  viewCompanyBalance = () =>
    cy.get(`[class="link_text_card"]`).contains("View client/company balance");
  selectCompany = () => cy.get('.sc-eghvBh');
  clickNextButton = () =>
    cy.get(
      '[style="margin-top: 4.1rem; border-top: 1px solid rgb(229, 229, 229); padding-top: 1rem; position: absolute; top: 45%; width: 85%;"] > .sc-kMrHXl'
    );

  accessSettlementPage() {
    this.settlementTab().click();
    cy.contains("Settlement and treasury").should("be.visible");
  }

  accessEMoneyBalance() {
    this.viewEMoneyBalance().click();
    cy.contains("eMoney balance").should("be.visible");
    cy.contains("Close").scrollIntoView();
    cy.contains("Close").click();
  }

  accessCompanyBalance() {
    this.viewCompanyBalance().click();
    cy.contains("View client/company balance").should("be.visible");
    cy.get(`input[class="input_text"]`).type("Ujay");
    this.selectCompany().contains("Ujay Enterprises").click({ force: true });
    cy.wait(3000);
    this.clickNextButton().contains("Next").click();
    cy.contains("Client/Company balance").should("be.visible");
    cy.contains("3635816782").should("be.visible");
    cy.contains("Close").click();
  }
  filterByDebit() {
    cy.get("table").contains("Credit").should("be.visible");
    cy.get('input[id="react-select-3-input"').click();
    cy.wait(2000);
    cy.contains("Debit").click();
    cy.wait(2000);
    cy.get(".btn_filter").click();
    cy.get("table").contains("Debit").should("be.visible");
    cy.get("table").contains("Credit").should("not.exist");
  }
  filterByCompany(){
    cy.get("table").contains("Essolo").scrollIntoView();
    cy.get("table").contains("Essolo").should("be.visible");
    cy.get('input[id="react-select-4-input"').click();
    cy.contains("Ujay Enterprises").scrollIntoView();
    cy.contains("Ujay Enterprises").click()
    cy.wait(2000);
    cy.get(".btn_filter").click();
    cy.get("table").contains("Ujay Enterprises").should("be.visible");
    cy.get("table").contains("Essolo").should("not.exist");
  }
  filterByAmount(){
    cy.get("table").contains("20.00").scrollIntoView();
    cy.get("table").contains("20.00").should("be.visible");
    cy.get(`input[placeholder="Amount"]`).type("45.00");
    cy.wait(2000);
    cy.get(".btn_filter").click();
    cy.get("table").contains("45.00").should("be.visible");
    cy.get("table").contains("20.00").should("not.exist");
  }
  filterByDate(){
    cy.get(`div[class="react-datepicker__input-container "]`).click();
    cy.get('.react-datepicker__navigation').click();
    cy.get('.react-datepicker__day--017').click();
    cy.get('.react-datepicker__day--017').click();
    cy.wait(2000);
    cy.get(".btn_filter").click();
    cy.get('tbody > :nth-child(1) > :nth-child(1) > div').contains("17").should("be.visible");
  }
  searchReport(){
    cy.get("table").contains("Ujay Enterprises").scrollIntoView();
    cy.get("table").contains("Ujay Enterprises").should("be.visible");
    cy.get(`input[placeholder="Search"]`).type("KudusLimited")
    cy.wait(8000);
    cy.get("table").contains("KudusLimited").should("be.visible");
    cy.get("table").contains("Ujay Enterprises").should("not.exist");
  }

  eMoneyTopup(){
    cy.get(`button:contains("Top-up eMoney")`).click();
    cy.get('h2').contains("Top-up eMoney");
    cy.get('[style="margin-top: 1.3rem;"] > .sc-bHCjkL > .input_text').click();
    cy.contains("Essolo USD account").click();
    cy.get(':nth-child(4) > .sc-bHCjkL > .input_text').click();
    cy.contains("UBA").click();
    cy.wait(2000);
    cy.get(':nth-child(5) > .sc-bHCjkL > .input_text').click();
    cy.contains("GTP").click();
    cy.wait(2000);
    cy.get(':nth-child(6) > .sc-bHCjkL > .input_text').type("Ujay")
    cy.get('.sc-ckTduy').contains("Ujay Enterprises").click();
    cy.get(`input[name="amount"]`).type('1');
    cy.get(`textarea[name="narration"]`).type("Auto test");
    cy.get(`button:contains("Proceed")`).click();
  }

   uploadInvalidFile(){
    const fileToUpload = "sta.pdf";
    cy.get('.file-upload-input').attachFile(fileToUpload)
  }

  proceedSubmission(){
    cy.get(`button:contains("Upload and continue")`).click();
    cy.get('.note_action > span').contains("This action is irreversible").should('be.visible');
    cy.get('h2').contains("Confirm transaction").should('be.visible');
    cy.get(`button:contains("Confirm and top-up eMoney")`).click();
    cy.get('.ReactModal__Content > :nth-child(4) > .sc-bHCjkL > .input_text').click();
    cy.contains('Email').click();
    cy.get(`button:contains("Yes, continue")`).click();
  }

  getVerificationOTP() {
    const currentDate = new Date();
    const twoMinutesAgo = new Date(currentDate.getTime() - 2 * 60 * 1000);
    const serverId = "pilqbdug";
    const searchCriteria = { sentTo: "superAdmin@pilqbdug.mailosaur.net" };
    return cy
      .mailosaurGetMessage(serverId, searchCriteria, {
        sentTo: "superAdmin@pilqbdug.mailosaur.net",
        receivedAfter: twoMinutesAgo,
        timeout: 40000,
      })
      .then((email) => {
        expect(email.subject).to.equal("OTP");
        return email.html.codes[0].value;
      });
      
  }
}
