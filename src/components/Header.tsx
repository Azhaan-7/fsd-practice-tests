import { Box, Heading } from "@chakra-ui/react";
export default function Header(){
    return (
        <Box bg = "blue.500" p={4} color={"white"}>
            <Heading size="lg">Customer Registration System</Heading>
        </Box>
    );
}