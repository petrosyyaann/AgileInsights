import { Box, ColorDotListItem, Flex, MultiSelect, Text } from 'shared/ui'
import { Card } from 'shared/ui/card'
import StackedBarChart from 'shared/ui/histogram'
import { SprintTableCard } from 'widgets/SprintTableCard'
import { useGetSprints } from './lib/useGetSprints'
import { useFiltresStore } from 'entities/filters/modal'
import { SprintHealthWidget } from 'widgets/SprintHealthWidget'

const HomePage = () => {
  const items = [
    { label: 'К выполнению', color: '#8AF179' },
    { label: 'В работе', color: '#7984F1' },
    { label: 'Сделано', color: '#F179C1' },
    { label: 'Снято', color: '#61C6FF' },
  ]

  const {
    data,
    dataHistogarm,
    dataBacklog,
    dataBlockedSum,
    dataBlockedPersent,
    dataTable,
    dataTooltip,
    to_do_estimation_points,
    processed_estimation_points,
    done_estimation_points,
    removed_estimation_points,
  } = useGetSprints()
  const { selectedSprints } = useFiltresStore()

  return (
    <Flex
      h="90vh"
      w="100%"
      direction="column"
      overflowY="scroll"
      overflowX="hidden"
      mr="30px"
    >
      <Flex
        w="100%"
        bg="white"
        justify="center"
        borderRadius="20px"
        mb="20px"
        padding="10px 20px 10px 20px"
        h="19vh"
        gap="15px"
        justifyContent="space-between"
      >
        <Flex direction="column" alignItems="flex-start">
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
            <MultiSelect options={data} placeholder="Спринты" type={'multi'} />
            {/* <MultiSelect
            options={[
              { label: 'Asisiti', value: 'Asisiti' },
              { label: 'SpchX', value: 'SpchX' },
            ]}
            placeholder="Команда спринта"
            type={'multi'}
          /> */}
            <MultiSelect placeholder="Дни спринта для анализа" type={'range'} />
          </Flex>
        </Flex>
        {selectedSprints.length === 1 &&
          to_do_estimation_points &&
          processed_estimation_points &&
          done_estimation_points &&
          removed_estimation_points && (
            <SprintHealthWidget
              to_do_estimation_point={to_do_estimation_points[0]}
              processed_estimation_point={processed_estimation_points[0]}
              done_estimation_point={done_estimation_points[0]}
              removed_estimation_point={removed_estimation_points[0]}
              dataBlockedPersent={dataBlockedPersent}
              dataBacklog={dataBacklog}
            />
          )}
      </Flex>
      <Flex h="45vh" gap="20px">
        <Flex
          w={'100%'}
          bg="white"
          direction="column"
          justify="center"
          borderRadius="20px"
          padding="10px 20px 10px 20px"
        >
          <Text fontSize="18px" color="#373645" fontWeight={700}>
            Сумма оценок на каждом этапе спринта
          </Text>
          <Flex h={selectedSprints.length === 1 ? '30vh' : '35vh'} gap="10px">
            <Flex w="100%">
              {dataHistogarm && <StackedBarChart mockData={dataHistogarm} />}
            </Flex>
            <Flex
              as="ul"
              listStyleType="none"
              margin={0}
              padding={0}
              w="140px"
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
          {selectedSprints.length === 1 && (
            <Flex direction="column" mt="10px">
              <ColorDotListItem
                label={
                  'Снято - не должно составлять более 10% от общего объема'
                }
                color={'#61C6FF'}
              />
              <ColorDotListItem
                label={
                  'К выполнению - не должно составлять более 20% от общего объема'
                }
                color={'#8AF179'}
              />
            </Flex>
          )}
        </Flex>
        <Card
          percent={dataBacklog || 0}
          title={
            selectedSprints.length === 1
              ? 'Средний процент измнения беклога:'
              : 'Процент измнения беклога:'
          }
        />
      </Flex>
      <Flex direction="row" mt="20px" w="100%" gap="20px">
        <Flex>
          <SprintTableCard dataTooltip={dataTooltip} dataTable={dataTable} />
        </Flex>
        <Flex w="100%">
          <Card
            percent={dataBlockedSum || 0}
            title={'Общая оценка заблокированных задач в Ч/Д:'}
            description={
              dataBlockedPersent !== 0
                ? `${dataBlockedPersent}% от общего числа в спринте`
                : ' '
            }
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HomePage
