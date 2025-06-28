import type { 
  AlibabaService, 
  AlibabaLearningPath, 
  AlibabaCertification, 
  AlibabaPracticeLab 
} from '../types/alibaba';

export const alibabaServices: AlibabaService[] = [
  // Compute Services
  {
    id: 'ecs',
    name: 'Elastic Compute Service (ECS)',
    category: 'compute',
    description: 'Scalable and secure virtual servers with flexible configuration options',
    icon: '🖥️',
    features: [
      'Multiple instance families (general, compute, memory optimized)',
      'Spot instances for cost optimization',
      'Auto scaling groups',
      'Custom images and snapshots',
      'GPU instances for AI/ML workloads'
    ],
    useCases: [
      'Web applications and APIs',
      'Database hosting',
      'Big data processing',
      'Machine learning training',
      'Game servers and media processing'
    ],
    pricing: {
      model: 'Pay-as-you-go or subscription',
      startingPrice: '$0.008',
      unit: 'per hour'
    }
  },
  {
    id: 'container-service',
    name: 'Container Service for Kubernetes (ACK)',
    category: 'compute',
    description: 'Fully managed Kubernetes service with enterprise-grade security',
    icon: '☸️',
    features: [
      'Fully managed Kubernetes control plane',
      'Multi-zone cluster deployment',
      'Integrated CI/CD and service mesh',
      'GPU and ARM instance support',
      'Enterprise security and compliance'
    ],
    useCases: [
      'Microservices architecture',
      'Application modernization',
      'DevOps and CI/CD pipelines',
      'Big data and AI workloads',
      'Hybrid and multi-cloud deployments'
    ],
    pricing: {
      model: 'Pay for worker nodes only',
      startingPrice: 'Free',
      unit: 'management fee'
    }
  },

  // Storage Services
  {
    id: 'oss',
    name: 'Object Storage Service (OSS)',
    category: 'storage',
    description: 'Secure, cost-effective object storage with global accessibility',
    icon: '🗃️',
    features: [
      'Multiple storage classes (Standard, IA, Archive, Cold Archive)',
      '99.9999999999% (12 9s) durability',
      'Cross-region replication',
      'Lifecycle management policies',
      'Image and video processing'
    ],
    useCases: [
      'Data backup and archival',
      'Content distribution and delivery',
      'Data lake and big data analytics',
      'Static website hosting',
      'Mobile and web application storage'
    ],
    pricing: {
      model: 'Pay per GB stored and transferred',
      startingPrice: '$0.020',
      unit: 'per GB/month'
    }
  },

  // Database Services
  {
    id: 'rds',
    name: 'Relational Database Service (RDS)',
    category: 'database',
    description: 'Managed relational database service supporting multiple engines',
    icon: '🗄️',
    features: [
      'Multiple database engines (MySQL, PostgreSQL, SQL Server, Oracle)',
      'Automatic backup and point-in-time recovery',
      'Read replicas and high availability',
      'Automatic minor version upgrades',
      'Performance monitoring and optimization'
    ],
    useCases: [
      'Web and mobile applications',
      'E-commerce platforms',
      'Enterprise applications',
      'Data warehousing',
      'Business intelligence'
    ],
    pricing: {
      model: 'Pay for instance hours and storage',
      startingPrice: '$0.015',
      unit: 'per hour'
    }
  },
  {
    id: 'polardb',
    name: 'PolarDB',
    category: 'database',
    description: 'Cloud-native distributed database with high performance and scalability',
    icon: '❄️',
    features: [
      'Separation of compute and storage',
      'Automatic scaling and load balancing',
      'HTAP (Hybrid Transaction/Analytical Processing)',
      'Global database and multi-master',
      'Parallel query processing'
    ],
    useCases: [
      'High-performance OLTP applications',
      'Real-time analytics',
      'SaaS applications',
      'Gaming and social media platforms',
      'Financial services applications'
    ],
    pricing: {
      model: 'Pay for compute and storage separately',
      startingPrice: '$0.082',
      unit: 'per compute unit hour'
    }
  },

  // Networking and CDN
  {
    id: 'vpc',
    name: 'Virtual Private Cloud (VPC)',
    category: 'networking',
    description: 'Isolated cloud network environment with complete control',
    icon: '🌐',
    features: [
      'Custom IP address ranges and subnets',
      'Security groups and network ACLs',
      'NAT gateways and VPN connections',
      'Load balancers and traffic management',
      'Cross-region and cross-account connectivity'
    ],
    useCases: [
      'Multi-tier application deployment',
      'Hybrid cloud connectivity',
      'Secure workload isolation',
      'Disaster recovery environments',
      'Development and testing environments'
    ],
    pricing: {
      model: 'Pay for usage and data transfer',
      startingPrice: 'Free',
      unit: 'base VPC'
    }
  },
  {
    id: 'cdn',
    name: 'Content Delivery Network (CDN)',
    category: 'cdn',
    description: 'Global content delivery network for fast and reliable content distribution',
    icon: '🚀',
    features: [
      '2800+ global edge nodes',
      'Dynamic and static content acceleration',
      'Anti-DDoS and WAF protection',
      'Real-time monitoring and analytics',
      'HTTPS and HTTP/2 support'
    ],
    useCases: [
      'Website and application acceleration',
      'Video streaming and delivery',
      'Mobile application optimization',
      'Game content distribution',
      'API acceleration'
    ],
    pricing: {
      model: 'Pay per bandwidth and requests',
      startingPrice: '$0.04',
      unit: 'per GB transferred'
    }
  },

  // AI and Machine Learning
  {
    id: 'machine-learning',
    name: 'Machine Learning Platform for AI (PAI)',
    category: 'ai',
    description: 'End-to-end machine learning platform for model development and deployment',
    icon: '🤖',
    features: [
      'Visual model development interface',
      'Pre-built algorithms and templates',
      'AutoML capabilities',
      'Model serving and inference',
      'Distributed training and GPU acceleration'
    ],
    useCases: [
      'Predictive analytics and forecasting',
      'Computer vision applications',
      'Natural language processing',
      'Recommendation systems',
      'Fraud detection and risk analysis'
    ],
    pricing: {
      model: 'Pay per compute resource usage',
      startingPrice: '$0.10',
      unit: 'per compute unit hour'
    }
  },

  // Big Data and Analytics
  {
    id: 'maxcompute',
    name: 'MaxCompute',
    category: 'analytics',
    description: 'Fully managed petabyte-scale data processing service',
    icon: '📊',
    features: [
      'Petabyte-scale data processing',
      'SQL, MapReduce, and Spark support',
      'Real-time and batch processing',
      'Built-in security and data governance',
      'Integration with BI tools'
    ],
    useCases: [
      'Big data analytics and processing',
      'Data warehousing solutions',
      'ETL and data pipeline processing',
      'Business intelligence and reporting',
      'Machine learning data preparation'
    ],
    pricing: {
      model: 'Pay per storage and compute usage',
      startingPrice: '$0.30',
      unit: 'per compute unit hour'
    }
  },

  // Security Services
  {
    id: 'security-center',
    name: 'Security Center',
    category: 'security',
    description: 'Unified security management and threat detection platform',
    icon: '🛡️',
    features: [
      'Asset inventory and security assessment',
      'Vulnerability scanning and management',
      'Threat detection and incident response',
      'Compliance monitoring and reporting',
      'Security baseline and best practices'
    ],
    useCases: [
      'Cloud security posture management',
      'Compliance and governance',
      'Threat detection and response',
      'Security monitoring and alerting',
      'Risk assessment and management'
    ],
    pricing: {
      model: 'Pay per protected asset',
      startingPrice: '$0.50',
      unit: 'per asset per month'
    }
  }
];

export const alibabaLearningPaths: AlibabaLearningPath[] = [
  {
    id: 'alibaba-cloud-fundamentals',
    title: 'Alibaba Cloud Fundamentals',
    description: 'Learn the core concepts and services of Alibaba Cloud',
    level: 'beginner',
    duration: '4 weeks',
    prerequisites: ['Basic cloud computing knowledge'],
    services: ['ecs', 'oss', 'vpc'],
    lessons: [
      {
        id: 'alibaba-cloud-overview',
        title: 'Alibaba Cloud Platform Overview',
        type: 'theory',
        duration: '45 minutes',
        content: `Alibaba Cloud is one of the world's leading cloud computing platforms, providing comprehensive cloud services to businesses globally.

**Platform Highlights:**
- **Global Reach**: Serving customers in 200+ countries and regions
- **Comprehensive Services**: 200+ cloud services and solutions
- **Enterprise Focus**: Trusted by millions of customers worldwide
- **Innovation Leadership**: Strong R&D investment in emerging technologies
- **Industry Expertise**: Deep understanding of various industry needs

**Global Infrastructure:**
Alibaba Cloud operates across multiple regions worldwide:
- **Availability Zones**: Multiple isolated locations within each region
- **Edge Nodes**: 2800+ global CDN edge locations
- **Data Centers**: State-of-the-art facilities with 99.95% uptime SLA

**Core Service Categories:**
1. **Elastic Computing**: ECS, Auto Scaling, Container Service
2. **Storage & CDN**: Object Storage (OSS), Block Storage, CDN
3. **Networking**: VPC, Load Balancer, Express Connect
4. **Database Services**: RDS, PolarDB, Redis, MongoDB
5. **Security**: Security Center, WAF, Anti-DDoS
6. **Big Data**: MaxCompute, DataWorks, QuickBI
7. **AI & Machine Learning**: Machine Learning Platform for AI
8. **Application Services**: API Gateway, Message Service, Function Compute

**Unique Advantages:**
- **Performance**: High-performance infrastructure optimized for various workloads
- **Security**: Multi-layered security with compliance certifications
- **Cost-Effectiveness**: Competitive pricing with flexible billing options
- **Local Expertise**: Strong presence in Asia-Pacific markets
- **Integration**: Seamless integration with Alibaba ecosystem`,
        objectives: [
          'Understand Alibaba Cloud platform architecture',
          'Learn about global infrastructure and regions',
          'Identify core Alibaba Cloud services',
          'Understand unique platform advantages'
        ],
        resources: [
          'Alibaba Cloud Architecture Guide',
          'Global Infrastructure Overview',
          'Service Comparison Charts'
        ]
      },
      {
        id: 'ecs-fundamentals',
        title: 'Elastic Compute Service (ECS) Basics',
        type: 'hands-on',
        duration: '90 minutes',
        content: `Learn to create and manage ECS instances on Alibaba Cloud.`,
        objectives: [
          'Create and configure ECS instances',
          'Understand instance families and specifications',
          'Configure security groups and networking',
          'Manage instance lifecycle and monitoring'
        ],
        labInstructions: [
          'Access Alibaba Cloud Console',
          'Create VPC and configure subnets',
          'Launch ECS instance with appropriate specifications',
          'Configure security groups and access rules',
          'Connect to instance via SSH/RDP',
          'Install applications and configure monitoring'
        ]
      }
    ]
  },
  {
    id: 'alibaba-big-data-analytics',
    title: 'Big Data Analytics on Alibaba Cloud',
    description: 'Master big data processing and analytics using Alibaba Cloud services',
    level: 'advanced',
    duration: '6 weeks',
    prerequisites: ['Alibaba Cloud fundamentals', 'Data processing experience'],
    services: ['maxcompute', 'oss', 'machine-learning'],
    lessons: [
      {
        id: 'maxcompute-advanced',
        title: 'Advanced MaxCompute Data Processing',
        type: 'hands-on',
        duration: '2 hours',
        content: `Learn advanced data processing techniques using MaxCompute.`,
        objectives: [
          'Design efficient data processing workflows',
          'Optimize query performance and cost',
          'Implement real-time and batch processing',
          'Integrate with machine learning workflows'
        ],
        quiz: {
          id: 'maxcompute-quiz',
          title: 'MaxCompute Knowledge Assessment',
          passingScore: 75,
          timeLimit: 25,
          questions: [
            {
              id: 'mc-q1',
              question: 'Which SQL dialect does MaxCompute primarily use?',
              type: 'multiple-choice',
              options: [
                'Standard SQL',
                'MaxCompute SQL',
                'Spark SQL',
                'Hive SQL'
              ],
              correctAnswers: [1],
              explanation: 'MaxCompute uses its own SQL dialect called MaxCompute SQL, which is similar to standard SQL but with some specific extensions and limitations.',
              difficulty: 'medium'
            },
            {
              id: 'mc-q2',
              question: 'What are the main benefits of using MaxCompute for big data processing?',
              type: 'multiple-select',
              options: [
                'Serverless architecture',
                'Petabyte-scale processing capability',
                'Built-in security and governance',
                'Real-time stream processing',
                'Cost-effective pay-per-use model'
              ],
              correctAnswers: [0, 1, 2, 4],
              explanation: 'MaxCompute offers serverless architecture, petabyte-scale processing, built-in security, and cost-effective pricing. However, it is primarily designed for batch processing rather than real-time streaming.',
              difficulty: 'hard'
            }
          ]
        }
      }
    ]
  }
];

export const alibabaCertifications: AlibabaCertification[] = [
  {
    id: 'aca-cloud-computing',
    name: 'Alibaba Cloud Associate (ACA) - Cloud Computing',
    level: 'associate',
    description: 'Validate fundamental knowledge of Alibaba Cloud computing services',
    prerequisites: ['3-6 months Alibaba Cloud experience'],
    examDetails: {
      duration: '90 minutes',
      questions: 80,
      passingScore: '60%',
      cost: '$150 USD'
    },
    domains: [
      {
        name: 'Cloud Computing Fundamentals',
        weight: '20%',
        topics: [
          'Cloud computing concepts and benefits',
          'Alibaba Cloud platform overview',
          'Global infrastructure and regions'
        ]
      },
      {
        name: 'Elastic Computing',
        weight: '25%',
        topics: [
          'ECS instance management',
          'Auto Scaling configuration',
          'Load balancing strategies'
        ]
      },
      {
        name: 'Storage and Content Delivery',
        weight: '20%',
        topics: [
          'Object Storage Service (OSS)',
          'Block Storage and NAS',
          'CDN configuration and optimization'
        ]
      },
      {
        name: 'Networking',
        weight: '20%',
        topics: [
          'VPC design and configuration',
          'Security groups and network ACLs',
          'Hybrid connectivity options'
        ]
      },
      {
        name: 'Security and Monitoring',
        weight: '15%',
        topics: [
          'Access control and identity management',
          'Security best practices',
          'Monitoring and alerting'
        ]
      }
    ],
    preparationResources: [
      'Alibaba Cloud Fundamentals Course',
      'Hands-on Labs and Practice',
      'Official Documentation Study Guide'
    ]
  },
  {
    id: 'acp-cloud-computing',
    name: 'Alibaba Cloud Professional (ACP) - Cloud Computing',
    level: 'professional',
    description: 'Advanced certification for Alibaba Cloud solution design and implementation',
    prerequisites: ['ACA certification', '1+ year production experience'],
    examDetails: {
      duration: '120 minutes',
      questions: 85,
      passingScore: '65%',
      cost: '$300 USD'
    },
    domains: [
      {
        name: 'Solution Architecture Design',
        weight: '30%',
        topics: [
          'High availability and disaster recovery',
          'Scalability and performance optimization',
          'Cost optimization strategies'
        ]
      },
      {
        name: 'Advanced Networking',
        weight: '20%',
        topics: [
          'Complex VPC architectures',
          'Hybrid cloud connectivity',
          'Global load balancing'
        ]
      },
      {
        name: 'Security and Compliance',
        weight: '20%',
        topics: [
          'Advanced security configurations',
          'Compliance frameworks',
          'Data protection and encryption'
        ]
      },
      {
        name: 'Big Data and AI',
        weight: '15%',
        topics: [
          'Big data architecture patterns',
          'Machine learning integration',
          'Real-time analytics solutions'
        ]
      },
      {
        name: 'DevOps and Automation',
        weight: '15%',
        topics: [
          'Infrastructure as Code',
          'CI/CD pipeline design',
          'Monitoring and automation'
        ]
      }
    ],
    preparationResources: [
      'Advanced Architecture Course',
      'Real-world Case Studies',
      'Professional Practice Exams'
    ]
  }
];

export const alibabaPracticeLabs: AlibabaPracticeLab[] = [
  {
    id: 'alibaba-ecommerce-platform',
    title: 'Build Scalable E-commerce Platform',
    description: 'Create a high-performance e-commerce platform using Alibaba Cloud services',
    difficulty: 'advanced',
    duration: '4 hours',
    services: ['ecs', 'oss', 'rds', 'cdn', 'vpc'],
    objectives: [
      'Design scalable multi-tier architecture',
      'Implement high availability and load balancing',
      'Configure CDN for global content delivery',
      'Set up database replication and backup',
      'Implement security best practices'
    ],
    steps: [
      {
        title: 'Design Network Architecture',
        description: 'Create VPC with multiple subnets for different tiers',
        instructions: [
          'Create VPC with appropriate CIDR blocks',
          'Design subnets for web, application, and database tiers',
          'Configure route tables and NAT gateways',
          'Set up security groups for each tier',
          'Implement network ACLs for additional security'
        ],
        verification: 'Verify network connectivity between tiers and internet access'
      },
      {
        title: 'Deploy Application Infrastructure',
        description: 'Set up ECS instances and load balancers',
        instructions: [
          'Launch ECS instances in multiple availability zones',
          'Configure auto scaling groups for web and app tiers',
          'Set up Application Load Balancer (ALB)',
          'Configure health checks and failover',
          'Deploy application code and dependencies'
        ],
        verification: 'Test application accessibility and load balancing functionality'
      },
      {
        title: 'Configure Database Layer',
        description: 'Set up highly available database with read replicas',
        instructions: [
          'Create RDS instance with multi-AZ deployment',
          'Configure read replicas for performance',
          'Set up automated backups and point-in-time recovery',
          'Implement database connection pooling',
          'Configure monitoring and alerting'
        ],
        verification: 'Verify database connectivity and replication status'
      },
      {
        title: 'Implement Content Delivery',
        description: 'Configure CDN and static content optimization',
        instructions: [
          'Set up OSS buckets for static content storage',
          'Configure CDN distribution with global edge locations',
          'Implement cache policies and optimization rules',
          'Set up image and video processing workflows',
          'Configure HTTPS and security headers'
        ],
        verification: 'Test content delivery speed from different global locations'
      }
    ],
    cleanup: [
      'Terminate all ECS instances and auto scaling groups',
      'Delete RDS instances and snapshots',
      'Remove OSS buckets and CDN distributions',
      'Clean up VPC and networking resources'
    ]
  },
  {
    id: 'alibaba-big-data-pipeline',
    title: 'Real-time Big Data Analytics Pipeline',
    description: 'Build end-to-end big data processing pipeline with real-time analytics',
    difficulty: 'advanced',
    duration: '5 hours',
    services: ['maxcompute', 'machine-learning', 'oss'],
    objectives: [
      'Design data ingestion and processing workflows',
      'Implement real-time and batch processing',
      'Build machine learning models for predictive analytics',
      'Create interactive dashboards and visualizations',
      'Optimize performance and cost efficiency'
    ],
    steps: [
      {
        title: 'Set up Data Ingestion',
        description: 'Configure data collection from multiple sources',
        instructions: [
          'Set up data sources (APIs, databases, log files)',
          'Configure data ingestion pipelines',
          'Implement data validation and quality checks',
          'Set up real-time streaming data ingestion',
          'Configure data partitioning and organization'
        ],
        verification: 'Verify data is being ingested correctly and consistently'
      },
      {
        title: 'Build Data Processing Workflows',
        description: 'Create ETL pipelines using MaxCompute',
        instructions: [
          'Design data transformation workflows',
          'Implement batch processing jobs',
          'Create real-time processing streams',
          'Set up data quality monitoring',
          'Configure job scheduling and orchestration'
        ],
        verification: 'Test data processing workflows and validate outputs'
      },
      {
        title: 'Implement Machine Learning',
        description: 'Build predictive models using PAI platform',
        instructions: [
          'Prepare training datasets',
          'Design and train machine learning models',
          'Evaluate model performance and accuracy',
          'Deploy models for real-time inference',
          'Set up model monitoring and retraining'
        ],
        verification: 'Verify model accuracy and real-time prediction capabilities'
      }
    ],
    cleanup: [
      'Delete MaxCompute projects and datasets',
      'Remove machine learning models and endpoints',
      'Clean up OSS storage buckets',
      'Remove processing workflows and schedules'
    ]
  }
];

// Export default data structure
export const alibabaData = {
  services: alibabaServices,
  learningPaths: alibabaLearningPaths,
  certifications: alibabaCertifications,
  practiceLabs: alibabaPracticeLabs
};
