import type { 
  IBMService, 
  IBMLearningPath, 
  IBMCertification, 
  IBMPracticeLab 
} from '../types/ibm';

export const ibmServices: IBMService[] = [
  // Compute Services
  {
    id: 'virtual-servers',
    name: 'Virtual Servers for VPC',
    category: 'compute',
    description: 'Scalable virtual servers in a secure VPC environment',
    icon: '🖥️',
    features: [
      'Multiple instance profiles and sizes',
      'Custom images and snapshots',
      'Auto-scaling capabilities',
      'Reserved instance pricing',
      'GPU instances for AI workloads'
    ],
    useCases: [
      'Web applications and APIs',
      'Development and testing',
      'Database hosting',
      'AI/ML workloads',
      'Disaster recovery'
    ],
    pricing: {
      model: 'Hourly or monthly billing',
      startingPrice: '$0.087',
      unit: 'per hour'
    }
  },
  {
    id: 'red-hat-openshift',
    name: 'Red Hat OpenShift on IBM Cloud',
    category: 'compute',
    description: 'Enterprise Kubernetes platform with built-in CI/CD and developer tools',
    icon: '🔴',
    features: [
      'Fully managed OpenShift control plane',
      'Integrated CI/CD pipelines',
      'Built-in container registry',
      'Enterprise security and compliance',
      'Multi-cloud and hybrid capabilities'
    ],
    useCases: [
      'Application modernization',
      'Microservices development',
      'DevOps automation',
      'Hybrid cloud deployments',
      'Container orchestration'
    ],
    pricing: {
      model: 'Pay per worker node',
      startingPrice: '$0.50',
      unit: 'per core hour'
    }
  },

  // AI and Watson Services
  {
    id: 'watson-assistant',
    name: 'Watson Assistant',
    category: 'ai',
    description: 'AI-powered virtual assistant for customer service automation',
    icon: '🤖',
    features: [
      'Natural language understanding',
      'Multi-channel deployment',
      'Integration with business systems',
      'Analytics and insights',
      'Voice and chat capabilities'
    ],
    useCases: [
      'Customer service automation',
      'IT helpdesk support',
      'Sales assistance',
      'Internal employee support',
      'Voice-activated applications'
    ],
    pricing: {
      model: 'Pay per API call',
      startingPrice: '$0.0025',
      unit: 'per API call'
    }
  },
  {
    id: 'watson-discovery',
    name: 'Watson Discovery',
    category: 'ai',
    description: 'AI-powered enterprise search and text analytics service',
    icon: '🔍',
    features: [
      'Natural language querying',
      'Document understanding and parsing',
      'Smart document processing',
      'Custom models and enrichments',
      'Integration with business applications'
    ],
    useCases: [
      'Enterprise search applications',
      'Document analysis and insights',
      'Compliance and regulatory search',
      'Knowledge management',
      'Content recommendation'
    ],
    pricing: {
      model: 'Pay per document processed',
      startingPrice: '$0.40',
      unit: 'per 1000 documents'
    }
  },

  // Database Services
  {
    id: 'db2-warehouse',
    name: 'Db2 Warehouse on Cloud',
    category: 'database',
    description: 'High-performance SQL data warehouse for analytics workloads',
    icon: '🗄️',
    features: [
      'In-memory processing capabilities',
      'Columnar storage optimization',
      'Automatic backup and recovery',
      'Advanced analytics functions',
      'Integration with Watson services'
    ],
    useCases: [
      'Business intelligence and analytics',
      'Data warehousing',
      'Financial reporting',
      'Operational analytics',
      'Machine learning model training'
    ],
    pricing: {
      model: 'Monthly subscription',
      startingPrice: '$169',
      unit: 'per month'
    }
  },
  {
    id: 'cloudant',
    name: 'Cloudant',
    category: 'database',
    description: 'Fully managed NoSQL JSON document database',
    icon: '📄',
    features: [
      'JSON document storage',
      'Global replication and sync',
      'MapReduce and full-text search',
      'RESTful API access',
      'Offline-first mobile support'
    ],
    useCases: [
      'Mobile and web applications',
      'IoT data storage',
      'Content management',
      'User profile storage',
      'Real-time analytics'
    ],
    pricing: {
      model: 'Pay per usage',
      startingPrice: '$1.00',
      unit: 'per million API calls'
    }
  },

  // Integration and DevOps
  {
    id: 'app-connect',
    name: 'App Connect',
    category: 'integration',
    description: 'Enterprise integration platform for connecting applications and data',
    icon: '🔄',
    features: [
      'Pre-built connectors for SaaS applications',
      'API management capabilities',
      'Event-driven integration patterns',
      'Data transformation tools',
      'Hybrid cloud connectivity'
    ],
    useCases: [
      'Application integration',
      'Data synchronization',
      'API-led connectivity',
      'Business process automation',
      'Cloud migration integration'
    ],
    pricing: {
      model: 'Pay per connector',
      startingPrice: '$200',
      unit: 'per connector per month'
    }
  },
  {
    id: 'continuous-delivery',
    name: 'Continuous Delivery',
    category: 'devops',
    description: 'DevOps toolchain for automated application delivery',
    icon: '🚀',
    features: [
      'Integrated CI/CD pipelines',
      'Git repository management',
      'Automated testing and deployment',
      'Security scanning and compliance',
      'Integration with third-party tools'
    ],
    useCases: [
      'Application deployment automation',
      'DevOps pipeline orchestration',
      'Quality assurance automation',
      'Security and compliance testing',
      'Multi-cloud deployments'
    ],
    pricing: {
      model: 'Pay per authorized user',
      startingPrice: '$25',
      unit: 'per user per month'
    }
  },

  // Security Services
  {
    id: 'security-advisor',
    name: 'Security Advisor',
    category: 'security',
    description: 'Centralized security management and threat detection',
    icon: '🛡️',
    features: [
      'Security posture assessment',
      'Vulnerability scanning',
      'Compliance monitoring',
      'Threat intelligence integration',
      'Custom security policies'
    ],
    useCases: [
      'Security posture management',
      'Compliance reporting',
      'Vulnerability assessment',
      'Threat detection and response',
      'Risk management'
    ],
    pricing: {
      model: 'Included with IBM Cloud',
      startingPrice: 'Free',
      unit: 'with paid services'
    }
  }
];

export const ibmLearningPaths: IBMLearningPath[] = [
  {
    id: 'ibm-cloud-foundations',
    title: 'IBM Cloud Foundations',
    description: 'Learn the fundamentals of IBM Cloud platform and services',
    level: 'beginner',
    duration: '3 weeks',
    prerequisites: ['Basic cloud computing knowledge'],
    services: ['virtual-servers', 'cloudant', 'app-connect'],
    lessons: [
      {
        id: 'ibm-cloud-intro',
        title: 'Introduction to IBM Cloud',
        type: 'theory',
        duration: '45 minutes',
        content: `IBM Cloud is a comprehensive cloud platform that provides Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (PaaS), and Software-as-a-Service (SaaS) offerings.

**Key Differentiators:**
- **Enterprise Focus**: Built for enterprise workloads and compliance
- **Open Source Leadership**: Strong commitment to open source technologies
- **AI and Data**: Industry-leading AI and data analytics capabilities
- **Hybrid Cloud**: Seamless integration between on-premises and cloud
- **Security**: Enterprise-grade security and compliance features

**IBM Cloud Architecture:**
IBM Cloud operates across multiple regions globally:
- **Multi-Zone Regions (MZR)**: Multiple availability zones for high availability
- **Single-Zone Regions (SZR)**: Single data center locations
- **Edge Locations**: Points of presence for content delivery

**Core Service Categories:**
1. **Compute**: Virtual servers, containers, and serverless functions
2. **Storage**: Object, block, and file storage options
3. **Networking**: VPC, load balancers, and connectivity services
4. **AI and Watson**: Machine learning and cognitive services
5. **Data and Analytics**: Databases and analytics platforms
6. **Integration**: API management and application integration
7. **Security**: Identity, access management, and threat protection

**Pricing Model:**
- Pay-as-you-go with no upfront costs
- Subscription plans for predictable workloads
- Lite plans available for many services
- Reserved capacity for cost optimization`,
        objectives: [
          'Understand IBM Cloud platform architecture',
          'Learn about global infrastructure and regions',
          'Identify core IBM Cloud services',
          'Understand pricing and billing models'
        ],
        resources: [
          'IBM Cloud Architecture Guide',
          'Getting Started with IBM Cloud',
          'IBM Cloud Pricing Calculator'
        ]
      },
      {
        id: 'virtual-servers-lab',
        title: 'Working with Virtual Servers',
        type: 'hands-on',
        duration: '90 minutes',
        content: `Learn to create and manage virtual servers in IBM Cloud VPC.`,
        objectives: [
          'Create VPC and configure networking',
          'Launch virtual server instances',
          'Configure security groups and access',
          'Monitor and manage instance performance'
        ],
        labInstructions: [
          'Create a new VPC with subnets',
          'Configure security groups and access control lists',
          'Launch a virtual server instance',
          'Configure SSH access and connect to the instance',
          'Install software and configure applications',
          'Set up monitoring and alerting'
        ]
      }
    ]
  },
  {
    id: 'watson-ai-developer',
    title: 'Watson AI for Developers',
    description: 'Build intelligent applications using IBM Watson AI services',
    level: 'intermediate',
    duration: '6 weeks',
    prerequisites: ['Programming experience', 'IBM Cloud basics'],
    services: ['watson-assistant', 'watson-discovery'],
    lessons: [
      {
        id: 'watson-assistant-development',
        title: 'Building Chatbots with Watson Assistant',
        type: 'hands-on',
        duration: '2 hours',
        content: `Learn to create sophisticated chatbots using Watson Assistant.`,
        objectives: [
          'Design conversation flows and intents',
          'Train natural language understanding models',
          'Integrate with external systems and APIs',
          'Deploy chatbots across multiple channels'
        ],
        quiz: {
          id: 'watson-assistant-quiz',
          title: 'Watson Assistant Knowledge Check',
          passingScore: 80,
          timeLimit: 20,
          questions: [
            {
              id: 'wa-q1',
              question: 'What are the three main components of a Watson Assistant dialog?',
              type: 'multiple-select',
              options: [
                'Intents',
                'Entities',
                'Dialog nodes',
                'Training data',
                'Webhooks'
              ],
              correctAnswers: [0, 1, 2],
              explanation: 'Watson Assistant dialogs are built using intents (user goals), entities (important information), and dialog nodes (conversation flow).',
              difficulty: 'medium'
            },
            {
              id: 'wa-q2',
              question: 'Which feature allows Watson Assistant to learn from real user interactions?',
              type: 'multiple-choice',
              options: [
                'Auto-learning',
                'Continuous learning',
                'Smart learning',
                'Adaptive learning'
              ],
              correctAnswers: [1],
              explanation: 'Continuous learning allows Watson Assistant to improve its accuracy by learning from actual user conversations and feedback.',
              difficulty: 'medium'
            }
          ]
        }
      }
    ]
  }
];

export const ibmCertifications: IBMCertification[] = [
  {
    id: 'ibm-cloud-advocate',
    name: 'IBM Cloud Advocate',
    level: 'associate',
    description: 'Demonstrate fundamental knowledge of IBM Cloud platform and services',
    prerequisites: ['6+ months IBM Cloud experience'],
    examDetails: {
      duration: '90 minutes',
      questions: 60,
      passingScore: '65%',
      cost: '$200 USD'
    },
    domains: [
      {
        name: 'Cloud Computing Fundamentals',
        weight: '15%',
        topics: [
          'Cloud service models (IaaS, PaaS, SaaS)',
          'Cloud deployment models',
          'IBM Cloud global infrastructure'
        ]
      },
      {
        name: 'IBM Cloud Platform',
        weight: '25%',
        topics: [
          'Account management and billing',
          'Resource groups and access management',
          'CLI and API usage'
        ]
      },
      {
        name: 'Core IBM Cloud Services',
        weight: '35%',
        topics: [
          'Compute services (Virtual Servers, OpenShift)',
          'Storage and database services',
          'Networking and security services',
          'AI and Watson services'
        ]
      },
      {
        name: 'Application Development',
        weight: '25%',
        topics: [
          'Cloud-native application patterns',
          'DevOps and CI/CD practices',
          'Integration and API management'
        ]
      }
    ],
    preparationResources: [
      'IBM Cloud Essentials Course',
      'Hands-on Labs and Tutorials',
      'IBM Cloud Documentation'
    ]
  },
  {
    id: 'ibm-cloud-solution-architect',
    name: 'IBM Cloud Solution Architect',
    level: 'professional',
    description: 'Advanced certification for designing IBM Cloud solutions',
    prerequisites: ['IBM Cloud Advocate certification', '2+ years experience'],
    examDetails: {
      duration: '120 minutes',
      questions: 70,
      passingScore: '70%',
      cost: '$300 USD'
    },
    domains: [
      {
        name: 'Solution Architecture Design',
        weight: '30%',
        topics: [
          'Architecture patterns and best practices',
          'Scalability and performance design',
          'Disaster recovery and business continuity'
        ]
      },
      {
        name: 'Security and Compliance',
        weight: '20%',
        topics: [
          'Security architecture design',
          'Identity and access management',
          'Compliance frameworks and requirements'
        ]
      },
      {
        name: 'Integration and Migration',
        weight: '25%',
        topics: [
          'Hybrid cloud integration patterns',
          'Data migration strategies',
          'Application modernization approaches'
        ]
      },
      {
        name: 'Cost Optimization',
        weight: '15%',
        topics: [
          'Cost modeling and optimization',
          'Resource right-sizing',
          'Reserved capacity planning'
        ]
      }
    ],
    preparationResources: [
      'IBM Cloud Architecture Course',
      'Real-world Case Studies',
      'Architecture Decision Records'
    ]
  }
];

export const ibmPracticeLabs: IBMPracticeLab[] = [
  {
    id: 'ibm-chatbot-development',
    title: 'Build an AI-Powered Customer Service Chatbot',
    description: 'Create an intelligent chatbot using Watson Assistant and integrate with business systems',
    difficulty: 'intermediate',
    duration: '3 hours',
    services: ['watson-assistant', 'cloudant', 'app-connect'],
    objectives: [
      'Design conversation flows for customer service scenarios',
      'Train Watson Assistant with domain-specific data',
      'Integrate chatbot with CRM and knowledge base',
      'Deploy chatbot to web and mobile channels',
      'Implement analytics and continuous improvement'
    ],
    steps: [
      {
        title: 'Create Watson Assistant Instance',
        description: 'Set up Watson Assistant service and configure basic settings',
        instructions: [
          'Create Watson Assistant service instance',
          'Access Watson Assistant tooling',
          'Create new assistant and skill',
          'Define customer service intents (greeting, inquiry, complaint)',
          'Create entities for product categories and issues'
        ],
        verification: 'Test basic intent recognition in Watson Assistant tooling'
      },
      {
        title: 'Design Dialog Flow',
        description: 'Build conversation flow for customer service scenarios',
        instructions: [
          'Create welcome and fallback nodes',
          'Build dialog flow for common customer inquiries',
          'Implement slot filling for gathering customer information',
          'Add context variables for conversation state',
          'Configure integration with external systems via webhooks'
        ],
        verification: 'Test complete conversation flows in Watson Assistant'
      },
      {
        title: 'Backend Integration',
        description: 'Connect chatbot to customer database and knowledge base',
        instructions: [
          'Set up Cloudant database for customer records',
          'Create knowledge base documents',
          'Implement webhook endpoints for data retrieval',
          'Configure App Connect for CRM integration',
          'Test end-to-end data flow'
        ],
        verification: 'Verify chatbot can retrieve customer information and knowledge articles'
      },
      {
        title: 'Deploy and Monitor',
        description: 'Deploy chatbot to production channels and set up monitoring',
        instructions: [
          'Deploy chatbot to web widget',
          'Configure mobile app integration',
          'Set up analytics and monitoring dashboards',
          'Implement feedback collection mechanisms',
          'Create continuous improvement processes'
        ],
        verification: 'Test chatbot in production channels and verify analytics data'
      }
    ],
    cleanup: [
      'Delete Watson Assistant instances',
      'Remove Cloudant databases',
      'Clean up App Connect integrations',
      'Remove test applications and webhooks'
    ]
  },
  {
    id: 'ibm-microservices-openshift',
    title: 'Microservices Architecture on Red Hat OpenShift',
    description: 'Deploy and manage a microservices application on OpenShift',
    difficulty: 'advanced',
    duration: '4 hours',
    services: ['red-hat-openshift', 'continuous-delivery', 'security-advisor'],
    objectives: [
      'Design microservices architecture patterns',
      'Containerize applications for OpenShift deployment',
      'Implement service mesh for microservices communication',
      'Set up CI/CD pipelines for automated deployment',
      'Configure monitoring, logging, and security'
    ],
    steps: [
      {
        title: 'Create OpenShift Cluster',
        description: 'Set up Red Hat OpenShift cluster on IBM Cloud',
        instructions: [
          'Create OpenShift cluster with worker nodes',
          'Configure cluster networking and security',
          'Install OpenShift CLI and connect to cluster',
          'Set up namespaces for different environments',
          'Configure RBAC and security policies'
        ],
        verification: 'Verify cluster status and connectivity using oc commands'
      },
      {
        title: 'Containerize Microservices',
        description: 'Prepare applications for container deployment',
        instructions: [
          'Create Dockerfiles for each microservice',
          'Build container images using OpenShift builds',
          'Push images to OpenShift internal registry',
          'Create Kubernetes deployment manifests',
          'Configure service discovery and networking'
        ],
        verification: 'Verify container images are built and stored in registry'
      },
      {
        title: 'Implement Service Mesh',
        description: 'Set up Istio service mesh for microservices communication',
        instructions: [
          'Install Istio service mesh operator',
          'Configure service mesh for microservices',
          'Implement traffic management policies',
          'Set up security policies and mTLS',
          'Configure observability and tracing'
        ],
        verification: 'Verify service mesh is operational and traffic is flowing'
      }
    ],
    cleanup: [
      'Delete OpenShift cluster and associated resources',
      'Remove container images from registry',
      'Clean up CI/CD pipeline configurations',
      'Remove monitoring and logging resources'
    ]
  }
];

// Export default data structure
export const ibmData = {
  services: ibmServices,
  learningPaths: ibmLearningPaths,
  certifications: ibmCertifications,
  practiceLabs: ibmPracticeLabs
};
