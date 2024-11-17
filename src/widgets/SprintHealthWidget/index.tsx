import { Box, Text, Link, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const SprintHealthWidget = () => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      maxW="300px"
    >
      <Flex>
        <Box
          background="#7CE86A"
          borderRadius="10px"
          w="4px"
          h="100%"
          mr="15px"
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="#4A5568">
            Здоровье спринта
          </Text>

          <Text fontSize="4xl" fontWeight="bold" color="#7CE86A" mb={1}>
            Здоров
          </Text>
        </Box>
      </Flex>
      <Link
        ml="auto"
        onClick={() => {
          navigate('/settings')
        }}
        color="#7984F1"
        fontSize="sm"
        fontWeight="medium"
        textDecoration="none"
      >
        Подробнее...
      </Link>
    </Box>
  )
}
