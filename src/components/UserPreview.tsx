import { User } from "@/types/User";
import { FormLabel, VStack } from "@chakra-ui/react";
import { usePriceContext } from "@/context/PriceContext";
type UserReviewProps = {
    user: User;
}
export default function UserPreview(
    { user }: UserReviewProps
) {
    const { price, loading, apiError } = usePriceContext(); 
    return (
        <>
            <VStack align={"stretch"} spacing={3}>
                <FormLabel> Customer Details:</FormLabel>
                <p>Name: {user.fullName || "Not Entered"}</p>
                <p>email: {user.email || "Not Entered"}</p>
                <p>phone: {user.phone || "Not Entered"}</p>
                <p>serviceType: {user.serviceType || "Not Entered"}</p>
                <p>notes: {user.notes || "Not Entered"}</p>
                {loading && <p>Loading price...</p>}

                {apiError && (
                    <p style={{ color: "red" }}>
                        {apiError}
                    </p>
                )}

                {price !== null && (
                    <p>Estimated Price: ${price}</p>
                )}
            </VStack>
        </>
    );
}