import { Box, Button, Container, Heading, useColorModeValue, VStack, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useBugData } from '../db/bug';

const CreatePage = () => {
  const [newBug, setNewBug] = useState({
    id: "",
    desc: "",
    stat: "",
    img: "",
  });

  const toast = useToast()

  const { addBug } = useBugData()

  const handleAddBug = async () => {
    const { success, message } = await addBug(newBug);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      });
    }

    setNewBug({ id: "", desc: "", stat: "", img: "" });
  };

  return <Container maxW={"container.sm"}>
    <VStack spacing={8}>
      <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Add New Bug</Heading>
      <Box
        w={"full"} bg={useColorModeValue("white", "gray.800")}
        p={6} rounded={"lg"} shadow={"md"}>

        <VStack spacing={4}>
          <Input
            placeholder='Bug Id'
            name='id'
            type='number'
            value={newBug.id}
            onChange={(e) => setNewBug({ ...newBug, id: e.target.value })}
          />
          <Input
            placeholder='Bug Description'
            name='desc'
            value={newBug.desc}
            onChange={(e) => setNewBug({ ...newBug, desc: e.target.value })}
          />
          <Input
            placeholder='Bug Status'
            name='stat'
            value={newBug.stat}
            onChange={(e) => setNewBug({ ...newBug, stat: e.target.value })}
          />
          <Input
            placeholder='Image URL'
            name='img'
            value={newBug.img}
            onChange={(e) => setNewBug({ ...newBug, img: e.target.value })}
          />
          <Button colorScheme='gray' onClick={handleAddBug} w='full'>
            Add Bug
          </Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
};

export default CreatePage;  