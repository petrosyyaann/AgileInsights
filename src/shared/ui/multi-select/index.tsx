import { useState, useEffect } from 'react'
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
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
  Checkbox,
  Input,
  Stack,
  MenuItem,
  Text,
  Radio,
} from '@chakra-ui/react'
import { Chevron } from 'shared/iconpack'
import { useFiltresStore } from 'entities/filters/modal'

type Option = {
  label: string
  value: string
}

type MultiSelectProps = {
  typeRadio?: boolean
  options?: Option[]
  onChange?: (selected: string[] | [number, number]) => void
  placeholder: string
  type: 'multi' | 'range'
}

export const MultiSelect = ({
  typeRadio,
  options = [],
  onChange,
  placeholder,
  type,
}: MultiSelectProps) => {
  const { minRange, maxRange, setMinRange, setMaxRange, selectedSprints } =
    useFiltresStore()
  const [search, setSearch] = useState('')

  function handleToggleSprint(value: string) {
    if (typeRadio) {
      useFiltresStore.setState({ selectedSprints: [Number(value)] })
    } else {
      useFiltresStore.setState((state) => ({
        selectedSprints: state.selectedSprints.includes(Number(value))
          ? state.selectedSprints.filter((s) => s !== Number(value))
          : [...state.selectedSprints, Number(value)],
      }))
    }
  }

  const handleRangeChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      const newMin = Math.min(value, maxRange)
      setMinRange(newMin)
    } else {
      const newMax = Math.max(value, minRange)
      setMaxRange(newMax)
    }
    onChange?.([minRange, maxRange])
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  const isRangeInvalid = minRange > maxRange

  useEffect(() => {
    if (type === 'range') {
      onChange?.([minRange, maxRange])
    }
  }, [minRange, maxRange, onChange])

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
              ? selectedSprints.length > 0
                ? `Выбрано: ${selectedSprints.length}`
                : placeholder
              : `с ${minRange} по ${maxRange}`}
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
                    onClick={() => handleToggleSprint(option.value)}
                  >
                    {typeRadio ? (
                      <Radio
                        isChecked={selectedSprints.includes(
                          Number(option.value)
                        )}
                        onChange={() => handleToggleSprint(option.value)}
                      >
                        {option.label}
                      </Radio>
                    ) : (
                      <Checkbox
                        isChecked={selectedSprints.includes(
                          Number(option.value)
                        )}
                        onChange={() => handleToggleSprint(option.value)}
                      >
                        {option.label}
                      </Checkbox>
                    )}
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
                  value={minRange}
                  onChange={(valueString) =>
                    handleRangeChange('min', parseInt(valueString) || 0)
                  }
                  min={0}
                  max={maxRange}
                  isInvalid={isRangeInvalid}
                >
                  <NumberInputField
                    borderColor={isRangeInvalid ? 'red.500' : 'gray.200'}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text color="#9896A9">по</Text>
                <NumberInput
                  size="sm"
                  value={maxRange}
                  onChange={(valueString) =>
                    handleRangeChange('max', parseInt(valueString) || 0)
                  }
                  min={minRange}
                  max={14}
                  isInvalid={isRangeInvalid}
                >
                  <NumberInputField
                    borderColor={isRangeInvalid ? 'red.500' : 'gray.200'}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
              <Slider
                value={minRange}
                min={1}
                max={14}
                onChange={(value) => handleRangeChange('min', value)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Slider
                value={maxRange}
                min={1}
                max={14}
                onChange={(value) => handleRangeChange('max', value)}
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
