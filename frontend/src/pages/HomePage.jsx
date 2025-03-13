import React, { useEffect } from 'react';
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useBugData } from '../db/bug';
import BugData from '../components/BugData';

const HomePage = () => {
  const { fetchBugs, bugs } = useBugData();

  useEffect(() => {
    fetchBugs();
  }, [fetchBugs]);

  console.log("bugs", bugs);

  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, #C0C0C0, #000000)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Live Bugs
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={10}
          w={"full"}
        >
          {bugs.map((bug) => (
            <BugData key={bug._id} bug={bug} />
          ))}
        </SimpleGrid>

        {bugs.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            Hurray! No active Bugs. {" "}
            <Link to={"/create"}>
              <Text color='blue.500' _hover={{ textDecoration: "underline" }}>
                Add a new Bug
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
};

export default HomePage;