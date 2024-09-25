import React, { act } from "react";
import SingleEvent from "./SingleEvent";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("SingleEvent component", () => {
  beforeEach(async () => {
    const FAKE_EVENT = { name: "test event" };
    const routes = [
      {
        path: "/events/:event_id",
        element: <SingleEvent />,
        loader: () => FAKE_EVENT,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/events/5KNyPdCnaTB1bP8wunvi"],
      initialIndex: 0,
    });

    await act(async () => {
      render(<RouterProvider router={router} />);
    });
  });

  it("Should render all headings on the page", async () => {
    await waitFor(() => {
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Date")).toBeInTheDocument();
      expect(screen.getByText("Time")).toBeInTheDocument();
      expect(screen.getByText("Where")).toBeInTheDocument();
    });
  });

  describe("Sign up button", () => {
    it("Button should render on screen", async () => {
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Sign up/i })
        ).toBeInTheDocument()
      );
    });

    it("Clicking the sign up will trigger a popup", async () => {
      const alertMock = jest.spyOn(window, "confirm").mockImplementation();
      const user = userEvent.setup();

      const button = await waitFor(() =>
        screen.getByRole("button", { name: /Sign up/i })
      );

      await user.click(button);

      expect(alertMock).toHaveBeenCalledTimes(1);

      alertMock.mockRestore();
    });
  });

  describe("Copy link button", () => {
    it("Button should render on screen", async () => {
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Copy link/i })
        ).toBeInTheDocument()
      );
    });

    it("Should copy event link to clipboard", async () => {
      const clipboardWriteTextMock = jest
        .spyOn(navigator.clipboard, "writeText")
        .mockImplementation(() => Promise.resolve());
      const clipboardReadTextMock = jest
        .spyOn(navigator.clipboard, "readText")
        .mockImplementation(() =>
          Promise.resolve("http://localhost/events/123")
        );

      const user = userEvent.setup();

      const button = await waitFor(() =>
        screen.getByRole("button", { name: /Copy link/i })
      );

      await user.click(button);

      const clipboardText = await navigator.clipboard.readText();

      expect(clipboardText).toEqual("http://localhost/events/123");

      clipboardReadTextMock.mockRestore();
      clipboardWriteTextMock.mockRestore();
    });
  });

  it("Add to calendar button should render on screen", async () => {
    await waitFor(() =>
      expect(
        screen.getByRole("link", { name: /Add to calendar/i })
      ).toBeInTheDocument()
    );
  });
});
