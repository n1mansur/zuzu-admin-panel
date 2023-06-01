import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'

export default function ProductForm() {
  return (
    <FormControl>
      <FormLabel>Product</FormLabel>
      <Input />
      <FormHelperText></FormHelperText>
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  )
}
