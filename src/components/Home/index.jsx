import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Home({ children }) {
  return (
    <Flex gap={'20px'} p={'20px'}>
      <Link to={'/branches'}>
        <Button _hover={{ bg: 'red', color: '#fff' }}>Филиалы</Button>
      </Link>
      <Link to={'/products'}>
        <Button _hover={{ bg: 'red', color: '#fff' }}>продукты</Button>
      </Link>
    </Flex>
  )
}
