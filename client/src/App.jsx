import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Colleges from './pages/Colleges';
import Tutors from './pages/Tutors';
import Feedback from './pages/Feedback';
import FeedbackDetails from './pages/FeedbackDetails';
import FeedbackForm from './pages/feedbackform';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isFeedbackFormPage = location.pathname.startsWith('/feedbackform/');

  // If user is on feedback form page, redirect to the same page
  if (isFeedbackFormPage) {
    return <Navigate to={location.pathname} replace />;
  }

  return children;
};

function App() {
  return (
    <ChakraProvider>
      <Router>
        <MainLayout />
      </Router>
    </ChakraProvider>
  );
}

function MainLayout() {
  const location = useLocation();
  const isFeedbackFormPage = location.pathname.startsWith('/feedbackform/');

  return (
    <Box display="flex">
      {!isFeedbackFormPage && <Sidebar />}
      <Box flex="1" p={5}>
        <Routes>
          {/* Protected Admin Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Colleges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutors"
            element={
              <ProtectedRoute>
                <Tutors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback/:id"
            element={
              <ProtectedRoute>
                <FeedbackDetails />
              </ProtectedRoute>
            }
          />

          {/* Public Feedback Form Route */}
          <Route path="/feedbackform/:id" element={<FeedbackForm />} />

          {/* Catch all route - redirect to feedback form if on feedback form page, otherwise to home */}
          <Route
            path="*"
            element={
              isFeedbackFormPage ? (
                <Navigate to={location.pathname} replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;