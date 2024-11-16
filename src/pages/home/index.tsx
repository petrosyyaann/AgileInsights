import { Flex, MultiSelect } from 'shared/ui'

const HomePage = () => {
  return (
    <Flex h="100%" w="100%">
      <Flex
        w="100%"
        bg="white"
        direction="row"
        justify="center"
        borderRadius="20px"
        mb="30px"
        mr="30px"
        padding="20px 30px 20px 30px"
        h="17vh"
        justifyContent="flex-start"
        alignItems="center"
        gap="20px"
      >
        <MultiSelect options={[]} placeholder="Спринты" type={'multi'} />
        <MultiSelect
          options={[]}
          placeholder="Команда спринта"
          type={'multi'}
        />
        <MultiSelect
          options={[]}
          placeholder="Дни спринта для анализа"
          type={'range'}
        />
      </Flex>
    </Flex>
  )
}

export default HomePage
