import { Flex, Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { SprintTable } from 'shared/ui/sprint-table'
export interface DataRow {
  [key: string]: string
}

export const SprintTableCard = ({ dataTable, dataTooltip }: { dataTable: DataRow[], dataTooltip: DataRow[] }) => {
  const generateColumns = (): ColumnDef<DataRow>[] => {
    const columns: ColumnDef<DataRow>[] = [
      {
        accessorKey: 'Спринты',
        header: 'Спринты',
        cell: (info) => info.getValue(),
      },
    ]

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
      <SprintTable dataTooltip={dataTooltip} data={dataTable} columns={dynamicColumns} />
    </Flex>
  )
}
