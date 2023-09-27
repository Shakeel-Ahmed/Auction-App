import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ItemListing from "../ItemListing";

/* eslint-disable */

describe("ItemListing Component", () => {
    it("renders the component with item listing data and pagination", async () => {
        // Defining sample item listing data to simulate the API response
        const itemListingData = {
            data: [
                {
                    item: "1",
                    name: "Item 1",
                    highest: 100,
                    description: "Description for Item 1",
                    expiry: "2023-12-31",
                },
                {
                    item: "2",
                    name: "Item 2",
                    highest: 200,
                    description: "Description for Item 2",
                    expiry: "2023-12-31",
                },
            ],
            total: 2,
            current_page: 1,
            last_page: 1,
        };

        // Mock the fetch function to simulate the API response
        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(itemListingData),
            })
        );

        // Render the component within MemoryRouter
        render(
            <MemoryRouter initialEntries={["/item/list/1"]}>
            <Route path="/item/list/:page">
                <ItemListing />
                </Route>
                </MemoryRouter>
        );

        // Wait for the component to fetch and display the item listing
        await waitFor(() => {
            // Check if item data is displayed
            expect(screen.getByText("Item 1")).toBeInTheDocument();
            expect(screen.getByText("Item 2")).toBeInTheDocument();

            // Check if pagination controls are displayed
            expect(screen.getByText("Total: 2")).toBeInTheDocument();
            expect(screen.getByText("1")).toBeInTheDocument();
        });
    });
});
