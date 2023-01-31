import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Switch,
} from "@chakra-ui/react";
import { useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFieldArray, useForm } from 'react-hook-form'

const todoSchema = yup.object().shape({
    title: yup.string().required('Name required').min(5).max(15),
    description: yup.string().max(20),
    dueDate: yup.date().typeError('invalid date'),
    completed: yup.boolean().default(false)
})

const groupTodo = yup.object().shape({
    heading: yup.string().required('Name required').min(5).max(15),
    items: yup.array().of(todoSchema)
})

export default function AddTodo() {

    const [single, setSingle] = useState(false)

    const methods = useForm({
        resolver: yupResolver(single ? todoSchema : groupTodo)
    })

    function onSubmit(data: any) {
        console.log(data)
    }

    return (
        <Modal size={'sm'} isOpen={true} onClose={() => { }}>
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
                    <form onSubmit={methods.handleSubmit(onSubmit)}>

                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}




function SingleTodoForm() {



    return (
        <>
            <Input />
        </>
    )
}