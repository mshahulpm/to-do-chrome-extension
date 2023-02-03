import { Button, Card, chakra, Flex } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import RHFInput from "../hook-form/RHFInput";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useApp } from "src/context/AppContext";



export const todoSchema = yup.object().shape({
    title: yup.string().required('Name required').max(15, 'max limit 15'),
    description: yup.string().max(20, 'max limit 20'),
    dueDate: yup.date().typeError('invalid date'),
    completed: yup.boolean().default(false)
})

const CustomInput = chakra(RHFInput, {
    baseStyle: {
        height: 30,
        mb: 2
    }
})

type props = {
    onClose: () => any
}

export default function SingleTodoForm({ onClose }: props) {

    const { selectedBucket, addTodo } = useApp()

    const methods = useForm({
        resolver: yupResolver(todoSchema)
    })

    function onSubmit(data: any) {
        addTodo(selectedBucket.id, data)
        onClose()
    }


    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Card sx={{ pt: 3, px: 5, mx: 3, mb: 5 }}>
                    <CustomInput name="title" placeholder="Todo Title" />
                    <CustomInput name="description" placeholder="Description" />
                    <CustomInput name="dueDate" type={'date'} placeholder="Description" />

                    <Flex justifyContent={'space-between'} sx={{ my: 4 }}>
                        <Button
                            onClick={onClose}
                            size={'sm'} colorScheme={'blue'} variant='outline'>Cancel</Button>
                        <Button size={'sm'} type="submit" colorScheme={'red'}>Save</Button>
                    </Flex>
                </Card>
            </form>
        </FormProvider>
    )
}