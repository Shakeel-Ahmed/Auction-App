import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { SignUp, SignUpAction } from "../SignUp";

/* eslint-disable */

jest.mock("react-router-dom", () => ({
    Form: "form",
    useActionData: jest.fn(),
    redirect: jest.fn(),
    Link: "a",
}));

describe("SignUp Component", () => {
    it("renders the SignUp component", () => {
        const { getByText, getByLabelText } = render(<SignUp />);

        // Adding test assertions here
        expect(getByText("Please Sign-up")).toBeInTheDocument();
        expect(getByLabelText("User")).toBeInTheDocument();
        expect(getByLabelText("Email address")).toBeInTheDocument();
        expect(getByLabelText("Password")).toBeInTheDocument();
        // Add more assertions as needed
    });

    it("submits the SignUp form", async () => {
        const mockUseActionData = jest.fn();
        const mockRedirect = jest.fn();
        jest.spyOn(React, "useEffect").mockImplementation((f) => f());

        const { getByText } = render(<SignUp />);

        fireEvent.click(getByText("SIGN-UP"));

        // Adding assertions for form submission
        await waitFor(() => {
            expect(mockUseActionData).toHaveBeenCalled();
            expect(mockRedirect).toHaveBeenCalledWith("/user/sign-in");
        });
    });
});

describe("SignUpAction Function", () => {
    it("handles user registration successfully", async () => {
        const mockResponse = {
            success: true,
        };

        // Replacing with appropriate mock for fetch
        globalThis.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        );

        const formdata = new FormData();
        formdata.append("theUser", "testuser");
        formdata.append("theEmail", "test@example.com");
        formdata.append("thePassword", "password");

        const request = { formData: () => Promise.resolve(formdata) };

        const response = await SignUpAction({ request });

        // Add assertions for a successful registration
        expect(response).toEqual({ success: true });
    });

    it("handles user registration failure", async () => {
        const mockResponse = {
            success: false,
            error: "Registration failed",
        };

        // Replace with appropriate mock for fetch
        globalThis.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            })
        );

        const formdata = new FormData();
        formdata.append("theUser", "testuser");
        formdata.append("theEmail", "test@example.com");
        formdata.append("thePassword", "password");

        const request = { formData: () => Promise.resolve(formdata) };

        const response = await SignUpAction({ request });

        // Adding assertions for a failed registration
        expect(response).toEqual({ success: false, error: "Registration failed" });
    });

    it("handles server connection error", async () => {
        // Replacing with a mock that simulates a connection error
        globalThis.fetch = jest.fn(() => Promise.reject("Connection error"));

        const formdata = new FormData();
        formdata.append("theUser", "testuser");
        formdata.append("theEmail", "test@example.com");
        formdata.append("thePassword", "password");

        const request = { formData: () => Promise.resolve(formdata) };

        const response = await SignUpAction({ request });

        // Add assertions for a server connection error
        expect(response).toEqual({
            status: 500,
            message: "Can't connect to server, please try again later",
        });
    });
});
