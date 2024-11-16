import { Flex, Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { SprintTable } from 'shared/ui/sprint-table'

export const SprintTableCard = () => {
  interface DataRow {
    [key: string]: string
  }

  const generateColumns = (): ColumnDef<DataRow>[] => {
    const columns: ColumnDef<DataRow>[] = [
      {
        accessorKey: 'Спринты',
        header: 'Спринты',
        cell: (info) => info.getValue(),
      },
    ]

    // Генерируем столбцы от 1 до 14
    for (let i = 1; i <= 14; i++) {
      columns.push({
        accessorKey: i.toString(),
        header: i.toString(),
        cell: (info) => info.getValue(),
      })
    }

    return columns
  }

  const dynamicColumns: ColumnDef<DataRow>[] = generateColumns()

  const mockData: DataRow[] = [
    {
      Спринты: 'Спринт 1',
      '1': '2/0',
      '2': '2/0',
      '3': '2/0',
      '4': '2/0',
      '5': '2/0',
      '6': '2/0',
      '7': '2/0',
      '8': '2/0',
      '9': '2/0',
      '10': '2/0',
      '11': '2/0',
      '12': '2/0',
      '13': '2/0',
      '14': '2/0',
    },
    {
      Спринты: 'Спринт 2',
      '1': '2/0',
      '2': '2/0',
      '3': '2/0',
      '4': '2/0',
      '5': '2/0',
      '6': '2/0',
      '7': '2/0',
      '8': '2/0',
      '9': '2/0',
      '10': '2/0',
      '11': '2/0',
      '12': '2/0',
      '13': '2/0',
      '14': '2/0',
    },
    {
      Спринты: 'Спринт 3',
      '1': '2/0',
      '2': '2/0',
      '3': '2/0',
      '4': '2/0',
      '5': '2/0',
      '6': '2/0',
      '7': '2/0',
      '8': '2/0',
      '9': '2/0',
      '10': '2/0',
      '11': '2/0',
      '12': '2/0',
      '13': '2/0',
      '14': '2/0',
    },
    {
      Спринты: 'Спринт 4',
      '1': '2/0',
      '2': '2/0',
      '3': '2/0',
      '4': '2/0',
      '5': '2/0',
      '6': '2/0',
      '7': '2/0',
      '8': '2/0',
      '9': '2/0',
      '10': '2/0',
      '11': '2/0',
      '12': '2/0',
      '13': '2/0',
      '14': '2/0',
    },
    {
      Спринты: 'Спринт 5',
      '1': '2/0',
      '2': '2/0',
      '3': '2/0',
      '4': '2/0',
      '5': '2/0',
      '6': '2/0',
      '7': '2/0',
      '8': '2/0',
      '9': '2/0',
      '10': '2/0',
      '11': '2/0',
      '12': '2/0',
      '13': '2/0',
      '14': '2/0',
    },
  ]

  return (
    <Flex
      w="65vw"
      bg="white"
      direction="column"
      justify="center"
      borderRadius="20px"
      padding="10px 20px 10px 20px"
    >
      <Text fontSize="18px" color="#373645" fontWeight={700} py="10px">
        «Добавлено» / «Исключено» в каждый день спринта, в Ч/Д
      </Text>
      <SprintTable data={mockData} columns={dynamicColumns} />
    </Flex>
  )
}
