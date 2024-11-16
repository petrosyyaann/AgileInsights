import { Flex, Text } from 'shared/ui'
import PieChart from '../polar-area-chart'

function getStatus(percent: number): { status: string; color: string } {
  if (percent > 50) {
    return { status: 'Вышло за пределы нормы', color: '#F179C1' }
  } else if (percent >= 20 && percent <= 50) {
    return { status: 'В пределах нормы', color: '#7984F1' }
  } else {
    return { status: 'Оптимальное значение', color: '#61C6FF' }
  }
}

export const Card = ({
  percent,
  title,
  description,
}: {
  percent: number
  title: string
  description?: string
}) => {
  const status = getStatus(percent)
  return (
    <Flex
      w="100%"
      bg="white"
      direction="column"
      borderRadius="20px"
      mb="30px"
      mr="30px"
      padding="10px 40px 10px 40px"
      h="40vh"
      gap="15px"
      alignItems="flex-start"
    >
      <Text fontSize="18px" color="#373645" fontWeight={700}>
        {title}
      </Text>
      {!description ? (
        <Flex
          h="100%"
          alignItems="center"
          w="100%"
          justifyContent="space-around"
        >
          <Flex direction="column" w="100%">
            <Text fontSize="56px" color="#373645" fontWeight={700}>
              {percent}%
            </Text>
            <Text fontSize="18px" color={status.color} fontWeight={700}>
              {status.status}
            </Text>
          </Flex>
          <Flex h="30vh" w="30vw">
            <PieChart percent={percent} color={status.color} />
          </Flex>
        </Flex>
      ) : (
        <Flex direction="column">
          <Text fontSize="56px" color="#373645" fontWeight={700}>
            {percent}
          </Text>
          <Text fontSize="18px" color="#61C6FF" fontWeight={700}>
            {description}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}
