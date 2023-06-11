import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React from 'react'

export default function PaginationSetcion({
  totalTodos,
  count,
  setCurrentPage,
  setCount,
  currentPage,
}) {
  let arr = []

  for (let i = 1; i <= Math.ceil(totalTodos / count); i++) {
    arr.push(i)
  }
  return (
    <Flex gap={'20px'} p={'20px'} w={'40%'} margin={'0 auto'}>
      <Input
        width={'80px'}
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <Button
        onClick={() => setCurrentPage((old) => (old > 1 ? old - 1 : old))}
      >
        prev
      </Button>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {arr
          .slice(
            currentPage == 3
              ? currentPage - 3
              : currentPage == 2
              ? currentPage - 2
              : currentPage == 1
              ? currentPage - 1
              : currentPage - 3,
            currentPage + 2
          )
          .map((el, i) => {
            return (
              <Button
                //isActive
                key={i}
                onClick={() => setCurrentPage(el)}
                className={el == currentPage ? 'active' : ''}
                _hover={''}
              >
                {el}
              </Button>
            )
          })}
      </Box>
      <Button
        onClick={() =>
          setCurrentPage((old) => (currentPage < arr.length ? old + 1 : old))
        }
      >
        next
      </Button>
    </Flex>
  )
}
