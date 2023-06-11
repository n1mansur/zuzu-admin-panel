import { Thead, Tr, Th, Flex, Button, Spacer, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'

export default function TheadSection({ keys }) {
  const { slug } = useParams()
  return (
    <Thead>
      <Tr bg={'#CBD5E0'}>
        {keys.map((key, i) => (
          <Th key={i} color={'#000'}>
            {key}
          </Th>
        ))}
        <Th color={'#000'} p={'10px 24px'}>
          <Flex alignItems={'center'}>
            <Text>Actions</Text>
            <Spacer />
            <Link to={`/${slug}/create`}>
              <Button
                color={'#EBF8FF'}
                bg={'#1A365D'}
                _hover={{ color: '#1A365D', background: '#EBF8FF' }}
                alignItems={'center'}
                gap={'5px'}
              >
                <AddIcon />
                ADD
              </Button>
            </Link>
          </Flex>
        </Th>
      </Tr>
    </Thead>
  )
}
