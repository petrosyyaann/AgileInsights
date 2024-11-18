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

  const total =
    to_do_estimation_point +
    processed_estimation_point +
    done_estimation_point +
    removed_estimation_point

  const calculatePercentage = (value: number) => (value / total) * 100 || 0

  const fieldValues: Record<string, number> = {
    'Оценка к работе': to_do_estimation_point,
    'Оценка в работе': processed_estimation_point,
    'Оценка сделано': done_estimation_point,
    'Оценка снято': removed_estimation_point,
    'Процент к работе от всего': calculatePercentage(to_do_estimation_point),
    'Процент в работе от всего': calculatePercentage(
      processed_estimation_point
    ),
    'Процент сделано от всего': calculatePercentage(done_estimation_point),
    'Процент снято от всего': calculatePercentage(removed_estimation_point),
    'Средний процент изменения беклога': dataBacklog * 100,
    'Процент заблокированных задач': dataBlockedPersent,
  }

  const failedConditions = settings.filter(
    ({ field_name, sign, threshold }) => {
      const value = fieldValues[field_name] || 0
      return sign === '>' ? value <= threshold : value >= threshold
    }
  )

  const failedConditionsCount = failedConditions.length
  const healthColor =
    failedConditionsCount === 0
      ? '#7CE86A'
      : failedConditionsCount < 2
        ? '#FFE15A'
        : '#FF6A6A'

  const healthStatus =
    failedConditionsCount === 0
      ? 'Здоров'
      : failedConditionsCount < 2
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
                {failedConditions.map((condition, index) => (
                  <Flex key={index} w="100%" justifyContent="space-between">
                    <Box>
                      <Text>
                        <strong>{condition.field_name}</strong>:{' '}
                        {fieldValues[condition.field_name]}{' '}
                      </Text>
                    </Box>
                    <Box>
                      <Text>
                        <Tag
                          size="sm"
                          colorScheme={
                            condition.sign === '>'
                              ? fieldValues[condition.field_name] <=
                                condition.threshold
                                ? 'red'
                                : 'green'
                              : fieldValues[condition.field_name] >=
                                  condition.threshold
                                ? 'red'
                                : 'green'
                          }
                        >
                          Должно быть {condition.sign} {condition.threshold}
                        </Tag>
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
