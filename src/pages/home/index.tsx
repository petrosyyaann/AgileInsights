import { Box, ColorDotListItem, Flex, MultiSelect, Text } from 'shared/ui'
import { Card } from 'shared/ui/card'
import StackedBarChart from 'shared/ui/histogram'

const HomePage = () => {
  const mockData = {
    labels: ['Спринт 1', 'Спринт 2', 'Спринт 3', 'Спринт 4'],
    datasets: [
      {
        label: 'К выполнению',
        data: [0, 4, 0, 3],
        backgroundColor: '#8AF179',
        borderRadius: 100,
      },
      {
        label: 'В работе',
        data: [6, 4, 5, 3],
        backgroundColor: '#7984F1',
        borderRadius: 100,
      },
      {
        label: 'Сделано',
        data: [6, 4, 5, 3],
        backgroundColor: '#F179C1',
        borderRadius: 100,
      },
      {
        label: 'Снято',
        data: [0, 4, 5, 3],
        backgroundColor: '#61C6FF',
        borderRadius: 100,
      },
    ],
  }

  const items = [
    { label: 'К выполнению', color: '#8AF179' },
    { label: 'В работе', color: '#7984F1' },
    { label: 'Сделано', color: '#F179C1' },
    { label: 'Снято', color: '#61C6FF' },
  ]

  return (
    <Flex h="90vh" w="100%" direction="column" overflow="scroll">
      <Flex
        w="100%"
        bg="white"
        direction="column"
        justify="center"
        borderRadius="20px"
        mb="30px"
        mr="30px"
        padding="10px 20px 10px 20px"
        h="15vh"
        gap="15px"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Text fontSize="18px" color="#373645" fontWeight={700}>
          Выберите параметры
        </Text>
        <Flex
          w="100%"
          direction="row"
          justify="center"
          justifyContent="flex-start"
          alignItems="center"
          gap="20px"
        >
          <MultiSelect
            options={[
              { label: 'Спринт 1', value: 'Sprint 1' },
              { label: 'Спринт 2', value: 'Sprint 2' },
              { label: 'Спринт 3', value: 'Sprint 3' },
              { label: 'Спринт 4', value: 'Sprint 4' },
            ]}
            placeholder="Спринты"
            type={'multi'}
          />
          <MultiSelect
            options={[
              { label: 'Asisiti', value: 'Asisiti' },
              { label: 'SpchX', value: 'SpchX' },
            ]}
            placeholder="Команда спринта"
            type={'multi'}
          />
          <MultiSelect
            minRange={1}
            maxRange={14}
            placeholder="Дни спринта для анализа"
            type={'range'}
          />
        </Flex>
      </Flex>
      <Flex h="40vh" gap="30px">
        <Flex
          w="45vw"
          bg="white"
          direction="column"
          justify="center"
          borderRadius="20px"
          padding="10px 20px 10px 20px"
        >
          <Text fontSize="18px" color="#373645" fontWeight={700}>
            Здоровье
          </Text>
          <Flex h="30vh" gap="10px">
            <Flex w="35vw">
              <StackedBarChart mockData={mockData} />
            </Flex>
            <Flex
              as="ul"
              listStyleType="none"
              margin={0}
              padding={0}
              w="130px"
              direction="column"
            >
              {items.map((item, index) => (
                <Box as="li" key={index} marginBottom={2}>
                  <ColorDotListItem label={item.label} color={item.color} />
                </Box>
              ))}
            </Flex>
          </Flex>
          <Text
            mx="auto"
            pr="80px"
            fontSize="15px"
            color="#373645"
            fontWeight={500}
          >
            Оценка Ч/Д
          </Text>
        </Flex>
        <Card percent={5.3} title={'Средний процент измнения беклога:'} />
      </Flex>
      <Flex direction="row" mt="30px" w="100%" justifyContent="flex-end">
        <Flex w="90vw">table</Flex>
        <Flex w="100%">
          <Card
            percent={14.5}
            title={'Заблокировано задач в Ч/Д:'}
            description="12% от общего числа в спринте"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HomePage
