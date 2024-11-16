import { useState } from 'react'
import {
  Box,
  Checkbox,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Stack,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { Chevron } from 'shared/iconpack'

type Option = {
  label: string
  value: string
}

type MultiSelectProps = {
  options?: Option[]
  onChange?: (selected: string[] | [number, number]) => void
  placeholder: string
  type: 'multi' | 'range'
  minRange?: number
  maxRange?: number
}

export const MultiSelect = ({
  options = [],
  onChange,
  placeholder,
  type,
  minRange = 0,
  maxRange = 100,
}: MultiSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [rangeValues, setRangeValues] = useState<[number, number]>([
    minRange,
    maxRange,
  ])
  const [search, setSearch] = useState('')

  const toggleSelection = (value: string) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value]

    setSelectedValues(updatedValues)
    onChange?.(updatedValues)
  }

  const handleRangeChange = (index: number, value: number) => {
    const newRange = [...rangeValues] as [number, number]
    newRange[index] = value
    setRangeValues(newRange)
    onChange?.(newRange)
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box>
      <Menu closeOnSelect={false}>
        <MenuButton
          colorScheme="transparent"
          border="1px solid #9896A9"
          color="#373645"
          _hover={{
            color: '#373645',
          }}
          as={Button}
          rightIcon={<Chevron />}
          minWidth="240px"
        >
          <Flex w="100%">
            {type === 'multi'
              ? selectedValues.length > 0
                ? `Выбрано: ${selectedValues.length}`
                : placeholder
              : `с ${rangeValues[0]} по ${rangeValues[1]}`}
          </Flex>
        </MenuButton>
        <MenuList minWidth="240px">
          {type === 'multi' ? (
            <>
              <Box px={3} py={2}>
                <Input
                  placeholder="Поиск..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="sm"
                />
              </Box>
              <Stack spacing={1} px={2}>
                {filteredOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => toggleSelection(option.value)}
                  >
                    <Checkbox
                      isChecked={selectedValues.includes(option.value)}
                      onChange={() => toggleSelection(option.value)}
                    >
                      {option.label}
                    </Checkbox>
                  </MenuItem>
                ))}
                {filteredOptions.length === 0 && (
                  <Text textAlign="center" color="gray.500" fontSize="sm">
                    Опции не найдены
                  </Text>
                )}
              </Stack>
            </>
          ) : (
            <Stack px={3} py={2} spacing={3}>
              <Flex gap={3} align="center">
                <NumberInput
                  size="sm"
                  value={rangeValues[0]}
                  onChange={(value) =>
                    handleRangeChange(0, parseInt(value) || minRange)
                  }
                  min={minRange}
                  max={rangeValues[1]}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text color="#9896A9">по</Text>
                <NumberInput
                  size="sm"
                  value={rangeValues[1]}
                  onChange={(value) =>
                    handleRangeChange(1, parseInt(value) || maxRange)
                  }
                  min={rangeValues[0]}
                  max={maxRange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Slider
                value={rangeValues[0]}
                min={minRange}
                max={maxRange}
                onChange={(value) => handleRangeChange(0, value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Slider
                value={rangeValues[1]}
                min={minRange}
                max={maxRange}
                onChange={(value) => handleRangeChange(1, value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Stack>
          )}
        </MenuList>
      </Menu>
    </Box>
  )
}
