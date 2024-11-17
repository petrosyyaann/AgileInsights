import {
  Box,
  Text,
  Link,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Stack,
  Divider,
  Tag,
} from '@chakra-ui/react'
import { useSettingsStore } from 'entities/settings/modal'

interface PropsSprintHealthWidget {
  to_do_estimation_point: number
  processed_estimation_point: number
  done_estimation_point: number
  removed_estimation_point: number
  dataBlockedPersent: number
  dataBacklog: number
}

export const SprintHealthWidget = ({
  to_do_estimation_point,
  processed_estimation_point,
  done_estimation_point,
  removed_estimation_point,
  dataBlockedPersent,
  dataBacklog,
}: PropsSprintHealthWidget) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { settings } = useSettingsStore()

  // Сумма всех значений для расчета процентов
  const total =
    to_do_estimation_point +
    processed_estimation_point +
    done_estimation_point +
    removed_estimation_point

  const toDoPercent = (to_do_estimation_point / total) * 100 || 0
  const processedPercent = (processed_estimation_point / total) * 100 || 0
  const donePercent = (done_estimation_point / total) * 100 || 0
  const removedPercent = (removed_estimation_point / total) * 100 || 0

  const failedConditions = settings.filter(
    ({ field_name, sign, threshold }) => {
      let value = 0

      switch (field_name) {
        case 'Оценка к работе':
          value = to_do_estimation_point
          break
        case 'Оценка в работе':
          value = processed_estimation_point
          break
        case 'Оценка сделано':
          value = done_estimation_point
          break
        case 'Оценка снято':
          value = removed_estimation_point
          break
        case 'Процент к работе от всего':
          value = toDoPercent
          break
        case 'Процент в работе от всего':
          value = processedPercent
          break
        case 'Процент сделано от всего':
          value = donePercent
          break
        case 'Процент снято от всего':
          value = removedPercent
          break
        case 'Средний процент изменения беклога':
          value = dataBlockedPersent
          break
        case 'Процент заблокированных задач':
          value = dataBacklog
          break
      }

      return sign === '>' ? value <= threshold : value >= threshold
    }
  )

  const failedConditionsCount = failedConditions.length
  const healthColor =
    failedConditionsCount === 0
      ? '#7CE86A' // Зеленый
      : failedConditionsCount <= 3
        ? '#FFE15A' // Желтый
        : '#FF6A6A' // Красный

  const healthStatus =
    failedConditionsCount === 0
      ? 'Здоров'
      : failedConditionsCount <= 3
        ? 'Предупреждение'
        : 'Нездоров'

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      maxW="300px"
      mr="15px"
    >
      <Flex>
        <Box
          background={healthColor}
          borderRadius="10px"
          w="4px"
          h="100%"
          mr="15px"
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="#4A5568">
            Здоровье спринта
          </Text>

          <Text fontSize="4xl" fontWeight="bold" color={healthColor} mb={1}>
            {healthStatus}
          </Text>
        </Box>
      </Flex>
      <Link
        ml="auto"
        onClick={onOpen}
        color="#7984F1"
        fontSize="sm"
        fontWeight="medium"
        textDecoration="none"
      >
        Подробнее...
      </Link>

      {/* Модалка с нарушенными условиями */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {failedConditionsCount === 0 ? (
              <Text fontSize="lg">Все условия выполнены.</Text>
            ) : (
              <Stack spacing={4}>
                <Text fontSize="md" fontWeight="bold">
                  Нарушенные условия:
                </Text>
                <Divider />
                {failedConditions.map((condition, index) => {
                  let value = 0

                  switch (condition.field_name) {
                    case 'Оценка к работе':
                      value = to_do_estimation_point
                      break
                    case 'Оценка в работе':
                      value = processed_estimation_point
                      break
                    case 'Оценка сделано':
                      value = done_estimation_point
                      break
                    case 'Оценка снято':
                      value = removed_estimation_point
                      break
                    case 'Процент к работе от всего':
                      value = toDoPercent
                      break
                    case 'Процент в работе от всего':
                      value = processedPercent
                      break
                    case 'Процент сделано от всего':
                      value = donePercent
                      break
                    case 'Процент снято от всего':
                      value = removedPercent
                      break
                    case 'Средний процент изменения беклога':
                      value = dataBlockedPersent
                      break
                    case 'Процент заблокированных задач':
                      value = dataBacklog
                      break
                  }

                  return (
                    <Flex key={index} w="100%" justifyContent="space-between">
                      <Box>
                        <Text>
                          <strong>{condition.field_name}</strong>: {value}{' '}
                        </Text>
                      </Box>
                      <Box>
                        <Text>
                          <Tag
                            size="sm"
                            colorScheme={
                              condition.sign === '>'
                                ? value <= condition.threshold
                                  ? 'red'
                                  : 'green'
                                : value >= condition.threshold
                                  ? 'red'
                                  : 'green'
                            }
                          >
                            Должно быть {condition.sign} {condition.threshold}
                          </Tag>
                        </Text>
                      </Box>
                    </Flex>
                  )
                })}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
