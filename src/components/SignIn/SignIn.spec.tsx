import SignIn from "./SignIn";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  render(<SignIn />);
});

describe("SignIn component", () => {
  it("Should render sign in form", () => {
    const form = screen.getByTestId("sign-in-form");
    expect(form).toBeInTheDocument();
  });

  it("Submit empty form", async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", { name: /Sign in/i });

    await user.click(submitButton);

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();

    expect(
      screen.getByText("Password required")
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

      const saveForm = screen.getByRole("button", { name: /Sign in/i });

      await user.click(saveForm);

      const element = screen.queryByText("Invalid email address");

      expect(element).not.toBeInTheDocument();
    });

    it("Error message is displayed if email not in the correct format", async () => {
      const user = userEvent.setup();
      const input = screen.getByTestId("input-email");

      await user.type(input, "testemail.com");

      const saveForm = screen.getByRole("button", { name: /Sign in/i });

      await user.click(saveForm);

      const element = screen.queryByText("Invalid email address");

      expect(element).toBeNull();
    });
  }); 
});
