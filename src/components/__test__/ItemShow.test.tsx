import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ItemShow from "../ItemShow"; // Import your component

describe("ItemShow Component", () => {
    it("renders the component with specific item based on route param", () => {
        // Defining a sample item data with an ID that matches the route param
        const itemData = {
            id: "123",
            name: "Sample Item",
            description: "A sample item for testing",
            price: 100,
        };

        // Render the component within MemoryRouter
        render(
            <MemoryRouter initialEntries={["/item/show/123"]}>
                <Route path="/item/show/:id">
                    <ItemShow />
                </Route>
            </MemoryRouter>
        );

        // Check if the item details are displayed based on the route param
        expect(screen.getByText(itemData.name)).toBeInTheDocument();
        expect(screen.getByText(itemData.description)).toBeInTheDocument();
        expect(screen.getByText(itemData.price)).toBeInTheDocument();
    });
});
