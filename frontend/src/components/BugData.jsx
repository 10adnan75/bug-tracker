import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useBugData } from '../db/bug';

const BugData = ({ bug }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const [updatedBug, setUpdatedBug] = useState(bug);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { updateBug, closeBug } = useBugData();

    const handleUpdateBug = async (bugid, updatedBug) => {
        const { success, message } = await updateBug(bugid, updatedBug);

        onClose();

        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                isClosable: true,
            });
        } else {
            toast({
                title: 'Success',
                description: 'Bug updated successfully!',
                status: 'success',
                isClosable: true,
            });
        }
    }

    const handleDeleteBug = async (bugid) => {
        const { success, message } = await closeBug(bugid);

        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                isClosable: true,
            });
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                isClosable: true,
            });
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
            bg={bg}
        >
            <Image src={bug.img} alt={bug.id} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h2' size='md' mb={2}>
                    {bug.id}
                </Heading>
                <Heading as='h4' size='md' mb={2}>
                    {bug.stat}
                </Heading>
                <Text fontWeight='bold' fontSize='x1' color={textColor} mb={4}>
                    {bug.desc}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteBug(bug._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Bug</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                _placeholder='Bug Id'
                                name='id'
                                value={updatedBug.id}
                                onChange={(e) => setUpdatedBug({ ...updatedBug, id: e.target.value })}
                            />
                            <Input
                                _placeholder='Bug Description'
                                name='desc'
                                value={updatedBug.desc}
                                onChange={(e) => setUpdatedBug({ ...updatedBug, desc: e.target.value })}
                            />
                            <Input
                                _placeholder='Bug Status'
                                name='stat'
                                value={updatedBug.stat}
                                onChange={(e) => setUpdatedBug({ ...updatedBug, stat: e.target.value })}
                            />
                            <Input
                                _placeholder='Image URL'
                                name='img'
                                value={updatedBug.img}
                                onChange={(e) => setUpdatedBug({ ...updatedBug, img: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateBug(bug._id, updatedBug)}>Update</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    )
};

export default BugData;