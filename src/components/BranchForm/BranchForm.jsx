import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { create, getId, putBranch } from '../../service/service'
import { useMutation, useQuery } from 'react-query'

export default function BranchForm() {
  const navigate = useNavigate()
  const { slug, id } = useParams()

  const { register, handleSubmit, setValue } = useForm({ defaultValue: {} })
  const updateBranch = useMutation(putBranch, {
    onSuccess: () => {
      navigate(-1)
    },
  })
  const { data } = useQuery(
    ['getById'],
    () =>
      getId({ slug: 'branches', id }).then((res) => {
        const { address, description, from_time, name, number, to_time } =
          res.data
        setValue('address', address)
        setValue('description', description)
        setValue('from_time', from_time)
        setValue('name', name)
        setValue('number', number)
        setValue('to_time', to_time)
      }),
    {
      enabled: !!id,
    }
  )
  //console.log(data)

  const onSubmit = (body) => {
    if (id) {
      updateBranch.mutate({ slug: 'branches', id, body })
    } else {
      create({ slug: 'branches', body }).then()
    }
  }

  return (
    <Box p={'80px'}>
      <form onSubmit={handleSubmit((body) => onSubmit(body))}>
        <FormControl>
          <Heading mb={'20px'}>Branch</Heading>
          <FormLabel mb={'24px'}>
            address
            <Input {...register('address', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            description
            <Input {...register('description', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            from_time
            <Input {...register('from_time', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            name
            <Input {...register('name', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            number
            <Input {...register('number', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            to_time
            <Input {...register('to_time', { required: true })} />
          </FormLabel>
          <Flex justifyContent={'end'} gap={'20px'}>
            <Button onClick={() => navigate(-1)}>go back</Button>
            <Button type="submit">DONE</Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  )
}
