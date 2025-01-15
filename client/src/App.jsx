import { ChakraProvider, Box } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Colleges from './pages/Colleges'
import Tutors from './pages/Tutors'
import Feedback from './pages/Feedback'
import FeedbackDetails from './pages/FeedbackDetails'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box display="flex">
          <Sidebar />
          <Box flex="1" p={5}>
            <Routes>
              <Route path="/" element={<Colleges />} />
              <Route path="/tutors" element={<Tutors />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/feedback/:id" element={<FeedbackDetails />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App