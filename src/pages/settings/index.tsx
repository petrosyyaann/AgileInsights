import { useState } from 'react'
import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import { ContainerApp } from 'shared/ui'
import { useSettingsStore } from 'entities/settings/modal'
import HealthSettingCard from 'shared/ui/health-setting-card'

const SettingsPage = () => {
  const { settings, addSetting, removeSetting } = useSettingsStore()

  const [name, setName] = useState('')
  const [fieldName, setFieldName] = useState('')
  const [sign, setSign] = useState<'>' | '<'>('>')
  const [threshold, setThreshold] = useState<number>(0)

  const handleAdd = () => {
    if (name && fieldName && threshold) {
      addSetting({
        id: `${Date.now()}`,
        name,
        field_name: fieldName,
        sign,
        threshold,
      })
      setName('')
      setFieldName('')
      setThreshold(0)
    }
  }

  return (
    <ContainerApp>
      <Flex direction="column" h="100%">
        <Text fontSize="xl" mb={4}>
          Настройки триггеров спринта
        </Text>
        <Box mb={8}>
          <Flex gap={4} mb={4}>
            <Input
              placeholder="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              placeholder="Поле"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
            >
              <option value="Оценка к работе">Оценка к работе</option>
              <option value="Оценка в работе">Оценка в работе</option>
              <option value="Оценка сделано">Оценка сделано</option>
              <option value="Оценка снято">Оценка снято</option>
              <option value="Процент к работе от всего">
                Процент к работе от всего
              </option>
              <option value="Процент в работе от всего">
                Процент в работе от всего
              </option>
              <option value="Процент сделано от всего">
                Процент сделано от всего
              </option>
              <option value="Процент снято от всего">
                Процент снято от всего
              </option>
              <option value="Средний процент изменения беклога">
                Средний процент изменения беклога
              </option>
              <option value="Процент заблокированных задач">
                Процент заблокированных задач
              </option>
            </Select>
            <Select
              value={sign}
              onChange={(e) => setSign(e.target.value as '>' | '<')}
            >
              <option value=">">Больше</option>
              <option value="<">Меньше</option>
            </Select>
            <Input
              type="number"
              placeholder="Трешхолд"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
            />
            <Button colorScheme="blue" onClick={handleAdd}>
              +
            </Button>
          </Flex>
        </Box>

        <Box>
          {settings.map((setting) => (
            <HealthSettingCard
              key={setting.id}
              setting={setting}
              onRemove={() => removeSetting(setting.id)}
            />
          ))}
        </Box>
      </Flex>
    </ContainerApp>
  )
}

export default SettingsPage
