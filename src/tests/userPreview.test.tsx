import React from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import UserPreview from "@/components/UserPreview";
import { User } from "@/types/User";
import { PriceProvider } from "@/context/PriceContext";

function renderComponent(ui: React.ReactElement) {
    return render(
        <ChakraProvider>
            <PriceProvider>
                {ui}
            </PriceProvider>
        </ChakraProvider>
    );
}

describe("UserPreview", () => {

    // Tests that all submitted user details are displayed correctly
    test("shows submitted user details", () => {
        const user: User = {
            fullName: "Alice Smith",
            email: "alice@email.com",
            phone: "0406123456",
            serviceType: "consultation",
            notes: "Needs help with setup",
        };

        renderComponent(
            <UserPreview user={user} />
        );

        expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/alice@email.com/i)).toBeInTheDocument();
        expect(screen.getByText(/0406123456/i)).toBeInTheDocument();
        expect(screen.getByText(/consultation/i)).toBeInTheDocument();
        expect(screen.getByText(/Needs help with setup/i)).toBeInTheDocument();
    });

    // Tests that empty notes can still render without crashing
    test("renders correctly when notes are empty", () => {
        const user: User = {
            fullName: "Bob",
            email: "bob@email.com",
            phone: "0406000000",
            serviceType: "support",
            notes: "",
        };

        renderComponent(
            <UserPreview user={user} />
        );

        expect(screen.getByText(/Name:\s*Bob/i)).toBeInTheDocument();
        expect(screen.getByText(/support/i)).toBeInTheDocument();
    });

});