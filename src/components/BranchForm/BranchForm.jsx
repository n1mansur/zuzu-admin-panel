import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import React from 'react'

export default function BranchForm() {
  return (
    <FormControl>
      <FormLabel>Branch</FormLabel>
      <Input />
      <FormHelperText></FormHelperText>
      <FormErrorMessage></FormErrorMessage>
    </FormControl>
  )
}
