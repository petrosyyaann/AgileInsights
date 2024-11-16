import React, { useRef, useState } from 'react'
import { Flex, Icon, IconButton, Input, Text, useToast } from '@chakra-ui/react'
import { Close, Upload } from 'shared/iconpack'
import { Button, ContainerApp } from 'shared/ui'

const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : []
    if (files.length + newFiles.length > 3) {
      toast({
        title: 'Ошибка!',
        description: 'Можно загрузить только три файла.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3))
  }
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <ContainerApp>
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="100%"
        h="100%"
      >
        <Flex w="100%">
          <Text fontSize="18px" fontWeight={700} mb="15px">
            Загрузка данных
          </Text>
        </Flex>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          borderWidth={2}
          borderColor="blue.500"
          borderStyle="dashed"
          borderRadius="md"
          p={6}
          w="100%"
          h="100%"
          textAlign="center"
          position="relative"
        >
          <Icon as={Upload} boxSize={12} color="blue.500" />
          <Text fontSize="18px" mt={4}>
            Перенесите файл с данными в это окно <br /> <b>CSV</b>
          </Text>
          <Text fontSize="18px" mt={4}>
            или
          </Text>
          <Input
            type="file"
            multiple
            accept=".csv"
            onChange={handleFileChange}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0}
            cursor="pointer"
            h="100%"
            ref={fileInputRef}
          />
          <Button
            mt={4}
            background="red.500"
            color="white"
            onClick={handleUploadClick}
          >
            Нажмите для загрузки
          </Button>
        </Flex>
        {files.length !== 0 && (
          <Flex mt={6} w="100%" direction="row" alignItems="center" gap="10px">
            <Text>Выбранные файлы:</Text>
            {files.map((file, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Text fontSize="sm" noOfLines={1}>
                  {file.name}
                </Text>
                <IconButton
                  colorScheme="transparent"
                  icon={<Close />}
                  aria-label="close"
                  onClick={() => handleRemoveFile(index)}
                />
              </Flex>
            ))}
            {files.length === 3 && (
              <Button
                ml="auto"
                background="blue.500"
                color="white"
                onClick={() => console.log('отправили')}
              >
                Импортировать
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </ContainerApp>
  )
}

export default UploadPage
