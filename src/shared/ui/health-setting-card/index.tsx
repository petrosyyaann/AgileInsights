import { Flex, Text, Button } from '@chakra-ui/react'

interface HealthSetting {
  id: string
  name: string
  field_name: string
  sign: '>' | '<'
  threshold: number
}

interface HealthSettingCardProps {
  setting: HealthSetting
  onRemove: () => void
}

const HealthSettingCard: React.FC<HealthSettingCardProps> = ({
  setting,
  onRemove,
}) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      p={4}
      borderWidth={1}
      borderRadius="md"
      mb={4}
    >
      <Text fontWeight="bold">{setting.name}</Text>
      <Flex gap={4} align="center">
        <Text fontSize="18px">{setting.field_name}</Text>
        <Text fontSize="18px">{setting.sign}</Text>
        <Text fontSize="18px">{setting.threshold}</Text>
        <Button colorScheme="red" onClick={onRemove}>
          ✕
        </Button>
      </Flex>
    </Flex>
  )
}

export default HealthSettingCard
