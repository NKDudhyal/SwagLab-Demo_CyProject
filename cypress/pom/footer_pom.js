class footer_POM{
    twitter_lnk(){
        return cy.get("a[href='https://twitter.com/saucelabs']").invoke('removeAttr','target')
    }

    facebook_lnk(){
        return cy.get("a[href='https://www.facebook.com/saucelabs']").invoke('removeAttr','target')
    }

    linkedIn_lnk(){
        return cy.get("a[href='https://www.linkedin.com/company/sauce-labs/']").invoke('removeAttr','target')
    }

    copyright_txt(){
        return cy.get(".footer_copy")
    }
}

export default footer_POM;