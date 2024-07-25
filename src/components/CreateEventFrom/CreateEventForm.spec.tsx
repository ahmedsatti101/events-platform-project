/**
  
   * @jest-environment jsdom

   */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateEventForm from "./CreateEventForm";

describe("CreateEventForm component", () => {
  beforeEach(() => {
    render(<CreateEventForm />);
  });

  it("should render form", () => {
    const element = screen.getByTestId("event-form");
    expect(element).toBeInTheDocument();
  });

  it("submit empty form", async () => {
    const user = userEvent.setup();
    const element = screen.getByRole("button", { name: /Save/i });
    await user.click(element);

    expect(screen.getByText("title is a required field")).toBeInTheDocument();
    expect(screen.getByText("title is a required field")).toBeInTheDocument();

    expect(
      screen.getByText("description is a required field")
    ).toBeInTheDocument();

    expect(screen.getByText("please enter a valid date")).toBeInTheDocument();

    expect(
      screen.getByText("startTime must be exactly 5 characters")
    ).toBeInTheDocument();

    expect(
      screen.getByText("endTime must be exactly 5 characters")
    ).toBeInTheDocument();

    expect(
      screen.getByText("location is a required field")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Enter valid phone number e.g. +447896345621 / 07896345621"
      )
    ).toBeInTheDocument();

    expect(screen.getByText("invalid email address")).toBeInTheDocument();
  });

  describe("form labels", () => {
    it("title label", () => {
      const titleLabel = screen.getByTestId("title-test");
      expect(titleLabel.getAttribute("for")).toBe("title");
    });

    it("Description label", () => {
      expect(screen.getByText("Description:*")).toBeInTheDocument();
    });

    it("Date label", () => {
      expect(screen.getByText("Date:*")).toBeInTheDocument();
    });

    it("Start time label", () => {
      expect(
        screen.getByText("Start time:* (24 hour format)")
      ).toBeInTheDocument();
    });

    it("End time label", () => {
      expect(
        screen.getByText("End time:* (24 hour format)")
      ).toBeInTheDocument();
    });

    it("Location label", () => {
      expect(screen.getByText("Location:*")).toBeInTheDocument();
    });

    it("Phone number label", () => {
      expect(screen.getByText("Phone number:")).toBeInTheDocument();
    });

    it("Email label", () => {
      expect(screen.getByText("Email:")).toBeInTheDocument();
    });
  });

  describe("Title input validation", () => {
    it("title input matches specified validation", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-title");

      await user.type(input, "Manchester cycling event");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText(
        /Title must include at least 10 characters/i
      );

      expect(element).toBeNull;
    });

    it("title input length is less than 10 characters", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-title");

      await user.type(input, "Manch");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const errorElement = screen.getByText(
        /Title must include at least 10 characters/i
      );

      expect(errorElement.textContent).toContain(
        "Title must include at least 10 characters"
      );
    });

    it("title input length is more than 50 characters", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-title");

      await user.type(
        input,
        "12345678901234567890123456789012345678901234567890sd"
      );

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const errorElement = screen.getByText(
        /Reached maximum character length/i
      );

      expect(errorElement.textContent).toContain(
        "Reached maximum character length"
      );
    });
  });

  describe("Description input validation", () => {
    it("description input matches specified validation", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-description");

      await user.type(input, "Manchester cycling event is free for all");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText(
        /Description must include at least 20 characters/i
      );

      expect(element).toBeNull;
    });

    it("description input length is less than 20 characters", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-description");

      await user.type(input, "M");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const errorElement = screen.getByText(
        /Description must include at least 20 characters/i
      );

      expect(errorElement.textContent).toContain(
        "Description must include at least 20 characters"
      );
    });

    it("description input length is more than 200 characters", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-description");

      await user.type(
        input,
        "ManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchester"
      );

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const errorElement = screen.getByText(
        /Reached maximum character length/i
      );

      expect(errorElement?.textContent).toContain(
        "Reached maximum character length"
      );
    });
  });

  describe("Date input validation", () => {
    it("date input matches specified validation", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-date");

      await user.type(input, "19-07-2024");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText(/please enter a valid date/i);

      expect(element).toBeNull;
    });
    it("date must be in valid format", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-date");

      await user.type(input, "19/07/2024");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const errorElement = screen.getByText(/please enter a valid date/i);

      expect(errorElement.textContent).toContain("please enter a valid date");
    });

    it("date must not be in the past or current date", async () => {
      const user = userEvent.setup();

      const input = screen.getByTestId("input-date");

      await user.type(input, "2024-07-11");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const errorElement = screen.getByText(/Date must be in the future/i);

      expect(errorElement?.textContent).toContain("Date must be in the future");
    });
  });

  describe("Start time input validation", () => {
    it("Start time input must be in 24 hour format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-start-time");

      await user.type(input, "03:30");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(/Time must be in this format 00:00/i);

      expect(text).toBeNull();
    });

    it("Error message displays if start time is in not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-start-time");

      await user.type(input, "03000");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(/Time must be in this format 00:00/i);

      expect(text?.textContent).toContain("Time must be in this format 00:00");
    });

    it("Error message displays if start time is in not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-start-time");

      await user.type(input, "03:0");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(
        /startTime must be exactly 5 characters/i
      );

      expect(text?.textContent).toContain(
        "startTime must be exactly 5 characters"
      );
    });
  });

  describe("End time input validation", () => {
    it("End time input must be in 24 hour format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-end-time");

      await user.type(input, "03:30");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(/Time must be in this format 00:00/i);

      expect(text).toBeNull();
    });

    it("Error message displays if end time is in not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-end-time");

      await user.type(input, "03000");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(/Time must be in this format 00:00/i);

      expect(text?.textContent).toContain("Time must be in this format 00:00");
    });

    it("Error message displays if end time is in not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-end-time");

      await user.type(input, "03:0");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(/endTime must be exactly 5 characters/i);

      expect(text?.textContent).toContain(
        "endTime must be exactly 5 characters"
      );
    });

    it("Error message displays if end time is the same or before start time", async () => {
      const user = userEvent.setup();
      const startTimeInput = screen.getByTestId("input-start-time");
      const endTimeInput = screen.getByTestId("input-end-time");

      await user.type(startTimeInput, "03:00");
      await user.type(endTimeInput, "03:00");

      const saveForm = screen.getByRole("button", { name: /Save/i });
      await user.click(saveForm);

      const text = screen.queryByText(/end time should be greater/i);

      expect(text?.textContent).toContain("end time should be greater");
    });
  });

  describe("Location input validation", () => {
    it("Location input text must be at least 20 characters", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-location");

      await user.type(input, "Man");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText(
        /Location must include at least 20 characters/i
      );

      expect(element).not.toBeNull();
    });

    it("Location input text must not exceed 200 characters", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-location");

      await user.type(
        input,
        "ManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchesterManchester"
      );

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText(/Reached maximum character length/i);

      expect(element).not.toBeNull();
    });
  });

  describe("Phone number input validation", () => {
    it("Phone number input must include a valid UK number", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-phone-number");

      await user.type(input, "0785794228");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText(
        "Enter valid phone number e.g. +447896345621 / 07896345621"
      );

      expect(element).not.toBeNull();
    });
  });

  describe("Email input validation", () => {
    it("Email must be in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-email");

      await user.type(input, "test@email.com");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText("invalid email address");

      expect(element).toBeNull();
    });

    it("Error message is displayed if email not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-email");

      await user.type(input, "testemail.com");

      const saveForm = screen.getByRole("button", { name: /Save/i });

      await user.click(saveForm);

      const element = screen.queryByText("invalid email address");

      expect(element).not.toBeNull();
    });
  });
});
