import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Target, 
  Users,
  ChevronRight,
  Play,
  Calendar,
  Star,
  Calculator,
  Layers,
  Move,
  ArrowRight
} from 'lucide-react';
import { AppContext } from '../../contexts/AppContext';
import { awsServices, certificationPaths } from '../../data/awsData';
import { azureServices } from '../../data/azureData';
import { gcpServices, gcpCertificationPaths } from '../../data/gcpData';
import { ociData } from '../../data/ociData';
import { ibmData } from '../../data/ibmData';
import { alibabaData } from '../../data/alibabaData';

// Calculate total stats from all providers
const totalServices = awsServices.length + azureServices.length + gcpServices.length + 
                     ociData.services.length + ibmData.services.length + alibabaData.services.length;
const totalModules = awsServices.reduce((sum, s) => sum + s.modules.length, 0) + 
                   azureServices.reduce((sum, s) => sum + s.modules.length, 0) + 
                   gcpServices.reduce((sum, s) => sum + s.modules.length, 0);
const totalCertifications = certificationPaths.length + 0 + 
                          gcpCertificationPaths.length + ociData.certifications.length + 
                          ibmData.certifications.length + alibabaData.certifications.length;
const totalLabs = awsServices.reduce((sum, s) => sum + s.labs.length, 0) + 
                 azureServices.reduce((sum, s) => sum + s.labs.length, 0) + 
                 gcpServices.reduce((sum, s) => sum + s.labs.length, 0);

const quickStats = [
  {
    name: 'Total Services',
    value: totalServices.toString(),
    change: '+5',
    changeType: 'positive',
    icon: BookOpen,
    color: 'bg-blue-500'
  },
  {
    name: 'Learning Modules',
    value: totalModules.toString(),
    change: '+12',
    changeType: 'positive', 
    icon: Play,
    color: 'bg-green-500'
  },
  {
    name: 'Certifications',
    value: totalCertifications.toString(),
    change: '+3',
    changeType: 'positive',
    icon: Award,
    color: 'bg-purple-500'
  },
  {
    name: 'Practice Labs',
    value: totalLabs.toString(),
    change: '+8',
    changeType: 'positive',
    icon: Target,
    color: 'bg-orange-500'
  }
];

const recentActivity = [
  {
    id: 1,
    type: 'module_completed',
    title: 'AWS EC2 Fundamentals',
    provider: 'AWS',
    timestamp: '2 hours ago',
    score: 95
  },
  {
    id: 2,
    type: 'certification_earned',
    title: 'Azure Fundamentals AZ-900',
    provider: 'Azure',
    timestamp: '1 day ago',
    score: 87
  },
  {
    id: 3,
    type: 'lab_completed',
    title: 'Setting up VPC in AWS',
    provider: 'AWS',
    timestamp: '2 days ago',
    score: 92
  }
];

const recommendedPaths = [
  {
    id: 1,
    title: 'AWS Solutions Architect Associate',
    provider: 'AWS',
    difficulty: 'Intermediate',
    modules: 15,
    duration: '40 hours',
    progress: 35,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 2,
    title: 'Azure Cloud Fundamentals',
    provider: 'Azure',
    difficulty: 'Beginner',
    modules: 8,
    duration: '20 hours',
    progress: 0,
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 3,
    title: 'Google Cloud Associate',
    provider: 'GCP',
    difficulty: 'Intermediate',
    modules: 12,
    duration: '35 hours',
    progress: 0,
    color: 'from-purple-400 to-purple-600'
  }
];

export default function Dashboard() {
  const context = useContext(AppContext);
  if (!context) throw new Error('Dashboard must be used within AppProvider');
  
  const { state } = context;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {state.user?.name}! 👋
            </h1>
            <p className="text-blue-100">
              Ready to continue your cloud architecture journey? You're doing great!
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className={`text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} this week
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cloud Providers */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cloud Providers
          </h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AWS */}
          <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Amazon Web Services</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{awsServices.length} services available</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Modules:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {awsServices.reduce((sum, s) => sum + s.modules.length, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Labs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {awsServices.reduce((sum, s) => sum + s.labs.length, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Certs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {certificationPaths.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">All</span>
              </div>
            </div>
            <a 
              href="/aws" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Azure */}
          <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Microsoft Azure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{azureServices.length} services available</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Modules:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {azureServices.reduce((sum, s) => sum + s.modules.length, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Labs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {azureServices.reduce((sum, s) => sum + s.labs.length, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Certs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  0
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">All</span>
              </div>
            </div>
            <a 
              href="/azure" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* GCP */}
          <div className="relative bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Google Cloud Platform</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{gcpServices.length} services available</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Modules:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {gcpServices.reduce((sum, s) => sum + s.modules.length, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Labs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {gcpServices.reduce((sum, s) => sum + s.labs.length, 0)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Certs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {gcpCertificationPaths.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">All</span>
              </div>
            </div>
            <a 
              href="/gcp" 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Oracle Cloud (OCI) */}
          <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Oracle Cloud Infrastructure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ociData.services.length} services available</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Paths:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {ociData.learningPaths.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Labs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {ociData.practiceLabs.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Certs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {ociData.certifications.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">All</span>
              </div>
            </div>
            <a 
              href="/oci" 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* IBM Cloud */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">IBM Cloud</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{ibmData.services.length} services available</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Paths:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {ibmData.learningPaths.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Labs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {ibmData.practiceLabs.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Certs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {ibmData.certifications.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">All</span>
              </div>
            </div>
            <a 
              href="/ibm" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Alibaba Cloud */}
          <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Alibaba Cloud</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{alibabaData.services.length} services available</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Paths:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {alibabaData.learningPaths.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Labs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {alibabaData.practiceLabs.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Certs:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">
                  {alibabaData.certifications.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium text-gray-900 dark:text-white ml-1">All</span>
              </div>
            </div>
            <a 
              href="/alibaba" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Continue Learning
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recommendedPaths.slice(0, 2).map((path) => (
              <div key={path.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {path.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {path.modules} modules • {path.duration}
                    </p>
                  </div>
                  <button className="p-2 bg-white dark:bg-gray-600 rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <Play className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-gray-900 dark:text-white font-medium">{path.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${path.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  {activity.type === 'certification_earned' && <Award className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'module_completed' && <BookOpen className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'lab_completed' && <Target className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>{activity.provider}</span>
                    <span>•</span>
                    <span>{activity.timestamp}</span>
                    {activity.score && (
                      <>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{activity.score}%</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900 dark:text-blue-100">Browse Courses</span>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </button>
          
          <button className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900 dark:text-green-100">Join Study Group</span>
            </div>
            <ChevronRight className="w-4 h-4 text-green-600" />
          </button>
          
          <button className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900 dark:text-purple-100">Schedule Study</span>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      </div>

      {/* Architecture & Planning Tools */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Architecture & Planning Tools
          </h2>
          <Link to="/architecture" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            to="/architecture/designer" 
            className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Architecture Designer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visual architecture builder</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Design cloud architectures with drag-and-drop components
            </p>
          </Link>

          <Link 
            to="/cost-calculator" 
            className="group p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Cost Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimate cloud costs</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Calculate and optimize your cloud infrastructure costs
            </p>
          </Link>

          <Link 
            to="/well-architected" 
            className="group p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Well-Architected Review</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Architecture assessment</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Evaluate your architecture against AWS best practices
            </p>
          </Link>

          <Link 
            to="/migration-planner" 
            className="group p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Move className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Migration Planner</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plan cloud migrations</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Create comprehensive migration strategies and timelines
            </p>
          </Link>

          <Link 
            to="/price-comparison" 
            className="group p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Price Comparison</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Multi-cloud pricing</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Compare costs across AWS, Azure, GCP, and Oracle Cloud
            </p>
          </Link>

          <Link 
            to="/architecture-simulator" 
            className="group p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Architecture Simulator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Test your designs</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Simulate load, disasters, and performance scenarios
            </p>
          </Link>

          <Link 
            to="/ai-recommendations" 
            className="group p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Personalized learning</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Get AI-powered learning recommendations based on your progress
            </p>
          </Link>

          <Link 
            to="/community" 
            className="group p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Community Hub</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn together</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Join discussions, study groups, and events with fellow architects
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
