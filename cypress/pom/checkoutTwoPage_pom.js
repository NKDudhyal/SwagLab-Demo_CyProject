class checkoutTwoPage_POM{
    title_txt(){
        return cy.get(".title")
    }

    productPrice_txt(){
        return cy.get('[data-test="inventory-item-price"]')
    }

    subTotalPrice_txt(){
        return cy.get('[data-test="subtotal-label"]')
    }

    totalPriceWithTax_txt(){
        return cy.get('[data-test="total-label"]')
    }

    cancel_btn(){
        return cy.get("#cancel")
    }

    finish_btn(){
        return cy.get("#finish")
    }

    
}

export default checkoutTwoPage_POM