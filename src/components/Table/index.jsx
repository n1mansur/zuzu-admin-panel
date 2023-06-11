import {
  Table,
  Tbody,
  TableContainer,
  Box,
  Heading,
  Flex,
  Spinner,
  useToast,
  Tr,
  Td,
  Spacer,
  Button,
  Input,
  Container,
} from '@chakra-ui/react'
import { deleteBranch, getAll } from '../../service/service'
import { Link, useParams } from 'react-router-dom'
import Thead from './TheadSection'
import { useMutation, useQuery } from 'react-query'
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import PaginationSetcion from '../PaginationSetcion'

export default function DinamicTable() {
  const [load, setLoad] = useState(true)
  const { slug } = useParams()
  const toast = useToast()
  const { data, isLoading, refetch } = useQuery('getData', () =>
    getAll({ slug }).then((res) => res.data)
  )
  //******************** Pagination */
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState([])
  const [count, setCount] = useState(10)
  const lastPostIndex = currentPage * count
  const firstPostIndex = lastPostIndex - count
  //******************** Pagination */
  //******************** Search */
  const { mutate: searchMutate } = useMutation(getAll, {
    onSuccess: (res) => setSearch(res.data),
  })
  const state = search.length > 0 ? search : data
  //******************** Search */
  const keys = state?.length ? Object.keys(state[0]) : []

  //******************** Functions  */
  const deleteBranchMutate = useMutation(deleteBranch, {
    onSuccess: () => {
      toast({
        title: `DELETED`,
        colorScheme: 'red',
        duration: 1500,
      })
      refetch()
    },
  })
  const deleteBranchFn = (id) => {
    deleteBranchMutate.mutate({ slug, id })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const value = e.target['search'].value
    searchMutate({ slug, value })
  }
  //******************** Functions  */

  setTimeout(() => {
    setLoad(false)
  }, 700)
  return (
    <>
      {load ? (
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
        <>
          <Box w={'100%'} p={'30px 0'}>
            <Container maxW={'1296px'}>
              <form onSubmit={(e) => onSubmit(e)}>
                <Flex>
                  <Input name="search" borderRightRadius={'none'} />
                  <Button
                    colorScheme="blue"
                    borderLeftRadius={'none'}
                    type="submit"
                  >
                    Search
                  </Button>
                </Flex>
              </form>
            </Container>
          </Box>
          <Box p={'0 80px'}>
            <TableContainer borderRadius={'10px'} boxShadow={'0 0 5px #a1a1a1'}>
              <Table variant="striped" colorScheme="gray">
                <Thead keys={keys} />
                <Tbody>
                  {state
                    ?.slice(firstPostIndex, lastPostIndex)
                    .map((element) => (
                      <Tr key={element.id}>
                        {keys.map((key, i) => (
                          <Td key={i}>
                            {[key] == 'status' ? (
                              element[key] ? (
                                <CheckIcon />
                              ) : (
                                <></>
                              )
                            ) : (
                              element[key]
                            )}
                          </Td>
                        ))}
                        <Td p={'0'}>
                          <Flex alignItems={'center'}>
                            <Spacer />
                            <Link to={`/${slug}/update/${element.id}`}>
                              <Button
                                colorScheme="blue"
                                alignItems={'center'}
                                gap={'5px'}
                              >
                                <RepeatIcon />
                                Update
                              </Button>
                            </Link>
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
              <PaginationSetcion
                totalTodos={data?.length}
                count={count}
                setCurrentPage={setCurrentPage}
                setCount={setCount}
                currentPage={currentPage}
              />
            </TableContainer>
          </Box>
        </>
      )}
    </>
  )
}
