import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ItemCreate from "../ItemCreate";

/* eslint-disable */

describe("ItemCreate Component", () => {
    it("renders the component with item creation form", async () => {
        // Mock useActionData to simulate the action data
        const mockActionData = {
            success: true,
            message: "Item added successfully.",
        };
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useActionData: () => mockActionData,
            useNavigate: jest.fn(),
        }));

        // Render the component within MemoryRouter
        render(
            <MemoryRouter initialEntries={["/item/create"]}>
                <Route path="/item/create">
                    <ItemCreate />
                </Route>
            </MemoryRouter>
        );

        // Wait for the component to render
        await waitFor(() => {
            // Check if item creation form elements are displayed
            expect(screen.getByText("Add New Auction Item")).toBeInTheDocument();
            expect(screen.getByLabelText("Item")).toBeInTheDocument();
            expect(screen.getByLabelText("Set Expiry")).toBeInTheDocument();
            expect(screen.getByLabelText("Item Description")).toBeInTheDocument();
            expect(screen.getByText("CREATE")).toBeInTheDocument();
        });
    });

    it("renders a success message when item creation is successful", async () => {
        // Mock useActionData to simulate a successful item creation
        const mockActionData = {
            success: true,
            message: "Item added successfully.",
        };
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useActionData: () => mockActionData,
            useNavigate: jest.fn(),
        }));

        // Render the component within MemoryRouter
        render(
            <MemoryRouter initialEntries={["/item/create"]}>
                <Route path="/item/create">
                    <ItemCreate />
                </Route>
            </MemoryRouter>
        );

        // Wait for the component to render
        await waitFor(() => {
            // Check if success message is displayed
            expect(screen.getByText("Item added in the auction.")).toBeInTheDocument();
        });
    });

    it("renders an error message when item creation fails", async () => {
        // Mock useActionData to simulate a failed item creation
        const mockActionData = {
            success: false,
            message: "Item creation failed. Please try again later.",
        };
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useActionData: () => mockActionData,
            useNavigate: jest.fn(),
        }));

        // Render the component within MemoryRouter
        render(
            <MemoryRouter initialEntries={["/item/create"]}>
                <Route path="/item/create">
                    <ItemCreate />
                </Route>
            </MemoryRouter>
        );

        // Wait for the component to render
        await waitFor(() => {
            // Check if error message is displayed
            expect(
                screen.getByText("Item creation failed. Please try again later.")
            ).toBeInTheDocument();
        });
    });
});
