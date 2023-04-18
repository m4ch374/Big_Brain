/// <reference types="cypress" />

describe('The happy path', () => {

  // Wish test could be seperated but cypress
  // clears localstorage between tests
  // and sessions cant help too
  it('Runs the happy path', () => {

    // Registers successfully
    cy.visit('http://localhost:3000/')
  
    cy.get('[aria-label="change-mode"]').click()

    cy.get('[aria-label="email-input"]').focus().type('test@test.com')
    cy.get('[aria-label="password-input"]').focus().type('test')
    cy.get('[aria-label="username-input"]').focus().type('test')

    cy.get('button[type="submit"]').click()

    // Create new game successfully
    cy.get('[aria-label="New game"]').click()
    cy.get('input#game').focus().type('Game1')
    cy.get('button[type="submit"]').click()

    // Starts a game successfully
    cy.get('button[aria-label="play game"]').click()
    cy.get('button[aria-label="close popup"]').click()

    // Ends a game successfully & loads the result seccessfully
    cy.get('button[aria-label="stop game"').click()
    cy.get('a:contains("Yes")').click()
    cy.get('button:contains("Next question")').click()

    // Logs out of the page successfully
    cy.get('button:contains("Logout")').click()

    // Logs back in successfully
    cy.get('[aria-label="email-input"]').focus().type('test@test.com')
    cy.get('[aria-label="password-input"]').focus().type('test')
    cy.get('button[type="submit"]').click()

    cy.get('button:contains("Logout")').should('exist')
  })
})
