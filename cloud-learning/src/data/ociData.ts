import type { 
  OCIService, 
  OCILearningPath, 
  OCICertification, 
  OCIPracticeLab 
} from '../types/oci';

export const ociServices: OCIService[] = [
  // Compute Services
  {
    id: 'compute-instances',
    name: 'Compute Instances',
    category: 'compute',
    description: 'High-performance virtual machines with flexible shapes and bare metal options',
    icon: '🖥️',
    features: [
      'Flexible VM and bare metal shapes',
      'GPU instances for AI/ML workloads',
      'Dedicated VM hosts',
      'Custom images and boot volumes',
      'Live migration capabilities'
    ],
    useCases: [
      'Web applications and APIs',
      'High-performance computing',
      'Machine learning training',
      'Database hosting',
      'Development environments'
    ],
    pricing: {
      model: 'Pay-as-you-go',
      startingPrice: '$0.0255',
      unit: 'per OCPU hour'
    }
  },
  {
    id: 'container-engine',
    name: 'Container Engine for Kubernetes (OKE)',
    category: 'compute',
    description: 'Managed Kubernetes service for running containerized applications',
    icon: '☸️',
    features: [
      'Fully managed Kubernetes control plane',
      'Virtual and bare metal worker nodes',
      'Cluster autoscaling',
      'Integration with OCI services',
      'Enhanced security features'
    ],
    useCases: [
      'Microservices architecture',
      'CI/CD pipelines',
      'Application modernization',
      'DevOps workflows',
      'Multi-cloud deployments'
    ],
    pricing: {
      model: 'Pay for worker nodes only',
      startingPrice: 'Free',
      unit: 'control plane'
    }
  },
  
  // Storage Services
  {
    id: 'object-storage',
    name: 'Object Storage',
    category: 'storage',
    description: 'Highly durable and scalable object storage with multiple storage tiers',
    icon: '🗃️',
    features: [
      'Multiple storage classes (Standard, Infrequent Access, Archive)',
      '99.999999999% (11 9s) durability',
      'Lifecycle management policies',
      'Cross-region replication',
      'Event-driven triggers'
    ],
    useCases: [
      'Data backup and archival',
      'Content distribution',
      'Data lake storage',
      'Static website hosting',
      'Application data storage'
    ],
    pricing: {
      model: 'Pay per GB stored',
      startingPrice: '$0.0255',
      unit: 'per GB/month'
    }
  },
  {
    id: 'block-volumes',
    name: 'Block Volumes',
    category: 'storage',
    description: 'High-performance block storage for compute instances',
    icon: '💾',
    features: [
      'High IOPS performance (up to 225K IOPS)',
      'Encryption at rest and in transit',
      'Volume groups and backups',
      'Cross-availability domain replication',
      'Dynamic performance scaling'
    ],
    useCases: [
      'Database storage',
      'File systems',
      'Application data',
      'Boot volumes',
      'High-performance workloads'
    ],
    pricing: {
      model: 'Pay per GB provisioned',
      startingPrice: '$0.0425',
      unit: 'per GB/month'
    }
  },

  // Database Services
  {
    id: 'autonomous-database',
    name: 'Autonomous Database',
    category: 'database',
    description: 'Self-driving, self-securing, self-repairing Oracle Database service',
    icon: '🗄️',
    features: [
      'Automatic tuning and optimization',
      'Built-in machine learning',
      'Automatic patching and updates',
      'Advanced security features',
      'JSON and graph capabilities'
    ],
    useCases: [
      'OLTP applications',
      'Data warehousing',
      'Mixed workloads',
      'Analytics and reporting',
      'Application development'
    ],
    pricing: {
      model: 'Pay per OCPU/hour',
      startingPrice: '$2.04',
      unit: 'per OCPU/hour'
    }
  },

  // Networking Services
  {
    id: 'virtual-cloud-network',
    name: 'Virtual Cloud Network (VCN)',
    category: 'networking',
    description: 'Software-defined network for secure cloud connectivity',
    icon: '🌐',
    features: [
      'Private subnets and security lists',
      'Internet and NAT gateways',
      'Load balancers',
      'VPN and FastConnect',
      'Network security groups'
    ],
    useCases: [
      'Multi-tier applications',
      'Hybrid cloud connectivity',
      'Secure workload isolation',
      'High availability architectures',
      'Disaster recovery'
    ],
    pricing: {
      model: 'Pay for usage',
      startingPrice: 'Free',
      unit: 'base VCN'
    }
  },

  // AI and Analytics
  {
    id: 'ai-services',
    name: 'OCI AI Services',
    category: 'ai',
    description: 'Pre-built AI services for vision, language, and speech',
    icon: '🤖',
    features: [
      'Vision service for image analysis',
      'Language service for text processing',
      'Speech service for audio processing',
      'Document understanding',
      'Custom model training'
    ],
    useCases: [
      'Document processing automation',
      'Content moderation',
      'Customer service chatbots',
      'Image and video analysis',
      'Natural language processing'
    ],
    pricing: {
      model: 'Pay per API call',
      startingPrice: '$0.0015',
      unit: 'per 1000 calls'
    }
  }
];

export const ociLearningPaths: OCILearningPath[] = [
  {
    id: 'oci-foundations',
    title: 'OCI Foundations',
    description: 'Learn the fundamentals of Oracle Cloud Infrastructure',
    level: 'beginner',
    duration: '4 weeks',
    prerequisites: ['Basic cloud computing knowledge'],
    services: ['compute-instances', 'object-storage', 'virtual-cloud-network'],
    lessons: [
      {
        id: 'oci-intro',
        title: 'Introduction to OCI',
        type: 'theory',
        duration: '45 minutes',
        content: `Oracle Cloud Infrastructure (OCI) is Oracle's Infrastructure-as-a-Service (IaaS) platform that provides high-performance computing resources. Built from the ground up for enterprise workloads, OCI offers:

**Key Advantages:**
- **Performance**: Bare metal instances and high-performance networking
- **Security**: Built-in security at every layer
- **Cost Effectiveness**: Predictable pricing with no hidden costs
- **Enterprise Ready**: Designed for mission-critical workloads

**OCI Architecture:**
OCI is organized into regions and availability domains:
- **Regions**: Geographic areas containing multiple availability domains
- **Availability Domains**: Isolated data centers within a region
- **Fault Domains**: Logical groupings within availability domains

**Core Services Overview:**
1. **Compute**: Virtual machines, bare metal, and container services
2. **Storage**: Object, block, file, and archive storage
3. **Networking**: Virtual cloud networks, load balancers, and connectivity
4. **Database**: Autonomous Database and other database services
5. **Security**: Identity management, encryption, and monitoring`,
        objectives: [
          'Understand OCI architecture and design principles',
          'Learn about regions and availability domains',
          'Identify core OCI services and their use cases',
          'Understand OCI pricing model'
        ],
        resources: [
          'OCI Architecture Documentation',
          'OCI Free Tier Guide',
          'Regional Services Availability'
        ]
      },
      {
        id: 'oci-compute-basics',
        title: 'OCI Compute Fundamentals',
        type: 'hands-on',
        duration: '60 minutes',
        content: `Learn to create and manage compute instances in OCI.`,
        objectives: [
          'Create your first compute instance',
          'Understand instance shapes and sizing',
          'Configure networking and security',
          'Connect to instances securely'
        ],
        labInstructions: [
          'Access OCI Console and navigate to Compute',
          'Launch a VM instance with Oracle Linux',
          'Configure VCN and subnet settings',
          'Set up SSH key authentication',
          'Connect to the instance via SSH',
          'Install and configure basic software'
        ]
      }
    ]
  },
  {
    id: 'oci-advanced-architect',
    title: 'OCI Solutions Architect',
    description: 'Advanced OCI architecture patterns and best practices',
    level: 'advanced',
    duration: '8 weeks',
    prerequisites: ['OCI Foundations', 'Experience with cloud architecture'],
    services: ['autonomous-database', 'container-engine', 'ai-services'],
    lessons: [
      {
        id: 'autonomous-db-advanced',
        title: 'Advanced Autonomous Database',
        type: 'theory',
        duration: '90 minutes',
        content: `Deep dive into Oracle Autonomous Database capabilities and advanced features.

**Autonomous Database Types:**
1. **Autonomous Transaction Processing (ATP)**: OLTP workloads
2. **Autonomous Data Warehouse (ADW)**: Analytics and reporting
3. **Autonomous JSON Database**: JSON document storage

**Advanced Features:**
- **Machine Learning**: Built-in ML algorithms and AutoML
- **Graph Analytics**: Property graph and RDF graph support
- **Spatial Analytics**: Location-based data processing
- **Blockchain Tables**: Tamper-resistant data storage

**Performance and Scaling:**
- Auto-scaling CPU and storage
- Performance monitoring and tuning
- Workload management and resource allocation
- Parallel processing optimization

**Security Features:**
- Always encrypted (at rest and in transit)
- Database Vault for privilege management
- Data Safe for security assessment
- Audit trails and compliance reporting`,
        objectives: [
          'Master Autonomous Database configuration',
          'Implement advanced security features',
          'Optimize performance and scaling',
          'Integrate with other OCI services'
        ]
      }
    ]
  }
];

export const ociCertifications: OCICertification[] = [
  {
    id: 'oci-foundations-associate',
    name: 'Oracle Cloud Infrastructure Foundations 2023 Associate',
    level: 'associate',
    description: 'Validate foundational knowledge of Oracle Cloud Infrastructure',
    prerequisites: ['6+ months of OCI experience recommended'],
    examDetails: {
      duration: '85 minutes',
      questions: 60,
      passingScore: '68%',
      cost: '$95 USD'
    },
    domains: [
      {
        name: 'Cloud Concepts',
        weight: '10%',
        topics: [
          'Cloud computing models',
          'Cloud deployment models',
          'OCI architecture and regions'
        ]
      },
      {
        name: 'Core OCI Services',
        weight: '30%',
        topics: [
          'Compute services',
          'Storage services',
          'Networking services',
          'Database services'
        ]
      },
      {
        name: 'Security and Compliance',
        weight: '25%',
        topics: [
          'Identity and Access Management',
          'Security services',
          'Compliance and governance'
        ]
      },
      {
        name: 'Pricing and Support',
        weight: '15%',
        topics: [
          'OCI pricing model',
          'Cost management',
          'Support options'
        ]
      }
    ],
    preparationResources: [
      'OCI Foundations Training Course',
      'Hands-on Labs and Practice',
      'OCI Documentation Study Guide'
    ]
  },
  {
    id: 'oci-architect-associate',
    name: 'Oracle Cloud Infrastructure Architect Associate',
    level: 'associate',
    description: 'Demonstrate skills in designing and implementing OCI solutions',
    prerequisites: ['OCI Foundations certification', '1+ year OCI experience'],
    examDetails: {
      duration: '105 minutes',
      questions: 60,
      passingScore: '70%',
      cost: '$245 USD'
    },
    domains: [
      {
        name: 'Identity and Access Management',
        weight: '10%',
        topics: [
          'IAM concepts and components',
          'Authentication and authorization',
          'Federation and SSO'
        ]
      },
      {
        name: 'Networking',
        weight: '25%',
        topics: [
          'VCN design and implementation',
          'Load balancing strategies',
          'Hybrid connectivity options'
        ]
      },
      {
        name: 'Compute',
        weight: '20%',
        topics: [
          'Instance types and sizing',
          'Auto-scaling and load balancing',
          'Container and Kubernetes services'
        ]
      },
      {
        name: 'Storage',
        weight: '15%',
        topics: [
          'Storage types and use cases',
          'Backup and disaster recovery',
          'Data lifecycle management'
        ]
      },
      {
        name: 'Database',
        weight: '15%',
        topics: [
          'Database service options',
          'Autonomous Database features',
          'Database migration strategies'
        ]
      }
    ],
    preparationResources: [
      'OCI Architect Associate Training',
      'Architecture Practice Labs',
      'Real-world Case Studies'
    ]
  }
];

export const ociPracticeLabs: OCIPracticeLab[] = [
  {
    id: 'oci-web-app-deployment',
    title: 'Deploy Multi-Tier Web Application on OCI',
    description: 'Build a scalable web application using OCI services',
    difficulty: 'intermediate',
    duration: '2 hours',
    services: ['compute-instances', 'autonomous-database', 'object-storage', 'virtual-cloud-network'],
    objectives: [
      'Design secure VCN architecture',
      'Deploy application tier on compute instances',
      'Set up Autonomous Database backend',
      'Configure load balancing and auto-scaling',
      'Implement backup and monitoring'
    ],
    steps: [
      {
        title: 'Create VCN and Subnets',
        description: 'Set up network infrastructure for the application',
        instructions: [
          'Create a new VCN with CIDR 10.0.0.0/16',
          'Create public subnet (10.0.1.0/24) for load balancer',
          'Create private subnet (10.0.2.0/24) for app servers',
          'Create private subnet (10.0.3.0/24) for database',
          'Configure internet and NAT gateways',
          'Set up security lists and NSGs'
        ],
        verification: 'Verify subnets are created and gateways are attached'
      },
      {
        title: 'Deploy Application Servers',
        description: 'Launch compute instances for the application tier',
        instructions: [
          'Create compute instances in private app subnet',
          'Configure custom images with application stack',
          'Set up instance pool for auto-scaling',
          'Install and configure web server software',
          'Deploy application code from Object Storage'
        ],
        verification: 'Test application accessibility through bastion host'
      },
      {
        title: 'Configure Autonomous Database',
        description: 'Set up database backend for the application',
        instructions: [
          'Create Autonomous Transaction Processing database',
          'Configure database in private subnet',
          'Set up database schemas and initial data',
          'Configure connection pooling',
          'Enable automatic backups and monitoring'
        ],
        verification: 'Verify database connectivity from app servers'
      }
    ],
    cleanup: [
      'Terminate all compute instances',
      'Delete Autonomous Database',
      'Remove VCN and associated resources',
      'Clean up Object Storage buckets'
    ]
  },
  {
    id: 'oci-kubernetes-deployment',
    title: 'Container Orchestration with OKE',
    description: 'Deploy microservices application on OCI Container Engine',
    difficulty: 'advanced',
    duration: '3 hours',
    services: ['container-engine', 'object-storage', 'virtual-cloud-network'],
    objectives: [
      'Create OKE cluster with worker nodes',
      'Deploy microservices with Kubernetes manifests',
      'Configure service mesh for inter-service communication',
      'Implement CI/CD pipeline with OCI DevOps',
      'Set up monitoring and logging'
    ],
    steps: [
      {
        title: 'Create OKE Cluster',
        description: 'Set up managed Kubernetes cluster',
        instructions: [
          'Create OKE cluster in existing VCN',
          'Configure node pools with appropriate shapes',
          'Set up cluster authentication',
          'Install kubectl and configure kubeconfig',
          'Verify cluster connectivity'
        ],
        verification: 'Run kubectl cluster-info to verify setup'
      },
      {
        title: 'Deploy Microservices',
        description: 'Deploy containerized application components',
        instructions: [
          'Create container registry repositories',
          'Build and push container images',
          'Create Kubernetes namespaces',
          'Deploy services using Helm charts',
          'Configure ingress controllers'
        ],
        verification: 'Verify all pods are running and services are accessible'
      }
    ],
    cleanup: [
      'Delete Kubernetes deployments and services',
      'Remove OKE cluster and node pools',
      'Clean up container registry images',
      'Remove associated network resources'
    ]
  }
];

// Export default data structure
export const ociData = {
  services: ociServices,
  learningPaths: ociLearningPaths,
  certifications: ociCertifications,
  practiceLabs: ociPracticeLabs
};
