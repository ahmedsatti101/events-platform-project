import React, { act } from "react";
import SingleEvent from "./SingleEvent";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {Dialog} from "@mui/material";

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
      initialEntries: ["/events/011528d2-ea9e-41a6-95a4-10051b304432"],
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
  });

  describe("Copy link button", () => {
    it("Button should render on screen", async () => {
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /Copy link/i })
        ).toBeInTheDocument()
      );
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
