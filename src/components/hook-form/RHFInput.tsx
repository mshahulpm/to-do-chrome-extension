import { Box, Input, InputProps, Text } from '@chakra-ui/react';
import { useFormContext, Controller } from 'react-hook-form';



type props = {
    name: string
}

export default function RHFInput({ name, ...others }: props & InputProps) {

    const { control } = useFormContext();


    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Box >
                    <Input
                        {...field} value={field.value || ''} {...others}

                    />
                    {error?.message && <Text fontSize={'xs'} sx={{ ml: 2, }} color='red'>{error.message}</Text>}
                </Box>
            )}
        />
    )
}