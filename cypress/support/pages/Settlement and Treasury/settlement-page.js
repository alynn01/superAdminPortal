export class SettlementPage{
    settlementTab = () => cy.get(':nth-child(5) > .menu_container_sidebar > .link_text').contains("Settlement/treasury");
    viewEMoneyBalance = () => cy.get(`[class="link_text_card"]`).contains("View eMoney balance");
    viewCompanyBalance = () => cy.get(`[class="link_text_card"]`).contains("View client/company balance");
    selectCompany = () => cy.get('.sc-hZLPDR');
    clickNextButton = () => cy.get('[style="margin-top: 4.1rem; border-top: 1px solid rgb(229, 229, 229); padding-top: 1rem; position: absolute; top: 45%; width: 85%;"] > .sc-kMrHXl');


    accessSettlementPage(){
    this.settlementTab().click()
    cy.contains("Settlement and treasury").should('be.visible')
    }

    accessEMoneyBalance(){
        this.viewEMoneyBalance().click();
        cy.contains("eMoney balance").should('be.visible');
        cy.contains("Close").scrollIntoView();
        cy.contains("Close").click();
    }

    accessCompanyBalance(){
        this.viewCompanyBalance().click();
        cy.contains("View client/company balance").should('be.visible');
        cy.get(`input[class="input_text"]`).type("Ujay");
        this.selectCompany().contains("Ujay Enterprises").click({force:true});
        cy.wait(3000)
        this.clickNextButton().contains("Next").click();
        cy.contains("Client/Company balance").should('be.visible')
        cy.contains("3635816782").should('be.visible')
        cy.contains("Close").click();
    }
}

