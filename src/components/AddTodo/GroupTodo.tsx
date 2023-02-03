import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Card, Center, chakra, Flex, IconButton, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useApp } from 'src/context/AppContext'
import * as yup from 'yup'
import RHFInput from '../hook-form/RHFInput'
import { todoSchema } from './SingleTodo'



const groupTodo = yup.object().shape({
    heading: yup.string().required('Heading required').max(15, 'max limit 15'),
    items: yup.array().of(todoSchema)
})

const CustomInput = chakra(RHFInput, {
    baseStyle: {
        height: '20px',
        fontSize: '13px',
        borderRadius: 3
    }
})


type props = {
    onClose: () => any
}

export default function GroupTodo({ onClose }: props) {

    const { addGroupTodo, selectedBucket } = useApp()

    const methods = useForm({
        resolver: yupResolver(groupTodo)
    })

    function onSubmit(data: any) {
        addGroupTodo(selectedBucket.id, data)
        onClose()
    }

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: 'items'
    })

    return (
        <FormProvider {...methods} >
            <Card sx={{ pt: 3, px: 5, mx: 3, mb: 5 }}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <RHFInput name="heading" placeholder="Group heading" />

                    <>
                        <Center flexWrap={'wrap'} >
                            {fields.map((field, i) => (
                                <Card key={field.id} sx={{ p: 2, my: 2 }}>
                                    <Flex>
                                        <Box>
                                            <CustomInput name={`items.${i}.title`} placeholder='Title' />
                                            <CustomInput name={`items.${i}.description`} placeholder='description' />
                                            <CustomInput type={'date'} name={`items.${i}.dueDate`} placeholder='Due Date' />
                                        </Box>
                                        <div>
                                            <IconButton
                                                onClick={() => remove(i)}
                                                sx={{
                                                    m: 1, my: 'auto',
                                                    borderRadius: '50%'
                                                }}
                                                aria-label='button' size={'sm'}  >
                                                <DeleteIcon color={'red'} />
                                            </IconButton>
                                        </div>
                                    </Flex>
                                </Card>
                            ))}
                        </Center>

                        <Center sx={{ mt: 4 }} >
                            <Button
                                onClick={() => append({})}
                                size={'xs'} colorScheme='red' variant={'outline'} >+ Add todo</Button>
                        </Center>
                    </>

                    <Flex justifyContent={'space-between'} sx={{ my: 4 }}>
                        <Button
                            onClick={onClose}
                            size={'sm'} colorScheme={'blue'} variant='outline'>Cancel</Button>
                        <Button size={'sm'} type="submit" colorScheme={'red'}>Save</Button>
                    </Flex>
                </form>
            </Card>
        </FormProvider>
    )
}