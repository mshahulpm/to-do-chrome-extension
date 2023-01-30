import { Button, FormErrorMessage, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react"
import { useApp } from "src/context/AppContext"
import { useState } from 'react'
import { useForm } from "react-hook-form"


export default function NewBucket() {

    const { closeModal, openedModal, addNewBucket } = useApp()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const isOpen = openedModal === 'bucket'

    function onSubmit(bucket: any) {
        addNewBucket(bucket.name, bucket.description)
        reset()
        closeModal()
    }


    return (
        <>
            <Modal
                size={'sm'}
                closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalContent>
                        <ModalHeader>Create New Bucket</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Stack spacing={2}>
                                <Input
                                    {...register('name', {
                                        required: { value: true, message: 'Required' },
                                        minLength: { value: 5, message: 'Minimum 5 character required' },
                                        maxLength: { value: 15, message: 'Maximum limit 15' }
                                    })}
                                    placeholder="Bucket Name" />
                                <Text fontSize={'xs'} sx={{ pl: 2, color: 'tomato' }}>
                                    {errors.name?.message?.toString()}
                                </Text>
                                <Textarea
                                    {...register('description', {
                                        maxLength: { value: 20, message: 'Allowed limit 20' }
                                    })}
                                    rows={3} placeholder="Description" />
                                <Text fontSize={'xs'} sx={{ pl: 2, color: 'tomato' }}>
                                    {errors.description?.message?.toString()}
                                </Text>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                type="submit"
                                colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={closeModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}