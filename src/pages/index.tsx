import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "@/types/User";
import { useState } from "react";
import {Container, Grid, GridItem, Heading, Box}from "@chakra-ui/react"
import UserForm from "@/components/UserForm";
import UserPreview from "@/components/UserPreview";
import { PriceProvider } from "@/context/PriceContext";

export default function Home(){
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    phone:"",
    serviceType:"",
    notes:""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <>
    <Header />
    <Container maxW={"6xl"} py={8}>
      <Heading mb={6}>Customer Registration</Heading>
      <PriceProvider>
      <Grid templateColumns={{base: "1fr", md:"1fr 1fr"}} gap={6}>
        <GridItem>
          <Box borderWidth={"1px"} borderRadius={"md"} p={4}>
           <UserForm
                user={user}
                setUser={setUser} 
                setIsSubmitted = {setIsSubmitted}                
                />
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={"1px"} borderRadius={"md"} p={4}>
           {isSubmitted && <UserPreview user = {user}/>}
          </Box>
        </GridItem>
      </Grid>
      </PriceProvider>
    </Container>
    <Footer />
    </>
  );
}