import { ContainerApp, MultiSelect } from 'shared/ui'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useGetSprints } from 'pages/home/lib/useGetSprints'
import { useGetCompare } from './lib/useGetCompare'

const ComparePage = () => {
  const { data } = useGetSprints()
  const { dataCompare } = useGetCompare()
  const rows = dataCompare && [
    {
      name: 'Оценка к работе',
      points: dataCompare.to_do_estimation_points * 100,
      top: dataCompare.to_do_estimation_top * 100,
    },
    {
      name: 'Оценка в работе',
      points: dataCompare.processed_estimation_points * 100,
      top: dataCompare.processed_estimation_top * 100,
    },
    {
      name: 'Оценка сделано',
      points: dataCompare.done_estimation_points * 100,
      top: dataCompare.done_estimation_top * 100,
    },
    {
      name: 'Оценка снято',
      points: dataCompare.removed_estimation_points * 100,
      top: dataCompare.removed_estimation_top * 100,
    },
    {
      name: 'Средний процент изменения беклога',
      points: dataCompare.excluded_tasks_points * 100,
      top: dataCompare.excluded_tasks_top * 100,
    },
    {
      name: 'Процент заблокированных задач',
      points: dataCompare.blocked_tasks_points * 100,
      top: dataCompare.blocked_tasks_top * 100,
    },
  ]
  return (
    <ContainerApp>
      {rows && (
        <Flex h="100%" direction="column">
          <Text fontSize="18px" color="#373645" fontWeight={700}>
            Сравнение
          </Text>
          <Flex h="100%" direction="column" justifyContent="space-between">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Параметры сравнения</Th>
                  <Th>
                    <MultiSelect
                      typeRadio
                      options={data}
                      placeholder="Спринты"
                      type={'multi'}
                    />
                  </Th>
                  <Th>Сравнение со всеми спринтами</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.name}</Td>
                    <Td>{row.points && row.points.toFixed(2)}%</Td>
                    <Td>{`Больше, чем у ${row.top && row.top.toFixed(2)}% спринтов`}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Box
              p={4}
              bg="purple.50"
              border="1px solid"
              borderColor="purple.200"
              borderRadius="md"
            >
              <Text fontWeight="bold" fontSize="lg">
                Итог: параметры этого спринта лучше, чем параметры других
                спринтов на{' '}
                {dataCompare.result && (dataCompare.result * 100).toFixed(2)}%
              </Text>
            </Box>
          </Flex>
        </Flex>
      )}
    </ContainerApp>
  )
}

export default ComparePage
