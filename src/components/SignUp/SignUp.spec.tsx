import SignUp from "./SignUp";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<SignUp />);
});

describe("SignUp component", () => {
  it("Should render sign up form", () => {
    const form = screen.getByTestId("sign-up-form");
    expect(form).toBeInTheDocument();
  });

  it("Submit empty form", async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /Sign up/i });

    await user.click(submitButton);

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();

    expect(
      screen.getByText("Password must be at least 8 characters long")
    ).toBeInTheDocument();
  });

  describe("form labels", () => {
    it("Email label", () => {
      const emailLabel = screen.getByTestId("email-test");
      expect(emailLabel.getAttribute("for")).toBe("email");
    });

    it("Password label", () => {
      const passwordLabel = screen.getByTestId("password-test");
      expect(passwordLabel.getAttribute("for")).toBe("password");
    });
  });
  
  describe("Email input validation", () => {
    it("Email must be in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-email");

      await user.type(input, "ahmedysatt@gmail.com");

      const saveForm = screen.getByRole("button", { name: /Sign up/i });

      await user.click(saveForm);

      const element = screen.queryByText("Invalid email address");

      expect(element).not.toBeInTheDocument();
    });

    it("Error message is displayed if email not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-email");

      await user.type(input, "testemail.com");

      const saveForm = screen.getByRole("button", { name: /Sign up/i });

      await user.click(saveForm);

      const element = screen.queryByText("Invalid email address");

      expect(element).toBeNull();
    });
  });
  
  describe("Password input validation", () => {
    it("Password must be at least 8 characters long", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-password");

      await user.type(input, "test12");

      const saveForm = screen.getByRole("button", { name: /Sign up/i });

      await user.click(saveForm);

      const element = screen.queryByText("Password must be at least 8 characters long");

      expect(element).toBeInTheDocument();
    });

    it("Password should be accepted if matches validation rules", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-password");

      await user.type(input, "testpass");

      const saveForm = screen.getByRole("button", { name: /Sign up/i });

      await user.click(saveForm);

      const element = screen.queryByText("Password must be at least 8 characters long");

      expect(element).not.toBeInTheDocument();
    });
  });
});
