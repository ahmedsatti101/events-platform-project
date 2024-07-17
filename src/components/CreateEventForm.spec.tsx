/**
  2
  3 * @jest-environment jsdom
  4
  5 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEventForm from "./CreateEventForm";

describe("CreateEventForm component", () => {
  beforeEach(() => {
    render(<CreateEventForm />);
  });

  it("should render form", () => {
    const element = screen.getByText(/Create event/i);
    expect(element).toBeInTheDocument();
  });

  it("submit empty form", async () => {
    const user = userEvent.setup();
    const element = screen.getByRole("button", { name: /Save/i });
    await user.click(element);

    expect(screen.getByText("title is a required field")).toBeInTheDocument();
  });

  describe("form labels", () => {
    it("title label", () => {
      const titleLabel = screen.getByTestId("title-test");
      expect(titleLabel.getAttribute("for")).toBe("title");
    });
  });

  describe("form input validation", () => {
    it("title input matches specified validation", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-title");
      await user.type(input, "Manchester cycling event");
      const element = screen.getByRole("button", { name: /Save/i });
      await user.click(element);
      expect(input).toHaveValue("Manchester cycling event");
      expect(screen.getByText("title is a required field")).not.toBeTruthy();
    });

    it("description input matches specified validation", async () => {
      // render(<CreateEventForm />);
      const user = userEvent.setup();
      const input = screen.getByTestId("input-description");
      await user.type(input, "Manchester cycling event");
      const element = screen.getByRole("button", { name: /Save/i });
      await user.click(element);
      screen.debug()
      await waitFor(() => {
        expect(screen.getByText("description is a required field")).not.toBeInTheDocument();
      })
    });
  });
});
