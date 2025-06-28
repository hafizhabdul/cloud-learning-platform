import { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  BookOpen,
  Star,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const progressData = {
  overall: {
    completedModules: 12,
    totalModules: 50,
    completedHours: 48,
    targetHours: 200,
    streak: 7,
    avgScore: 87
  },
  weekly: [
    { week: 'Week 1', modules: 2, hours: 8 },
    { week: 'Week 2', modules: 3, hours: 12 },
    { week: 'Week 3', modules: 2, hours: 6 },
    { week: 'Week 4', modules: 5, hours: 22 }
  ],
  byProvider: [
    { provider: 'AWS', completed: 8, total: 25, percentage: 32, color: 'bg-aws-500' },
    { provider: 'Azure', completed: 3, total: 15, percentage: 20, color: 'bg-azure-500' },
    { provider: 'GCP', completed: 1, total: 10, percentage: 10, color: 'bg-gcp-500' }
  ],
  recentAchievements: [
    {
      id: 1,
      title: 'Fast Learner',
      description: 'Complete 5 modules in one week',
      earnedDate: '2024-01-15',
      rarity: 'rare',
      icon: '🚀'
    },
    {
      id: 2,
      title: 'AWS Enthusiast',
      description: 'Complete 10 AWS modules',
      earnedDate: '2024-01-10',
      rarity: 'common',
      icon: '☁️'
    }
  ]
};

export default function Progress() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'detailed', name: 'Detailed Analytics', icon: PieChart },
    { id: 'achievements', name: 'Achievements', icon: Award }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Learning Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your journey to becoming a Cloud Solutions Architect
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Overall Progress
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round((progressData.overall.completedModules / progressData.overall.totalModules) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {progressData.overall.completedModules} of {progressData.overall.totalModules} modules
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(progressData.overall.completedModules / progressData.overall.totalModules) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Study Hours
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progressData.overall.completedHours}h
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    of {progressData.overall.targetHours}h target
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Current Streak
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progressData.overall.streak} days
                  </p>
                  <p className="text-sm text-green-600">
                    Keep it up! 🔥
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {progressData.overall.avgScore}%
                  </p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      Excellent
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress by Provider */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Progress by Cloud Provider
            </h3>
            <div className="space-y-4">
              {progressData.byProvider.map((provider) => (
                <div key={provider.provider} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {provider.provider}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {provider.completed}/{provider.total} modules ({provider.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`${provider.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${provider.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Progress Chart */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Weekly Progress
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {progressData.weekly.map((week) => (
                <div key={week.week} className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-2">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                      {week.modules}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      modules
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {week.hours}h studied
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {week.week}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {progressData.recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-3xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    achievement.rarity === 'rare' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {achievement.rarity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Learning Achievements
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                5 earned, 12 remaining
              </p>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center mx-auto">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="card p-6 text-center">
              <Award className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Certification Goals
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                2 earned, 6 in progress
              </p>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center mx-auto">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="card p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Streak Achievements
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                3 earned, 8 remaining
              </p>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center mx-auto">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Analytics Tab */}
      {activeTab === 'detailed' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detailed Analytics
            </h3>
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Advanced Analytics Coming Soon
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We're working on detailed charts and analytics to help you track your learning progress better.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
