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
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Colleges() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    departments: '',
  });
  const [editingCollegeId, setEditingCollegeId] = useState(null);

  // Fetch colleges from the database on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/college/getcolleges');
        setColleges(response.data.colleges); // Update the state with fetched data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching colleges:', err);
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, location, departments } = formData;
    const newCollege = {
      collegename: name,
      availabledepartment: departments.split(',').map((d) => d.trim()),
      place: location,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/college/addcollege', newCollege);

      if (response.status === 201) {
        setColleges([
          ...colleges,
          {
            id: response.data.college.id,
            name: response.data.college.collegename,
            location: response.data.college.place,
            departments: response.data.college.availabledepartment,
          },
        ]);
        onClose();
        setFormData({ name: '', location: '', departments: '' });
      } else {
        console.error('Error adding college:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleEdit = (college) => {
    setEditingCollegeId(college._id);
    setFormData({
      name: college.collegename,
      location: college.place,
      departments: college.availabledepartment.join(', '),
    });
    onOpen();
  };

  const handleDelete = async (collegeId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/college/deletecollege/${collegeId}`);

      if (response.status === 200) {
        setColleges(colleges.filter((college) => college._id !== collegeId));
      } else {
        console.error('Error deleting college:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const { name, location, departments } = formData;
    const updatedCollege = {
      collegename: name,
      availabledepartment: departments.split(',').map((d) => d.trim()),
      place: location,
    };

    try {
      const response = await axios.post(`http://localhost:8000/api/college/updatecollege/${editingCollegeId}`, updatedCollege);

      if (response.status === 200) {
        const updatedColleges = colleges.map((college) =>
          college._id === editingCollegeId ? { ...college, ...updatedCollege } : college
        );
        setColleges(updatedColleges);
        onClose();
        setFormData({ name: '', location: '', departments: '' });
      } else {
        console.error('Error updating college:', response.data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Colleges</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Add College
        </Button>
      </Box>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Departments</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {colleges.map((college) => (
              <Tr key={college._id}>
                <Td>{college.collegename}</Td>
                <Td>{college.place}</Td>
                <Td>{college.availabledepartment.join(', ')}</Td>
                <Td>
                  <Button size="sm" colorScheme="yellow" mr={2} onClick={() => handleEdit(college)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(college._id)}>
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
          <ModalHeader>{editingCollegeId ? 'Edit College' : 'Add New College'}</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>College Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Location</FormLabel>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Departments (comma-separated)</FormLabel>
              <Input
                value={formData.departments}
                onChange={(e) =>
                  setFormData({ ...formData, departments: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={editingCollegeId ? handleUpdate : handleSubmit}>
              {editingCollegeId ? 'Update' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Colleges;
