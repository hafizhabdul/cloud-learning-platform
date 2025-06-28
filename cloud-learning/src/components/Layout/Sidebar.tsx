import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Settings, 
  Cloud,
  Database,
  Shield,
  Globe,
  Users,
  HelpCircle,
  Building,
  Calculator,
  Layers,
  Star,
  Move,
  Brain,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import { AppContext } from '../../contexts/AppContext';

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/', section: 'main' },
  { name: 'Learning Paths', icon: BookOpen, href: '/learning-paths', section: 'main' },
  { name: 'Architecture Patterns', icon: Building, href: '/architecture', section: 'main' },
  { name: 'Certifications', icon: Award, href: '/certifications', section: 'main' },
  { name: 'Progress', icon: TrendingUp, href: '/progress', section: 'main' },
];

const tools = [
  { name: 'Architecture Designer', icon: Layers, href: '/architecture/designer' },
  { name: 'Cost Calculator', icon: Calculator, href: '/cost-calculator' },
  { name: 'Price Comparison', icon: BarChart3, href: '/price-comparison' },
  { name: 'Architecture Simulator', icon: Activity, href: '/architecture-simulator' },
  { name: 'AI Recommendations', icon: Zap, href: '/ai-recommendations' },
  { name: 'Well-Architected Review', icon: Star, href: '/well-architected' },
  { name: 'Migration Planner', icon: Move, href: '/migration-planner' },
];

const cloudProviders = [
  { name: 'AWS', icon: Cloud, href: '/aws', color: 'text-aws-500' },
  { name: 'Microsoft Azure', icon: Globe, href: '/azure', color: 'text-azure-500' },
  { name: 'Google Cloud', icon: Database, href: '/gcp', color: 'text-gcp-500' },
  { name: 'Oracle Cloud', icon: Shield, href: '/oci', color: 'text-orange-500' },
  { name: 'IBM Cloud', icon: Brain, href: '/ibm', color: 'text-blue-600' },
  { name: 'Alibaba Cloud', icon: Globe, href: '/alibaba', color: 'text-orange-600' },
  { name: 'Others', icon: Shield, href: '/others', color: 'text-gray-500' },
];

const resources = [
  { name: 'Community', icon: Users, href: '/community' },
  { name: 'Help & Support', icon: HelpCircle, href: '/help' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export default function Sidebar() {
  const context = useContext(AppContext);
  if (!context) throw new Error('Sidebar must be used within AppProvider');
  
  const { state } = context;
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (!state.sidebarOpen) {
    return (
      <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4">
        {navigation.map((item) => (
          <button
            key={item.name}
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title={item.name}
          >
            <item.icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Main
          </h3>
          <nav className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                }`} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Tools
          </h3>
          <nav className="space-y-1">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                to={tool.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  isActive(tool.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tool.icon className={`w-5 h-5 mr-3 ${
                  isActive(tool.href)
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                }`} />
                {tool.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Cloud Providers */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Cloud Providers
          </h3>
          <nav className="space-y-1">
            {cloudProviders.map((provider) => (
              <Link
                key={provider.name}
                to={provider.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  isActive(provider.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <provider.icon className={`w-5 h-5 mr-3 ${provider.color} group-hover:scale-110 transition-transform`} />
                {provider.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Resources
          </h3>
          <nav className="space-y-1">
            {resources.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  isActive(item.href)
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                }`} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* User Progress Summary */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Learning Progress
            </h4>
            <span className="text-xs text-blue-600 dark:text-blue-300 font-semibold">
              {Math.round((state.user?.progress.completedModules.length || 0) * 10)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
            <div 
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.round((state.user?.progress.completedModules.length || 0) * 10)}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
            {state.user?.progress.completedModules.length || 0} modules completed
          </p>
        </div>
      </div>
    </aside>
  );
}
