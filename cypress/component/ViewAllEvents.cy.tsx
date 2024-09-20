import React from "react";
import ViewAllEvents from "../../src/components/Events/Events";
import { mount } from "cypress/react18";

beforeEach(() => {
    mount(<ViewAllEvents />);
});

describe('ViewAllEvents.cy.tsx', () => {
  it('Users are able to see listed events', () => {
      cy.get('[data-testid=events]').should('be.visible')
  })

  it('Should display correct event title', () => {
      cy.get('[id=event-header]').contains("Test")
  })
})
