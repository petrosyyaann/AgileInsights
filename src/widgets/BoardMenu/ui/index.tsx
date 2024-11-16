import { useToast } from '@chakra-ui/react'
import { logout } from 'entities/user/api'
import { useMatch, useNavigate } from 'react-router-dom'
import { Edit, Logout, Profile, Tasks } from 'shared/iconpack'
import { Box, ButtonsNavigations, Flex } from 'shared/ui'

function BoardMenu() {
  const navigate = useNavigate()
  const isLogin = useMatch('/')
  const isHome = useMatch('/home')
  const isUpload = useMatch('/upload')
  const isSettings = useMatch('/settings')
  const toast = useToast()
  if (isLogin) return null
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'space-between'}
      align={'center'}
      h={'100%'}
      w={'100%'}
      pb={'30px'}
    >
      <Flex h={'100%'} flexDirection={'column'} align={'center'} gap="20px">
        <Box>
          <ButtonsNavigations
            title="Дашборд"
            Icon={Tasks}
            check={!!isHome}
            onClick={() => navigate('/home')}
          />
        </Box>
        <Box>
          <ButtonsNavigations
            title="Загрузка"
            Icon={Edit}
            check={!!isUpload}
            onClick={() => navigate('/upload')}
          />
        </Box>
      </Flex>
      <Flex flexDirection={'column'} gap={'10px'} align={'center'}>
        <Box>
          <ButtonsNavigations
            title="Настройки"
            Icon={Profile}
            check={!!isSettings}
            onClick={() => navigate('/settings')}
          />
        </Box>
        <ButtonsNavigations
          title="Выйти"
          Icon={Logout}
          check={false}
          onClick={() => {
            localStorage.removeItem('refresh')
            navigate('/')
            logout().catch(() => {
              toast({
                position: 'bottom-right',
                title: 'Ошибка',
                description: 'Не удалось выполнить выход',
                status: 'error',
                duration: 9000,
                isClosable: true,
                variant: 'top-accent',
              })
            })
          }}
        />
      </Flex>
    </Flex>
  )
}

export { BoardMenu }
