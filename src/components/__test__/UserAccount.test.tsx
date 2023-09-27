import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, useNavigate, useParams } from 'react-router-dom';
import UserAccount from '../UserAccount';

/* eslint-disable */

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigateMock: jest.fn(),
    useParams: jest.fn(),
}));

// Mock your fetch implementation
global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    user_bids: [],
                    user_items: [],
                    balance: 100,
                },
            }),
    })
);

describe('UserAccount component', () => {

    beforeEach(() => {
        // @ts-ignore
        useParams.mockReturnValue({ id: '123' }); // Mock useParams
        // @ts-ignore
        useNavigate.mockReturnValue(jest.fn()); // Mock useNavigate
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders user account details', async () => {
        render(
            <MemoryRouter initialEntries={['/user/account/123']}>
                <Route path="/user/account/:id">
                    <UserAccount />
                </Route>
            </MemoryRouter>
        );

        // Wait for data to load
        await waitFor(() => screen.getByText('Account Details'));

        expect(screen.getByText('Account Holder: John Doe')).toBeInTheDocument();
        expect(screen.getByText('Email: johndoe@example.com')).toBeInTheDocument();
        // Add more assertions for user account details
    });

    test('handles deposit funds action', async () => {
        // Mock useActionData
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useActionData: jest.fn(() => ({
                data: {
                    amount: 50,
                },
                message: 'Funds deposited successfully',
            })),
        }));

        render(
            <MemoryRouter initialEntries={['/user/account/1502']}>
                <Route path="/user/account/:id">
                    <UserAccount />
                </Route>
            </MemoryRouter>
        );

        // Wait for data to load
        await waitFor(() => screen.getByText('Account Details'));

        const depositButton = screen.getByText('D E P O S I T');
        expect(depositButton).toBeInTheDocument();

        // Simulate form submission
        fireEvent.click(depositButton);

        // Wait for the message to appear
        await waitFor(() =>
            expect(screen.getByText('Funds deposited successfully')).toBeInTheDocument()
        );

    });

});
