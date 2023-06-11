import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { create, getId, putBranch } from '../../service/service'
import { useMutation, useQuery } from 'react-query'

export default function ProductForm() {
  const navigate = useNavigate()
  const { slug, id } = useParams()

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValue: {},
  })
  const updateBranch = useMutation(putBranch, {
    onSuccess: () => {
      navigate(-1)
    },
  })

  const { data } = useQuery(
    ['getById'],
    () =>
      getId({ slug, id }).then((res) => {
        const { comment, price, status, name, id, img } = res.data
        setValue('comment', comment)
        setValue('price', price)
        setValue('status', status)
        setValue('name', name)
        setValue('id', id)
        setValue('img', img)
      }),
    {
      enabled: !!id,
    }
  )
  const onSubmit = (body) => {
    if (id) {
      updateBranch.mutate({ slug, id, body })
    } else {
      create({ slug, body }).then()
    }
  }
  return (
    <>
      <Box p={'80px'}>
        <form onSubmit={handleSubmit((body) => onSubmit(body))}>
          <FormControl>
            <Heading mb={'20px'}>Product</Heading>
            <FormLabel mb={'24px'}>
              name
              <Input {...register('name', { required: true })} />
            </FormLabel>
          </FormControl>
          <FormLabel mb={'24px'}>
            comment
            <Input {...register('comment', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            price
            <Input {...register('price', { required: true })} />
          </FormLabel>
          <FormLabel mb={'24px'}>
            status <input type="checkbox" {...register('status')} />
          </FormLabel>
          <Flex justifyContent={'end'} gap={'20px'}>
            <Button onClick={() => navigate(-1)}>go back</Button>
            <Button type="submit">DONE</Button>
          </Flex>
        </form>
      </Box>
    </>
  )
}
