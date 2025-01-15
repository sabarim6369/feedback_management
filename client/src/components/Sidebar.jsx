import { Box, VStack, Text, Icon, Tooltip } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { FaUniversity, FaChalkboardTeacher, FaComments } from 'react-icons/fa'

function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { icon: FaUniversity, text: 'Colleges', path: '/' },
    { icon: FaChalkboardTeacher, text: 'Tutors', path: '/tutors' },
    { icon: FaComments, text: 'Feedback', path: '/feedback' },
  ]

  return (
    <Box
      w="250px"
      h="100vh"
      bgGradient="linear(to-b, blue.600, blue.800)"
      color="white"
      p={5}
      position="sticky"
      top={0}
      boxShadow="lg"
    >
      <Box
        textAlign="center"
        mb={10}
        py={4}
        bg="blue.700"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold">
          RAMPeX
        </Text>
      </Box>
      <VStack spacing={3} align="stretch">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Tooltip label={item.text} hasArrow placement="right">
              <Box
                display="flex"
                alignItems="center"
                p={3}
                borderRadius="md"
                bg={location.pathname === item.path ? 'blue.700' : 'transparent'}
                _hover={{ bg: 'blue.700', transform: 'scale(1.05)' }}
                transition="all 0.2s ease-in-out"
                boxShadow={
                  location.pathname === item.path ? 'md' : 'none'
                }
              >
                <Icon as={item.icon} boxSize={5} mr={3} />
                <Text fontSize="md" fontWeight="medium">
                  {item.text}
                </Text>
              </Box>
            </Tooltip>
          </Link>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar
