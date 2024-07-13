/**
  2
  3 * @jest-environment jsdom
  4
  5 */

import React from "react";
import { render, screen } from "@testing-library/react";
import CreateEventForm from "./CreateEventForm";

describe("create form", () => {
  it("should create a form", () => {
    render(<CreateEventForm />);
    const element = screen.getByText(/Create event/i);
    expect(element).toBeInTheDocument();
  });

  describe("form labels", () => {
    it("title label", () => {
      render(<CreateEventForm />);
      const titleLabel = screen.getByTestId("title-test");
      expect(titleLabel.getAttribute("for")).toBe("title");
    });
  });
});
