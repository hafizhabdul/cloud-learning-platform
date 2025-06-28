import { useState } from 'react';
import { 
  Filter, 
  Search, 
  Clock, 
  BookOpen, 
  Award, 
  Star,
  ChevronRight,
  Play,
  Users
} from 'lucide-react';

const learningPaths = [
  {
    id: 1,
    title: 'AWS Solutions Architect Associate',
    provider: 'AWS',
    difficulty: 'Intermediate',
    rating: 4.8,
    students: 15420,
    modules: 15,
    duration: '40 hours',
    progress: 35,
    price: 'Free',
    certification: 'AWS Certified Solutions Architect',
    description: 'Learn to design and deploy scalable AWS applications with best practices.',
    topics: ['EC2', 'S3', 'VPC', 'RDS', 'Lambda', 'CloudFormation'],
    color: 'from-yellow-400 to-orange-500',
    providerColor: 'text-aws-500'
  },
  {
    id: 2,
    title: 'Azure Cloud Fundamentals',
    provider: 'Azure',
    difficulty: 'Beginner',
    rating: 4.6,
    students: 12350,
    modules: 8,
    duration: '20 hours',
    progress: 0,
    price: 'Free',
    certification: 'Azure Fundamentals AZ-900',
    description: 'Master the basics of Microsoft Azure cloud services and architecture.',
    topics: ['Virtual Machines', 'Storage', 'Networking', 'Active Directory'],
    color: 'from-blue-400 to-blue-600',
    providerColor: 'text-azure-500'
  },
  {
    id: 3,
    title: 'Google Cloud Professional Architect',
    provider: 'GCP',
    difficulty: 'Advanced',
    rating: 4.7,
    students: 8920,
    modules: 18,
    duration: '50 hours',
    progress: 0,
    price: '$99',
    certification: 'Google Cloud Professional Architect',
    description: 'Design enterprise-grade solutions using Google Cloud Platform.',
    topics: ['Compute Engine', 'Kubernetes', 'BigQuery', 'Cloud SQL'],
    color: 'from-purple-400 to-purple-600',
    providerColor: 'text-gcp-500'
  },
  {
    id: 4,
    title: 'Multi-Cloud Architecture',
    provider: 'Mixed',
    difficulty: 'Expert',
    rating: 4.9,
    students: 5680,
    modules: 25,
    duration: '75 hours',
    progress: 0,
    price: '$199',
    certification: 'Multi-Cloud Architect Professional',
    description: 'Learn to design solutions across AWS, Azure, and GCP.',
    topics: ['Cross-Cloud Integration', 'Hybrid Solutions', 'Cost Optimization'],
    color: 'from-gray-400 to-gray-600',
    providerColor: 'text-gray-500'
  },
  {
    id: 5,
    title: 'DevOps on AWS',
    provider: 'AWS',
    difficulty: 'Intermediate',
    rating: 4.5,
    students: 9840,
    modules: 12,
    duration: '30 hours',
    progress: 0,
    price: 'Free',
    certification: 'AWS DevOps Engineer',
    description: 'Implement CI/CD pipelines and DevOps practices on AWS.',
    topics: ['CodePipeline', 'CodeBuild', 'ECS', 'CloudWatch'],
    color: 'from-orange-400 to-red-500',
    providerColor: 'text-aws-500'
  },
  {
    id: 6,
    title: 'Azure DevOps Engineer',
    provider: 'Azure',
    difficulty: 'Intermediate',
    rating: 4.4,
    students: 7230,
    modules: 14,
    duration: '35 hours',
    progress: 0,
    price: '$49',
    certification: 'Azure DevOps Engineer Expert',
    description: 'Master Azure DevOps tools and practices for modern development.',
    topics: ['Azure Pipelines', 'ARM Templates', 'Monitoring', 'Security'],
    color: 'from-cyan-400 to-blue-500',
    providerColor: 'text-azure-500'
  }
];

const filters = {
  provider: ['All', 'AWS', 'Azure', 'GCP', 'Mixed'],
  difficulty: ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'],
  price: ['All', 'Free', 'Paid']
};

export default function LearningPaths() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProvider = selectedProvider === 'All' || path.provider === selectedProvider;
    const matchesDifficulty = selectedDifficulty === 'All' || path.difficulty === selectedDifficulty;
    const matchesPrice = selectedPrice === 'All' || 
                        (selectedPrice === 'Free' && path.price === 'Free') ||
                        (selectedPrice === 'Paid' && path.price !== 'Free');

    return matchesSearch && matchesProvider && matchesDifficulty && matchesPrice;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Expert': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Learning Paths
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Structured courses to become a Cloud Solutions Architect
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredPaths.length} paths available
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search learning paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Provider Filter */}
          <div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.provider.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.difficulty.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.price.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPaths.map((path) => (
          <div key={path.id} className="card p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {path.title}
                  </h3>
                  {path.price === 'Free' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded">
                      FREE
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {path.description}
                </p>
              </div>
              <div className="ml-4">
                <span className={`text-lg font-bold ${path.providerColor}`}>
                  {path.provider}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{path.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{path.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{path.modules} modules</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{path.duration}</span>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {path.topics.slice(0, 4).map((topic) => (
                  <span 
                    key={topic}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {topic}
                  </span>
                ))}
                {path.topics.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                    +{path.topics.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Progress (if started) */}
            {path.progress > 0 && (
              <div className="mb-4">
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
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(path.difficulty)}`}>
                  {path.difficulty}
                </span>
                {path.certification && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>Certification</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {path.price !== 'Free' && (
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {path.price}
                  </span>
                )}
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {path.progress > 0 ? (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Continue</span>
                    </>
                  ) : (
                    <>
                      <span>Start</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPaths.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No learning paths found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </div>
      )}
    </div>
  );
}
