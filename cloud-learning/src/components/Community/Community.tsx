import React, { useState } from 'react';
import { Users, MessageSquare, Star, Award, Calendar, Plus, Search, Filter, ThumbsUp, Eye, Clock } from 'lucide-react';

interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  replies: number;
  likes: number;
  views: number;
  tags: string[];
  lastActivity: string;
  category: string;
  isHot: boolean;
  isPinned: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  level: string;
  focus: string[];
  nextSession: string;
  isJoined: boolean;
}

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'certification' | 'study-session';
  date: string;
  time: string;
  duration: string;
  speaker: string;
  attendees: number;
  isRegistered: boolean;
}

export const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [discussions] = useState<DiscussionThread[]>([
    {
      id: '1',
      title: 'Best practices for multi-region deployment on AWS',
      author: 'john_architect',
      authorAvatar: '👨‍💻',
      replies: 23,
      likes: 45,
      views: 342,
      tags: ['aws', 'multi-region', 'best-practices', 'architecture'],
      lastActivity: '2 hours ago',
      category: 'aws',
      isHot: true,
      isPinned: false
    },
    {
      id: '2',
      title: 'Cost optimization strategies for Azure workloads',
      author: 'sarah_cloudops',
      authorAvatar: '👩‍💼',
      replies: 18,
      likes: 32,
      views: 256,
      tags: ['azure', 'cost-optimization', 'finops', 'monitoring'],
      lastActivity: '4 hours ago',
      category: 'azure',
      isHot: false,
      isPinned: true
    },
    {
      id: '3',
      title: 'Kubernetes security hardening checklist',
      author: 'mike_security',
      authorAvatar: '🔒',
      replies: 31,
      likes: 67,
      views: 489,
      tags: ['kubernetes', 'security', 'compliance', 'hardening'],
      lastActivity: '6 hours ago',
      category: 'security',
      isHot: true,
      isPinned: false
    },
    {
      id: '4',
      title: 'Serverless vs Container: When to choose what?',
      author: 'alex_devops',
      authorAvatar: '⚡',
      replies: 42,
      likes: 89,
      views: 678,
      tags: ['serverless', 'containers', 'architecture', 'decision-framework'],
      lastActivity: '1 day ago',
      category: 'architecture',
      isHot: true,
      isPinned: false
    }
  ]);

  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'AWS Solutions Architect Pro Study Group',
      description: 'Preparing for the AWS Solutions Architect Professional certification',
      members: 24,
      maxMembers: 30,
      level: 'Advanced',
      focus: ['aws', 'certification', 'solutions-architect'],
      nextSession: '2025-06-29',
      isJoined: true
    },
    {
      id: '2',
      name: 'Kubernetes Fundamentals',
      description: 'Learn Kubernetes from basics to advanced concepts',
      members: 18,
      maxMembers: 25,
      level: 'Beginner',
      focus: ['kubernetes', 'containers', 'orchestration'],
      nextSession: '2025-06-30',
      isJoined: false
    },
    {
      id: '3',
      name: 'Multi-Cloud Architecture Patterns',
      description: 'Exploring architecture patterns across AWS, Azure, and GCP',
      members: 15,
      maxMembers: 20,
      level: 'Intermediate',
      focus: ['multi-cloud', 'architecture', 'patterns'],
      nextSession: '2025-07-01',
      isJoined: false
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Cloud Security Best Practices Webinar',
      type: 'webinar',
      date: '2025-07-05',
      time: '14:00 UTC',
      duration: '1 hour',
      speaker: 'Dr. Sarah Chen - Cloud Security Expert',
      attendees: 150,
      isRegistered: true
    },
    {
      id: '2',
      title: 'Hands-on Terraform Workshop',
      type: 'workshop',
      date: '2025-07-08',
      time: '16:00 UTC',
      duration: '3 hours',
      speaker: 'Michael Rodriguez - DevOps Architect',
      attendees: 45,
      isRegistered: false
    },
    {
      id: '3',
      title: 'Azure AZ-104 Study Session',
      type: 'study-session',
      date: '2025-07-10',
      time: '18:00 UTC',
      duration: '2 hours',
      speaker: 'Community Led',
      attendees: 32,
      isRegistered: false
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: 'john_architect', points: 2450, badges: 12, avatar: '👨‍💻' },
    { rank: 2, name: 'sarah_cloudops', points: 2380, badges: 11, avatar: '👩‍💼' },
    { rank: 3, name: 'mike_security', points: 2210, badges: 10, avatar: '🔒' },
    { rank: 4, name: 'alex_devops', points: 2150, badges: 9, avatar: '⚡' },
    { rank: 5, name: 'lisa_architect', points: 2050, badges: 8, avatar: '🏗️' }
  ]);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'webinar': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'certification': return 'bg-purple-100 text-purple-800';
      case 'study-session': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
              <p className="text-gray-600 mt-1">Connect with fellow architects and share knowledge</p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">2,547</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-green-600">342</div>
            <div className="text-sm text-gray-600">Discussions</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">Study Groups</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">24</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {[
                { id: 'discussions', label: 'Discussions', icon: MessageSquare },
                { id: 'study-groups', label: 'Study Groups', icon: Users },
                { id: 'events', label: 'Events', icon: Calendar },
                { id: 'leaderboard', label: 'Leaderboard', icon: Award }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Community Discussions</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Discussion
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="aws">AWS</option>
                      <option value="azure">Azure</option>
                      <option value="gcp">GCP</option>
                      <option value="security">Security</option>
                      <option value="architecture">Architecture</option>
                    </select>
                  </div>
                </div>
                
                {/* Discussion List */}
                <div className="space-y-4">
                  {filteredDiscussions.map((discussion) => (
                    <div key={discussion.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {discussion.isPinned && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mr-2">
                                PINNED
                              </span>
                            )}
                            {discussion.isHot && (
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded mr-2">
                                🔥 HOT
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2 text-lg">{discussion.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <span className="mr-1">{discussion.authorAvatar}</span>
                              {discussion.author}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {discussion.replies} replies
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {discussion.likes} likes
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {discussion.views} views
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {discussion.lastActivity}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {discussion.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Star className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer ml-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Study Groups Tab */}
            {activeTab === 'study-groups' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Study Groups</h2>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Study Group
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studyGroups.map((group) => (
                    <div key={group.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">{group.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(group.level)}`}>
                          {group.level}
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Members:</span>
                          <span className="font-medium">{group.members}/{group.maxMembers}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Next Session:</span>
                          <span className="font-medium">{group.nextSession}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.focus.map((topic, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {topic}
                          </span>
                        ))}
                      </div>

                      <button 
                        className={`w-full py-2 rounded-lg font-medium transition-colors ${
                          group.isJoined
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {group.isJoined ? 'Already Joined' : 'Join Group'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                  <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Suggest Event
                  </button>
                </div>

                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                              {event.type.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2">{event.title}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {event.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              {event.attendees} attendees
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">Speaker: {event.speaker}</p>
                        </div>
                        <button 
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ml-4 ${
                            event.isRegistered
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {event.isRegistered ? 'Registered' : 'Register'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Community Leaderboard</h2>
                
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Top Contributors This Month</h3>
                  <p className="opacity-90">Earn points by helping others, sharing knowledge, and participating in discussions</p>
                </div>

                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className={`border rounded-lg p-4 ${
                      user.rank <= 3 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                            user.rank === 1 ? 'bg-yellow-500 text-white' :
                            user.rank === 2 ? 'bg-gray-400 text-white' :
                            user.rank === 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                          }`}>
                            #{user.rank}
                          </div>
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{user.avatar}</span>
                            <div>
                              <div className="font-semibold text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.badges} badges earned</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">{user.points}</div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-blue-800 font-medium">Your current rank: #42</p>
                  <p className="text-blue-600 text-sm">Keep participating to climb the leaderboard!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
