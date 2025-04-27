class checkoutOnePage_POM {
    firtName_field(){
        return cy.get("#first-name")
    }

    lastName_field(){
        return cy.get("#last-name")
    }

    zipCode_field(){
        return cy.get("#postal-code")
    }

    continue_btn(){
        return cy.get("#continue")
    }

    cancel_btn(){
        return cy.get("#cancel")
    }

    errorMsg_txt(){
        return cy.get("h3[data-test='error']")
    }
}

export default checkoutOnePage_POM