class completeAage_POM{

    successfullHeading_txt(){
        return cy.get(".complete-header")
    }

    backHome_btn(){
        return cy.get("#back-to-products")
    }
}

export default completeAage_POM;

