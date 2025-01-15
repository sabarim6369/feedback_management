import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Text,
    Grid,
    GridItem,
    Card,
    CardHeader,
    CardBody,
    Stat,
    StatNumber,
    Tag,
    HStack,
    VStack,
    Divider,
  } from '@chakra-ui/react'
  import { useParams } from 'react-router-dom'
  
  function FeedbackDetails() {
    const { id } = useParams()
  
    // Mock data - replace with actual data fetching
    const feedbackDetails = {
      id,
      title: 'End Semester Feedback',
      college: 'Sri Eshwar College of Engineering',
      department: 'All Departments',
      tutors: ['Dr. John Doe', 'Dr. Jane Smith'],
      status: 'Active',
      fromDate: '2024-03-01',
      toDate: '2024-03-15',
      totalDays: 15,
      link: 'https://feedback.example.com/1',
      responses: [
        {
          id: 1,
          studentId: 'CSE001',
          department: 'CSE',
          rating: 4.5,
          comment: 'Excellent teaching methodology',
          submittedAt: '2024-03-10',
          tutor: 'Dr. John Doe',
        },
        {
          id: 2,
          studentId: 'ECE002',
          department: 'ECE',
          rating: 4.8,
          comment: 'Very clear explanations and helpful',
          submittedAt: '2024-03-11',
          tutor: 'Dr. Jane Smith',
        },
      ],
      stats: {
        totalResponses: 45,
        averageRating: 4.2,
        completionRate: '78%',
        responsesByDepartment: {
          'CSE': 20,
          'ECE': 15,
          'MECH': 10,
        },
      },
    }
  
    return (
      <Box>
        <VStack align="start" spacing={8}>
          <Box w="100%">
            <Heading size="lg" mb={2}>{feedbackDetails.title}</Heading>
            <HStack spacing={4}>
              <Badge colorScheme={feedbackDetails.status === 'Active' ? 'green' : 'red'} px={2} py={1}>
                {feedbackDetails.status}
              </Badge>
              <Text color="gray.600">
                {feedbackDetails.fromDate} to {feedbackDetails.toDate} ({feedbackDetails.totalDays} days)
              </Text>
            </HStack>
          </Box>
  
          <Grid templateColumns="repeat(4, 1fr)" gap={6} w="100%">
            <GridItem colSpan={1}>
              <Card>
                <CardHeader>
                  <Heading size="md">Total Responses</Heading>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatNumber>{feedbackDetails.stats.totalResponses}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={1}>
              <Card>
                <CardHeader>
                  <Heading size="md">Average Rating</Heading>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatNumber>{feedbackDetails.stats.averageRating}/5.0</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={1}>
              <Card>
                <CardHeader>
                  <Heading size="md">Completion Rate</Heading>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatNumber>{feedbackDetails.stats.completionRate}</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem colSpan={1}>
              <Card>
                <CardHeader>
                  <Heading size="md">Active Days</Heading>
                </CardHeader>
                <CardBody>
                  <Stat>
                    <StatNumber>{feedbackDetails.totalDays} Days</StatNumber>
                  </Stat>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
  
          <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
            <GridItem>
              <Card>
                <CardHeader>
                  <Heading size="md">Feedback Information</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Text fontWeight="bold">College:</Text>
                      <Text>{feedbackDetails.college}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Department:</Text>
                      <Text>{feedbackDetails.department}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Tutors:</Text>
                      <HStack spacing={2} mt={1}>
                        {feedbackDetails.tutors.map((tutor, index) => (
                          <Tag key={index} colorScheme="blue">{tutor}</Tag>
                        ))}
                      </HStack>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Feedback Link:</Text>
                      <Text 
                        color="blue.500" 
                        cursor="pointer" 
                        onClick={() => window.open(feedbackDetails.link, '_blank')}
                      >
                        {feedbackDetails.link}
                      </Text>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card>
                <CardHeader>
                  <Heading size="md">Department-wise Responses</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    {Object.entries(feedbackDetails.stats.responsesByDepartment).map(([dept, count]) => (
                      <Box key={dept} w="100%">
                        <HStack justify="space-between">
                          <Text fontWeight="medium">{dept}</Text>
                          <Text>{count} responses</Text>
                        </HStack>
                        <Box
                          w="100%"
                          h="4px"
                          bg="gray.100"
                          mt={1}
                          borderRadius="full"
                          overflow="hidden"
                        >
                          <Box
                            w={`${(count / feedbackDetails.stats.totalResponses) * 100}%`}
                            h="100%"
                            bg="blue.500"
                            borderRadius="full"
                          />
                        </Box>
                      </Box>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
  
          <Box w="100%">
            <Heading size="md" mb={4}>Responses</Heading>
            <Table variant="simple" bg="white" shadow="sm" rounded="lg">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Student ID</Th>
                  <Th>Department</Th>
                  <Th>Tutor</Th>
                  <Th>Rating</Th>
                  <Th>Comment</Th>
                  <Th>Submitted At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {feedbackDetails.responses.map((response) => (
                  <Tr key={response.id}>
                    <Td>{response.studentId}</Td>
                    <Td>{response.department}</Td>
                    <Td>{response.tutor}</Td>
                    <Td>
                      <Badge colorScheme="green">{response.rating}/5</Badge>
                    </Td>
                    <Td>{response.comment}</Td>
                    <Td>{response.submittedAt}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    )
  }
  
  export default FeedbackDetails