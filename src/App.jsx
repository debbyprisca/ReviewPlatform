import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import InstitutionsPage from './pages/InstitutionsPage';
import InstitutionDetailPage from './pages/InstitutionDetailPage';
import ProfilePage from './pages/ProfilePage';
import WriteReviewPage from './pages/WriteReviewPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { AuthProvider } from './context/AuthContext';
import AddInstitutionPage from './pages/AddInstitutionPage';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/institutions" element={<InstitutionsPage />} />
          <Route path="/institutions/:id" element={<InstitutionDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/write-review/" element={<WriteReviewPage />} />
           <Route path="/add-institution" element={<AddInstitutionPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;