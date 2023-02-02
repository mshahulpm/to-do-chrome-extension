import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Switch,
} from "@chakra-ui/react";
import { useState } from 'react'
import GroupTodo from "./GroupTodo";
import SingleTodoForm from "./SingleTodo";



type props = {
    onClose: () => any
}

export default function AddTodo({ onClose }: props) {

    const [single, setSingle] = useState(false)

    return (
        <Modal size={'sm'} isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <Flex sx={{ justifyContent: 'space-between' }}>
                    <Box>
                        <ModalHeader fontSize={'md'}>Add a {single ? 'Single' : 'Group'} todo</ModalHeader>
                    </Box>

                    <Box>
                        <FormControl sx={{ mt: 4, mr: 3 }} display='flex' alignItems='center'>
                            <FormLabel size={'sm'} htmlFor='email-alerts' mb='0'>
                                Single
                            </FormLabel>
                            <Switch
                                isChecked={single}
                                onChange={e => setSingle(e.target.checked)}
                                colorScheme={'red'} size={'sm'} id='email-alerts' />
                        </FormControl>
                    </Box>
                </Flex>
                <ModalBody>
                    {
                        single ?
                            <SingleTodoForm onClose={onClose} /> :
                            <GroupTodo onClose={onClose} />
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}




