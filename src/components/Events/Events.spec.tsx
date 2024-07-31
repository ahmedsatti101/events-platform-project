import React from "react";
import ViewAllEvents from "./Events";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

describe("Events component", () => {
    beforeEach(async () => {
        await render(<ViewAllEvents />);
    });

    it("Should render all events", async () => {
        await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
        await waitFor(() => {expect(screen.findAllByTestId("events")).not.toBeNull()}) 
    });
});
