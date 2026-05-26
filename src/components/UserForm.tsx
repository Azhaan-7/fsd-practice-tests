import { User } from "@/types/User";
import { useState } from "react";
import { Input, Select, Textarea, FormControl, VStack, FormLabel, Button, FormErrorMessage, useToast } from "@chakra-ui/react";
import { usePriceContext } from "@/context/PriceContext";
type UserFormProps = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UserForm(
    { user, setUser, setIsSubmitted }: UserFormProps
) {
    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        phone?: string;
        serviceType?: string;
    }>({});
    const toast = useToast();
    const { fetchPrice, clearPrice } = usePriceContext();
    function validateForm() {

        const newErrors: {
            fullName?: string;
            email?: string;
            phone?: string;
            serviceType?: string;
        } = {};

        if (user.fullName.trim() === "") {
            newErrors.fullName = "Name is required.";
        }
        else if (user.fullName.trim().length < 2) {
            newErrors.fullName = "Name has to have minimum 2 characters";
        }
        if (user.email.trim() === "") {
            newErrors.email = "Email is required.";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            newErrors.email = "Enter a valid email";
        }
        if (user.phone.trim() === "") {
            newErrors.phone = "Phone number is required.";
        }
        else if (!/^\d+$/.test(user.phone)) {
            newErrors.phone = "Enter a valid phone number";
        }
        else if (user.phone.length < 8 || user.phone.length > 12) {
            newErrors.phone = "Phone number must be 8-12 digits";
        }
        if (user.serviceType === "") {
            newErrors.serviceType = "Please select a service";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    function handleSubmit() {
        const isValid = validateForm();
        if (!isValid) {
            return;
        }
        setIsSubmitted(true);
        toast({
            title: "Submission successful",
            description: "Your details have been submitted.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        
    }
    return (
        <>
            <VStack>
                <FormControl isInvalid={!!errors.fullName}>
                    <FormLabel fontWeight="semibold">Enter Name:</FormLabel>
                    <Input value={user.fullName}
                        onChange={(e) => {
                            setIsSubmitted(false);
                            setUser({
                                ...user,
                                fullName: e.target.value
                            })
                        }
                        }
                    />
                    <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                    <FormLabel fontWeight="semibold">Enter email:</FormLabel>
                    <Input value={user.email}
                        onChange={(e) => {
                            setIsSubmitted(false);
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }
                        }
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.phone}>
                    <FormLabel fontWeight="semibold">Enter phone:</FormLabel>
                    <Input
                        value={user.phone}
                        onChange={(e) => {
                            setIsSubmitted(false);
                            setUser({
                                ...user,
                                phone: e.target.value,
                            })
                        }
                        }
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.serviceType}>
                    <FormLabel fontWeight="semibold">Choose service:</FormLabel>
                    <Select value={user.serviceType}
                        onChange={ async (e) => {
                            const selectedService = e.target.value;
                            setUser({
                                ...user,
                                serviceType: selectedService,
                            });
                            setIsSubmitted(false);

                            if (selectedService === "" ){
                                clearPrice();
                                return;
                            }
                            await fetchPrice(selectedService);
                        }
                        }
                    >
                        <option value="">Select a service</option>
                        <option value="consultation">Consultation</option>
                        <option value="support">Support</option>
                        <option value="installation">Installation</option>
                    </Select>
                    <FormErrorMessage>{errors.serviceType}</FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight="semibold">Would you like to enter some notes?</FormLabel>
                    <Textarea value={user.notes}
                        onChange={(e) => {
                            setIsSubmitted(false);
                            setUser({
                                ...user,
                                notes: e.target.value
                            })
                        }
                        }
                    />
                </FormControl>
                <Button
                    colorScheme="blue"
                    width={"full"}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </VStack>
        </>
    );
}