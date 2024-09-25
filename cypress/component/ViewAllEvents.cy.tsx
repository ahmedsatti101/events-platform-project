import React from "react";
import ViewAllEvents from "../../src/components/Events/Events";
import { mount } from "cypress/react18";

beforeEach(() => {
    mount(<ViewAllEvents />);
});

describe('ViewAllEvents.cy.tsx', () => {
    describe("Events card attributes", () => {
        it('Event cards should be visible on screen', () => {
            cy.get('[data-testid=events]').should('be.visible')
        })

        it('Should display correct event title', () => {
            const eventHeader = "event-header";
            cy.get(`[id=${eventHeader}]`).should("be.visible")
            cy.get(`[id=${eventHeader}]`).contains("Test event")
        })

        it("Event location should be visible on screen", () => {
            const eventLocation = "event-location";
            cy.get(`[id=${eventLocation}]`).should("be.visible")
            cy.get(`[id=${eventLocation}]`).should("have.text", "Test location");
        });

        it("Expand icon should be clickable", () => {
            const icon = "expand-more-icon";
            cy.get(`[data-testid=${icon}]`).should("be.visible");
            cy.get(`[data-testid=${icon}]`).click();
        });

        it("Event description should be visible", () => {
            cy.get("[data-testid=expand-more-icon]").click();
            const id = "event-description";
            cy.get(`[id=${id}]`).should("be.visible");
            cy.get(`[id=${id}]`).should("have.text", "Test description");
        });

        it("'Learn more' text should be visible on screen", () => {
            const eventActions = "event-actions";
            const children = cy.get(`[id=${eventActions}]`).children().get("p");

            cy.get(`[id=${eventActions}]`).should("be.visible")
            children.should("contain.text", "Learn more")
        });

        it("Sign up button should be clickable", () => {
            const id = "sign-up-button";
            cy.get(`[id=${id}]`).should("be.visible");
            cy.get(`[id=${id}]`).click();
        });
    })
})
