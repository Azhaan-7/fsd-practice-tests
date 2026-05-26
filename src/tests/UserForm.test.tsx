import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChakraProvider } from "@chakra-ui/react";
import { PriceProvider } from "@/context/PriceContext";
import UserForm from "@/components/UserForm";
import { User } from "@/types/User";

function renderComponent(ui: React.ReactElement) {
    return render(
        <ChakraProvider>
            <PriceProvider>
                {ui}
            </PriceProvider>
        </ChakraProvider>
    );
}

describe("UserForm", () => {

    // Tests that typing into the full name field updates state
    test("calls setUser when full name changes", async () => {

        const setUser = jest.fn();

        const user: User = {
            fullName: "",
            email: "",
            phone: "",
            serviceType: "",
            notes: "",
        };

        renderComponent(
            <UserForm
                user={user}
                setUser={setUser}
                setIsSubmitted={jest.fn()}
            />
        );

        const nameInput = screen.getByLabelText(/Enter Name/i);

        await userEvent.type(nameInput, "Alice");

        expect(setUser).toHaveBeenCalled();
    });

    // Tests that multiple form fields can accept user input
    test("allows user to type into form fields", async () => {

        const setUser = jest.fn();

        const user: User = {
            fullName: "",
            email: "",
            phone: "",
            serviceType: "",
            notes: "",
        };

        renderComponent(
            <UserForm
                user={user}
                setUser={setUser}
                setIsSubmitted={jest.fn()}
            />
        );

        const inputs = screen.getAllByRole("textbox");

        await userEvent.type(inputs[0], "John");
        await userEvent.type(inputs[1], "john@email.com");

        expect(setUser).toHaveBeenCalled();
    });

});