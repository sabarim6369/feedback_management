import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Tutors() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colleges, setColleges] = useState([]); // To store fetched colleges
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    college: '',
  });
  const [editTutorId, setEditTutorId] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tutor/gettutors');
        setTutors(response.data.tutors);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tutors:', err);
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/college/getcolleges');
        setColleges(response.data.colleges); // Set fetched colleges
      } catch (err) {
        console.error('Error fetching colleges:', err);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, specialization, experience, college } = formData;
    const newTutor = { name, specialization, experience, college };

    try {
      if (editTutorId) {
        const response = await axios.put(
          `http://localhost:8000/api/tutor/updatetutor/${editTutorId}`,
          newTutor
        );
        if (response.status === 200) {
          setTutors(
            tutors.map((tutor) =>
              tutor._id === editTutorId ? { ...tutor, ...newTutor } : tutor
            )
          );
          onClose();
          setEditTutorId(null);
        }
      } else {
        const response = await axios.post('http://localhost:8000/api/tutor/addtutor', newTutor);
        if (response.status === 201) {
          setTutors([...tutors, response.data.tutor]);
          onClose();
        }
      }
      setFormData({ name: '', specialization: '', experience: '', college: '' });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (tutorId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/tutor/deletetutor/${tutorId}`);
      if (response.status === 200) {
        setTutors(tutors.filter((tutor) => tutor._id !== tutorId));
      }
    } catch (err) {
      console.error('Error deleting tutor:', err);
    }
  };

  const handleEdit = (tutor) => {
    setFormData({
      name: tutor.name,
      specialization: tutor.specialization,
      experience: tutor.experience,
      college: tutor.college,
    });
    setEditTutorId(tutor._id); // Ensure you use _id
    onOpen();
  };

  // Helper function to get college name from college ID
  const getCollegeName = (collegeId) => {
    const college = colleges.find((college) => college._id === collegeId);
    return college ? college.collegename : '';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Tutors</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Add Tutor
        </Button>
      </Box>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Specialization</Th>
              <Th>Experience</Th>
              <Th>College</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tutors.map((tutor) => (
              <Tr key={tutor._id}>
                <Td>{tutor.name}</Td>
                <Td>{tutor.specialization}</Td>
                <Td>{tutor.experience}</Td>
                <Td>{getCollegeName(tutor.college)}</Td> {/* Display college name */}
                <Td>
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    mr={2}
                    onClick={() => handleEdit(tutor)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(tutor._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editTutorId ? 'Edit Tutor' : 'Add New Tutor'}</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Specialization</FormLabel>
              <Input
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Experience</FormLabel>
              <Input
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>College</FormLabel>
              <Select
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              >
                <option value="">Select College</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.collegename} {/* Display college name */}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {editTutorId ? 'Update' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Tutors;
