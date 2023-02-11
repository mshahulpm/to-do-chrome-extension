import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"




type props = {
    onConfirm: () => any
    onClose: () => any
}

export default function ConfirmBox({ onClose, onConfirm }: props) {


    return (
        <Modal isOpen={true} closeOnOverlayClick={false} onClose={onClose}>
            <ModalOverlay />
            <ModalContent sx={{ mt: 150 }}>
                <ModalHeader>Are You sure ?</ModalHeader>
                <ModalCloseButton />

                <ModalFooter>
                    <Button size={'sm'} colorScheme='red' variant={'outline'} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button size={'sm'} colorScheme={'blue'} >Confirm</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}