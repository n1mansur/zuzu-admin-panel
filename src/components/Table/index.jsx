import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Flex,
  Spinner,
  Button,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { deleteBranch, getAll } from '../../service/service'
import { AddIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom'

export default function DinamicTable() {
  const { slug } = useParams()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setIsLoading(true)
    getAll(slug)
      .then((res) => setData(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  const keys = data?.length ? Object.keys(data[0]) : []

  const deleteBranchFn = (id) => {
    setIsLoading(true)
    deleteBranch(slug, id).then((res) =>
      getAll(slug)
        .then((res) => setData(res.data))
        .finally(() => {
          setIsLoading(false)
          toast({
            title: 'Account created.',
            render: () => (
              <Box
                color="white"
                p={3}
                bg="red.500"
                borderRadius={'8px'}
                textAlign={'center'}
              >
                DELETED!!!
              </Box>
            ),
          })
        })
    )
  }

  return (
    <>
      {isLoading ? (
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          w={'100%'}
          h={'100vh'}
          bg={'#565656'}
        >
          <Heading color={'#fff'} mr={'10px'}>
            LOADING
          </Heading>
          <Spinner size="xl" color={'#fff'} />
        </Flex>
      ) : (
        <Box p={'80px'}>
          <TableContainer borderRadius={'10px'} boxShadow={'0 0 5px #a1a1a1'}>
            <Table variant="striped" colorScheme="gray">
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
                    </Flex>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((element) => (
                  <Tr key={element.id}>
                    {keys.map((key, i) => (
                      <Td key={i}>{element[key]}</Td>
                    ))}
                    <Td p={'0'}>
                      <Flex alignItems={'center'}>
                        <Spacer />
                        <Button
                          colorScheme="blue"
                          alignItems={'center'}
                          gap={'5px'}
                        >
                          <RepeatIcon />
                          Update
                        </Button>
                        <Spacer />
                        <Button
                          onClick={() => deleteBranchFn(element.id)}
                          colorScheme="red"
                          alignItems={'center'}
                          gap={'5px'}
                        >
                          <CloseIcon />
                          Delete
                        </Button>
                        <Spacer />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  )
}
