import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendingUp, BookOpen, Clock, Award, User, Zap } from 'lucide-react';

interface LearningRecommendation {
  id: string;
  type: 'skill_gap' | 'trending' | 'career_path' | 'practice';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  provider: string;
  difficulty: string;
  progress: number;
  tags: string[];
}

interface UserProfile {
  experience: string;
  focusAreas: string[];
  careerGoal: string;
  timeCommitment: string;
  completedCourses: number;
  currentStreak: number;
}

export const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    experience: 'intermediate',
    focusAreas: ['aws', 'containers'],
    careerGoal: 'solutions-architect',
    timeCommitment: '10-hours-week',
    completedCourses: 12,
    currentStreak: 7
  });

  const generateRecommendations = () => {
    // AI-powered recommendation logic based on user profile
    const baseRecommendations: LearningRecommendation[] = [
      {
        id: 'k8s-networking',
        type: 'skill_gap',
        title: 'Kubernetes Advanced Networking',
        description: 'Based on your container focus, strengthen your K8s networking knowledge with CNI, ingress controllers, and service mesh',
        priority: 'high',
        estimatedTime: '8 hours',
        provider: 'aws',
        difficulty: 'Advanced',
        progress: 0,
        tags: ['kubernetes', 'networking', 'containers', 'service-mesh']
      },
      {
        id: 'serverless-patterns',
        type: 'trending',
        title: 'Serverless Architecture Patterns',
        description: 'Hot topic in 2025 - Lambda, Step Functions, EventBridge, and modern serverless patterns',
        priority: 'medium',
        estimatedTime: '12 hours',
        provider: 'aws',
        difficulty: 'Intermediate',
        progress: 25,
        tags: ['serverless', 'lambda', 'event-driven', 'microservices']
      },
      {
        id: 'multi-cloud-strategy',
        type: 'career_path',
        title: 'Multi-Cloud Architecture Strategy',
        description: 'Essential for solution architects - learn to design across AWS, Azure, and GCP',
        priority: 'high',
        estimatedTime: '16 hours',
        provider: 'multi-cloud',
        difficulty: 'Advanced',
        progress: 0,
        tags: ['multi-cloud', 'strategy', 'architecture', 'vendor-management']
      },
      {
        id: 'security-best-practices',
        type: 'skill_gap',
        title: 'Cloud Security Best Practices',
        description: 'Strengthen your security knowledge with zero-trust, encryption, and compliance frameworks',
        priority: 'high',
        estimatedTime: '10 hours',
        provider: 'aws',
        difficulty: 'Intermediate',
        progress: 60,
        tags: ['security', 'compliance', 'zero-trust', 'encryption']
      },
      {
        id: 'cost-optimization',
        type: 'practice',
        title: 'Advanced Cost Optimization Techniques',
        description: 'Learn FinOps practices, reserved instances, spot instances, and cost monitoring',
        priority: 'medium',
        estimatedTime: '6 hours',
        provider: 'aws',
        difficulty: 'Intermediate',
        progress: 80,
        tags: ['finops', 'cost-optimization', 'monitoring', 'budgets']
      },
      {
        id: 'terraform-advanced',
        type: 'trending',
        title: 'Infrastructure as Code with Terraform',
        description: 'Advanced Terraform techniques for large-scale infrastructure management',
        priority: 'medium',
        estimatedTime: '14 hours',
        provider: 'multi-cloud',
        difficulty: 'Advanced',
        progress: 40,
        tags: ['iac', 'terraform', 'automation', 'devops']
      }
    ];

    // Filter and prioritize based on user profile
    let filteredRecommendations = baseRecommendations;

    // Prioritize based on experience level
    if (userProfile.experience === 'beginner') {
      filteredRecommendations = filteredRecommendations.filter(r => r.difficulty !== 'Advanced');
    }

    // Prioritize based on focus areas
    if (userProfile.focusAreas.includes('containers')) {
      filteredRecommendations.forEach(r => {
        if (r.tags.includes('kubernetes') || r.tags.includes('containers')) {
          r.priority = 'high';
        }
      });
    }

    // Sort by priority and progress
    filteredRecommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    setRecommendations(filteredRecommendations);
  };

  useEffect(() => {
    generateRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-yellow-600';
      case 'Advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill_gap': return Target;
      case 'trending': return TrendingUp;
      case 'career_path': return Award;
      case 'practice': return BookOpen;
      default: return Brain;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws': return 'bg-orange-100 text-orange-800';
      case 'azure': return 'bg-blue-100 text-blue-800';
      case 'gcp': return 'bg-green-100 text-green-800';
      case 'multi-cloud': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Learning Recommendations</h1>
              <p className="text-gray-600 mt-1">Personalized learning path based on your goals and progress</p>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{userProfile.completedCourses}</div>
            <div className="text-sm text-gray-600">Courses Completed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{userProfile.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{recommendations.length}</div>
            <div className="text-sm text-gray-600">Recommendations</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(recommendations.reduce((acc, r) => acc + r.progress, 0) / recommendations.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </div>
        </div>

        {/* User Profile Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Your Learning Profile</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={userProfile.experience}
                onChange={(e) => setUserProfile({...userProfile, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Goal</label>
              <select
                value={userProfile.careerGoal}
                onChange={(e) => setUserProfile({...userProfile, careerGoal: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="solutions-architect">Solutions Architect</option>
                <option value="devops-engineer">DevOps Engineer</option>
                <option value="cloud-engineer">Cloud Engineer</option>
                <option value="platform-engineer">Platform Engineer</option>
                <option value="security-architect">Security Architect</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Commitment</label>
              <select
                value={userProfile.timeCommitment}
                onChange={(e) => setUserProfile({...userProfile, timeCommitment: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="5-hours-week">5 hours/week</option>
                <option value="10-hours-week">10 hours/week</option>
                <option value="20-hours-week">20 hours/week</option>
                <option value="full-time">Full-time learning</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
              <div className="flex flex-wrap gap-2">
                {['aws', 'azure', 'gcp', 'containers', 'serverless', 'security'].map(area => (
                  <button
                    key={area}
                    onClick={() => {
                      const newAreas = userProfile.focusAreas.includes(area)
                        ? userProfile.focusAreas.filter(a => a !== area)
                        : [...userProfile.focusAreas, area];
                      setUserProfile({...userProfile, focusAreas: newAreas});
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      userProfile.focusAreas.includes(area)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Personalized Recommendations</h2>
            <button
              onClick={generateRecommendations}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Zap className="w-4 h-4 mr-2" />
              Refresh AI
            </button>
          </div>
          
          {recommendations.map((rec) => {
            const TypeIcon = getTypeIcon(rec.type);
            
            return (
              <div key={rec.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-l-purple-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <TypeIcon className="w-5 h-5 text-purple-600 mr-2" />
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ml-2 ${getProviderColor(rec.provider)}`}>
                        {rec.provider.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h3>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {rec.estimatedTime}
                      </span>
                      <span className={`font-medium ${getDifficultyColor(rec.difficulty)}`}>
                        📊 {rec.difficulty}
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {rec.progress}% Complete
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${rec.progress}%` }}
                      ></div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {rec.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-6 flex flex-col space-y-2">
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                      {rec.progress > 0 ? 'Continue' : 'Start Learning'}
                    </button>
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Goals */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Learning Goals for 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-medium">Certification Goal</span>
              </div>
              <p className="text-sm text-gray-600">AWS Solutions Architect Professional</p>
              <div className="mt-2 text-xs text-gray-500">Target: Q2 2025</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">Skill Focus</span>
              </div>
              <p className="text-sm text-gray-600">Container Orchestration & Serverless</p>
              <div className="mt-2 text-xs text-gray-500">Progress: 65%</div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium">Learning Streak</span>
              </div>
              <p className="text-sm text-gray-600">Daily practice commitment</p>
              <div className="mt-2 text-xs text-gray-500">Current: {userProfile.currentStreak} days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
