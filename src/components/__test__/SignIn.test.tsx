import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, redirect, Route } from 'react-router-dom';
import { SignIn, SignInAction } from '../SignIn';

/* eslint-disable */

describe('SignIn Component', () => {
    it('renders the sign-in form', () => {
        const { getByText, getByLabelText } = render(
            <MemoryRouter initialEntries={['/user/sign-in']}>
                <Route path="/user/sign-in" element={<SignIn />} />
            </MemoryRouter>
        );

        expect(getByText('Please Sign-in')).toBeInTheDocument();
        expect(getByLabelText('Email address')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        expect(getByText('SIGN-IN')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        const mockSignInAction = jest.fn();

        const { getByLabelText, getByText } = render(
            <MemoryRouter initialEntries={['/user/sign-in']}>
                <Route
                    path="/user/sign-in"
                    element={<SignIn />}
                />
            </MemoryRouter>
        );

        const emailInput = getByLabelText('Email address');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByText('SIGN-IN');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        // You can assert the behavior here, such as checking for loading spinners or error messages.
        // For example, you can expect a loading spinner to be displayed while waiting for the response.

        await waitFor(() => {
            // Assert that your action function has been called
            expect(mockSignInAction).toHaveBeenCalled();
        });
    });
});

// You can write tests for SignInAction in a similar fashion.
describe('SignInAction Function', () => {
    it('handles successful sign-in', async () => {
        // Mock the fetch request and return a successful response

        const formData = new FormData();
        formData.append('theEmail', 'test@example.com');
        formData.append('thePassword', 'password123');

        const request = {
            formData: () => formData,
        };

        const response = {
            ok: true,
            json: async () => ({
                success: true,
                data: {
                    token: 'your-auth-token',
                    name: 'Test User',
                    user: 123,
                },
            }),
        };

        global.fetch = jest.fn().mockResolvedValue(response);

        const result = await SignInAction({ request });

        expect(result).toEqual(redirect('/'));
    });

    it('handles unsuccessful sign-in', async () => {
        // Mock the fetch request and return an error response

        const formData = new FormData();
        formData.append('theEmail', 'test@example.com');
        formData.append('thePassword', 'password123');

        const request = {
            formData: () => formData,
        };

        const response = {
            ok: false,
            status: 401,
            json: async () => ({
                success: false,
                message: 'Invalid credentials',
            }),
        };

        global.fetch = jest.fn().mockResolvedValue(response);

        const result = await SignInAction({ request });

        expect(result).toEqual('Invalid credentials, please try again');
    });
});
