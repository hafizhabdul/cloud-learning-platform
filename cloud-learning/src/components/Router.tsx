import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '../contexts/AppContext';
import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/Layout';
import { AuthPage } from '../components/Auth/AuthPage';
import { GoogleAuthSuccess, GoogleAuthFailure } from '../components/Auth/GoogleAuthCallback';
import Dashboard from '../components/Dashboard/Dashboard';
import LearningPaths from '../components/LearningPaths/LearningPaths';
import Progress from '../components/Progress/Progress';
import Certifications from '../components/Certifications/Certifications';
import ArchitecturePatterns from '../components/ArchitecturePatterns/ArchitecturePatterns';
import ArchitectureDesigner from '../components/ArchitectureDesigner/ArchitectureDesigner';
import CostCalculatorEnhanced from '../components/CostCalculator/CostCalculatorEnhanced';
import WellArchitectedReview from '../components/WellArchitectedReview/WellArchitectedReview';
import MigrationPlanner from '../components/MigrationPlanner/MigrationPlanner';
import { PriceComparison } from '../components/PriceComparison/PriceComparison';
import { ArchitectureSimulator } from '../components/ArchitectureSimulator/ArchitectureSimulator';
import { AIRecommendations } from '../components/AIRecommendations/AIRecommendations';
import { Community } from '../components/Community/Community';
import AWS from '../features/aws/AWS';
import Azure from '../features/azure/Azure';
import GCP from '../features/gcp/GCP';
import { OCI } from '../features/oci/OCI';
import { IBM } from '../features/ibm/IBM';
import { Alibaba } from '../features/alibaba/Alibaba';

const ProtectedApp = () => {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/learning-paths" element={<LearningPaths />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/architecture" element={<ArchitecturePatterns />} />
          <Route path="/architecture/designer" element={<ArchitectureDesigner />} />
          <Route path="/cost-calculator" element={<CostCalculatorEnhanced />} />
          <Route path="/price-comparison" element={<PriceComparison />} />
          <Route path="/architecture-simulator" element={<ArchitectureSimulator />} />
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          <Route path="/well-architected" element={<WellArchitectedReview />} />
          <Route path="/migration-planner" element={<MigrationPlanner />} />
          <Route path="/community" element={<Community />} />
          <Route path="/aws" element={<AWS />} />
          <Route path="/azure" element={<Azure />} />
          <Route path="/gcp" element={<GCP />} />
          <Route path="/oci" element={<OCI />} />
          <Route path="/ibm" element={<IBM />} />
          <Route path="/alibaba" element={<Alibaba />} />
          <Route path="/others" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Other Providers - Coming Soon</h2></div>} />
          <Route path="/help" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Support - Coming Soon</h2></div>} />
          <Route path="/settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings - Coming Soon</h2></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
};

export default function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/" replace /> : <AuthPage />} 
        />
        <Route 
          path="/auth/success" 
          element={<GoogleAuthSuccess />} 
        />
        <Route 
          path="/auth/failure" 
          element={<GoogleAuthFailure />} 
        />
        <Route 
          path="/*" 
          element={
            user ? (
              <ProtectedApp />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
