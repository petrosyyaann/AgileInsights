import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'

// Тип для элемента списка
interface ListItemProps {
  label: string // Текст рядом с точкой
  color: string // Цвет точки
}

// Компонент для одной точки с текстом
export const ColorDotListItem: React.FC<ListItemProps> = ({ label, color }) => {
  return (
    <HStack spacing={3}>
      <Box
        width="7px"
        height="7px"
        borderRadius="50%"
        bg={color}
        flexShrink={0}
      />
      <Text fontSize="14px">{label}</Text>
    </HStack>
  )
}
