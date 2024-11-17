import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box, Tooltip } from '@chakra-ui/react'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table'

interface DataRow {
  [key: string]: string
}

interface TableProps {
  data: DataRow[]
  columns: ColumnDef<DataRow>[]
  dataTooltip: DataRow[]
}

export const SprintTable: React.FC<TableProps> = ({
  data,
  columns,
  dataTooltip,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Box
      w="100%"
      overflowX="auto"
      p={4}
      border="1px solid #E2E8F0"
      borderRadius="md"
    >
      <Table colorScheme="gray">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr p={2} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th p={2} key={header.id} textAlign="center" color="#9896A9">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <Tr p={2} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td p={2} key={cell.id} textAlign="center">
                  <Tooltip
                    label={
                      dataTooltip[rowIndex]?.[cell.column.id] || 'Нет данных'
                    }
                    placement="top"
                    hasArrow
                  >
                    <Box>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Box>
                  </Tooltip>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
