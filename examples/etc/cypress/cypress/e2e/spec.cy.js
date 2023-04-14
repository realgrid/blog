describe('template spec', () => {
    it('passes', () => {
        cy.visit('http://store.demo.com')

        cy.get('#accept-all', { timeout: 10000 }).should('be.visible');
        cy.get('#accept-all').click()

        cy.get('a[href*="/sports"] img').click()
    })
})