import type { AzureService, AzureCertificationPath } from '../types/azure';

export const azureServices: AzureService[] = [
  {
    id: 'azure-vm',
    name: 'Azure Virtual Machines',
    category: 'Compute',
    description: 'On-demand, scalable computing resources with support for Linux and Windows.',
    icon: 'Server',
    difficulty: 'Beginner',
    documentation: 'https://docs.microsoft.com/en-us/azure/virtual-machines/',
    pricing: 'https://azure.microsoft.com/en-us/pricing/details/virtual-machines/',
    useCases: [
      'Web applications',
      'Development and testing',
      'Database hosting',
      'Legacy applications'
    ],
    modules: [
      {
        id: 'vm-basics',
        title: 'Azure VM Fundamentals',
        description: 'Learn the basics of creating and managing Azure Virtual Machines',
        duration: '90 minutes',
        completed: false,
        lessons: [
          {
            id: 'vm-intro',
            title: 'Introduction to Azure VMs',
            content: 'Azure Virtual Machines provide on-demand, scalable computing resources. Key features include: Support for Windows and Linux, Multiple VM sizes, High availability options, Integration with Azure services.',
            duration: '25 minutes',
            type: 'theory'
          },
          {
            id: 'vm-sizing',
            title: 'VM Sizing and Performance',
            content: 'Choosing the right VM size is crucial for performance and cost optimization. Consider: CPU requirements, Memory needs, Storage performance, Network bandwidth.',
            duration: '20 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'vm-quiz',
          title: 'Azure VM Fundamentals Quiz',
          description: 'Test your knowledge of Azure Virtual Machines',
          timeLimit: 15,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'vm-q1',
              type: 'multiple-choice',
              question: 'Which Azure VM series is optimized for compute-intensive workloads?',
              options: [
                { id: 'a', text: 'D-series', isCorrect: false },
                { id: 'b', text: 'F-series', isCorrect: true },
                { id: 'c', text: 'A-series', isCorrect: false },
                { id: 'd', text: 'B-series', isCorrect: false }
              ],
              correctAnswers: ['b'],
              explanation: 'F-series VMs are optimized for compute-intensive workloads with high CPU-to-memory ratio.',
              difficulty: 'easy',
              topics: ['VM Sizing', 'Performance']
            }
          ]
        }
      }
    ],
    labs: [
      {
        id: 'vm-lab',
        title: 'Create and Configure Azure VM',
        description: 'Learn to create and configure a virtual machine in Azure',
        difficulty: 'Beginner',
        estimatedTime: '60 minutes',
        completed: false,
        steps: [
          {
            id: 'create-rg',
            title: 'Create Resource Group',
            description: 'Create a resource group to organize your resources',
            instructions: ['Navigate to Azure Portal', 'Search for Resource Groups', 'Click Create'],
            code: 'az group create --name myResourceGroup --location eastus',
            expectedResult: 'Resource group created successfully'
          },
          {
            id: 'create-vm',
            title: 'Create Virtual Machine',
            description: 'Create a virtual machine in the resource group',
            instructions: ['Navigate to Virtual Machines', 'Click Create', 'Configure VM settings'],
            code: 'az vm create --resource-group myResourceGroup --name myVM --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys',
            expectedResult: 'VM created and running'
          }
        ],
        resources: [],
        prerequisites: [],
        objectives: []
      }
    ]
  },
  {
    id: 'azure-storage',
    name: 'Azure Storage',
    category: 'Storage',
    description: 'Durable, highly available, and massively scalable cloud storage.',
    icon: 'Database',
    difficulty: 'Beginner',
    documentation: 'https://docs.microsoft.com/en-us/azure/storage/',
    pricing: 'https://azure.microsoft.com/en-us/pricing/details/storage/',
    useCases: [
      'File storage',
      'Backup and archive',
      'Data lakes',
      'Static websites'
    ],
    modules: [
      {
        id: 'storage-basics',
        title: 'Azure Storage Fundamentals',
        description: 'Learn the fundamentals of Azure Storage services',
        duration: '75 minutes',
        completed: false,
        lessons: [
          {
            id: 'storage-intro',
            title: 'Introduction to Azure Storage',
            content: 'Azure Storage provides secure, durable, and scalable storage solutions. Services include: Blob Storage for objects, File Storage for file shares, Queue Storage for messaging, Table Storage for NoSQL data.',
            duration: '20 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'storage-quiz',
          title: 'Azure Storage Quiz',
          description: 'Test your knowledge of Azure Storage services',
          timeLimit: 15,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'storage-q1',
              type: 'multiple-choice',
              question: 'Which Azure Storage service is best for storing unstructured data?',
              options: [
                { id: 'a', text: 'Blob Storage', isCorrect: true },
                { id: 'b', text: 'File Storage', isCorrect: false },
                { id: 'c', text: 'Queue Storage', isCorrect: false },
                { id: 'd', text: 'Table Storage', isCorrect: false }
              ],
              correctAnswers: ['a'],
              explanation: 'Blob Storage is designed for storing large amounts of unstructured data like images, videos, and documents.',
              difficulty: 'easy',
              topics: ['Blob Storage', 'Data Types']
            }
          ]
        }
      }
    ],
    labs: []
  },
  {
    id: 'azure-aks',
    name: 'Azure Kubernetes Service',
    category: 'Containers',
    description: 'Managed Kubernetes service for deploying and managing containerized applications.',
    icon: 'Container',
    difficulty: 'Advanced',
    documentation: 'https://docs.microsoft.com/en-us/azure/aks/',
    pricing: 'https://azure.microsoft.com/en-us/pricing/details/kubernetes-service/',
    useCases: [
      'Microservices architecture',
      'CI/CD pipelines',
      'DevOps workflows',
      'Scalable applications'
    ],
    modules: [
      {
        id: 'aks-basics',
        title: 'AKS Fundamentals',
        description: 'Learn Kubernetes orchestration with Azure Kubernetes Service',
        duration: '120 minutes',
        completed: false,
        lessons: [
          {
            id: 'aks-intro',
            title: 'Introduction to AKS',
            content: 'Azure Kubernetes Service (AKS) provides managed Kubernetes clusters. Key features include: Automated updates and patching, Integrated monitoring, Role-based access control, Integration with Azure services.',
            duration: '25 minutes',
            type: 'theory'
          },
          {
            id: 'aks-networking',
            title: 'AKS Networking',
            content: 'AKS networking models: Kubenet (basic), Azure CNI (advanced), Network policies for security, Load balancing options.',
            duration: '30 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'aks-quiz',
          title: 'AKS Fundamentals Quiz',
          description: 'Test your knowledge of Azure Kubernetes Service',
          timeLimit: 20,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'aks-q1',
              type: 'multiple-choice',
              question: 'What is the main benefit of using AKS over self-managed Kubernetes?',
              options: [
                { id: 'a', text: 'Lower cost', isCorrect: false },
                { id: 'b', text: 'Managed control plane', isCorrect: true },
                { id: 'c', text: 'More features', isCorrect: false },
                { id: 'd', text: 'Better performance', isCorrect: false }
              ],
              correctAnswers: ['b'],
              explanation: 'AKS provides a managed Kubernetes control plane, reducing operational overhead.',
              difficulty: 'medium',
              topics: ['AKS Benefits', 'Managed Services']
            }
          ]
        }
      }
    ],
    labs: []
  },
  {
    id: 'azure-functions',
    name: 'Azure Functions',
    category: 'Compute',
    description: 'Serverless compute service for running event-driven code without managing infrastructure.',
    icon: 'Zap',
    difficulty: 'Intermediate',
    documentation: 'https://docs.microsoft.com/en-us/azure/azure-functions/',
    pricing: 'https://azure.microsoft.com/en-us/pricing/details/functions/',
    useCases: [
      'Event processing',
      'API backends',
      'Data processing',
      'Automation tasks'
    ],
    modules: [
      {
        id: 'functions-basics',
        title: 'Azure Functions Fundamentals',
        description: 'Learn serverless computing with Azure Functions',
        duration: '60 minutes',
        completed: false,
        lessons: [
          {
            id: 'functions-intro',
            title: 'Introduction to Azure Functions',
            content: 'Azure Functions enables serverless computing. Key concepts: Function Apps, Triggers and Bindings, Hosting Plans (Consumption, Premium, Dedicated), Supported Languages (C#, JavaScript, Python, Java, PowerShell, TypeScript).',
            duration: '25 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'functions-quiz',
          title: 'Azure Functions Fundamentals Quiz',
          description: 'Test your knowledge of Azure Functions',
          timeLimit: 15,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'functions-q1',
              type: 'multiple-choice',
              question: 'Which Azure Functions hosting plan provides automatic scaling with pay-per-execution pricing?',
              options: [
                { id: 'a', text: 'Consumption Plan', isCorrect: true },
                { id: 'b', text: 'Premium Plan', isCorrect: false },
                { id: 'c', text: 'Dedicated Plan', isCorrect: false },
                { id: 'd', text: 'Basic Plan', isCorrect: false }
              ],
              correctAnswers: ['a'],
              explanation: 'The Consumption Plan provides automatic scaling and you only pay for the time your function runs.',
              difficulty: 'easy',
              topics: ['Hosting Plans', 'Serverless']
            }
          ]
        }
      }
    ],
    labs: []
  },
  {
    id: 'azure-sql',
    name: 'Azure SQL Database',
    category: 'Database',
    description: 'Fully managed relational database service with built-in intelligence and security.',
    icon: 'Database',
    difficulty: 'Intermediate',
    documentation: 'https://docs.microsoft.com/en-us/azure/azure-sql/',
    pricing: 'https://azure.microsoft.com/en-us/pricing/details/azure-sql-database/',
    useCases: [
      'OLTP applications',
      'Data warehousing',
      'Analytics workloads',
      'Hybrid scenarios'
    ],
    modules: [
      {
        id: 'sql-fundamentals',
        title: 'Azure SQL Fundamentals',
        description: 'Learn managed SQL database services in Azure',
        duration: '75 minutes',
        completed: false,
        lessons: [
          {
            id: 'sql-intro',
            title: 'Azure SQL Family',
            content: 'Azure provides multiple SQL options: Azure SQL Database (fully managed), Azure SQL Managed Instance (near 100% compatibility), SQL Server on Azure VMs (full control). Key features include automatic tuning, threat detection, backup and restore, geo-replication.',
            duration: '20 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'sql-quiz',
          title: 'Azure SQL Database Quiz',
          description: 'Test your knowledge of Azure SQL services',
          timeLimit: 15,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'sql-q1',
              type: 'multiple-choice',
              question: 'Which Azure SQL option provides near 100% compatibility with on-premises SQL Server?',
              options: [
                { id: 'a', text: 'Azure SQL Database', isCorrect: false },
                { id: 'b', text: 'Azure SQL Managed Instance', isCorrect: true },
                { id: 'c', text: 'SQL Server on Azure VMs', isCorrect: false },
                { id: 'd', text: 'Azure Synapse Analytics', isCorrect: false }
              ],
              correctAnswers: ['b'],
              explanation: 'Azure SQL Managed Instance offers near 100% compatibility with on-premises SQL Server.',
              difficulty: 'easy',
              topics: ['SQL Managed Instance', 'Migration']
            }
          ]
        }
      }
    ],
    labs: [
      {
        id: 'sql-lab',
        title: 'Deploy Azure SQL Database',
        description: 'Create and configure an Azure SQL Database',
        difficulty: 'Beginner',
        estimatedTime: '45 minutes',
        completed: false,
        prerequisites: [],
        objectives: [],
        steps: [
          {
            id: 'create-db',
            title: 'Create SQL Database',
            description: 'Create a new Azure SQL Database using the Azure Portal',
            instructions: ['Navigate to Azure Portal', 'Search for SQL databases', 'Click Create', 'Configure database settings'],
            code: '# Navigate to Azure Portal\n# Search for "SQL databases"\n# Click "Create"\n# Configure database settings',
            expectedResult: 'Database created successfully'
          }
        ],
        resources: []
      }
    ]
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps',
    category: 'DevOps',
    description: 'Complete DevOps toolchain for planning, developing, testing, and deploying applications.',
    icon: 'GitBranch',
    difficulty: 'Intermediate',
    documentation: 'https://docs.microsoft.com/en-us/azure/devops/',
    pricing: 'https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/',
    useCases: [
      'CI/CD pipelines',
      'Project management',
      'Source control',
      'Test management'
    ],
    modules: [
      {
        id: 'devops-fundamentals',
        title: 'Azure DevOps Fundamentals',
        description: 'Learn end-to-end DevOps practices with Azure DevOps',
        duration: '120 minutes',
        completed: false,
        lessons: [
          {
            id: 'devops-intro',
            title: 'Azure DevOps Services',
            content: 'Azure DevOps provides integrated tools for the entire software development lifecycle. Core services include: Azure Boards (work item tracking), Azure Repos (version control), Azure Pipelines (CI/CD), Azure Test Plans (testing), Azure Artifacts (package management).',
            duration: '30 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'devops-quiz',
          title: 'Azure DevOps Fundamentals Quiz',
          description: 'Test your knowledge of Azure DevOps services',
          timeLimit: 15,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'devops-q1',
              type: 'multiple-choice',
              question: 'Which Azure DevOps service is used for work item tracking?',
              options: [
                { id: 'a', text: 'Azure Boards', isCorrect: true },
                { id: 'b', text: 'Azure Repos', isCorrect: false },
                { id: 'c', text: 'Azure Pipelines', isCorrect: false },
                { id: 'd', text: 'Azure Artifacts', isCorrect: false }
              ],
              correctAnswers: ['a'],
              explanation: 'Azure Boards provides work item tracking, backlogs, and project management features.',
              difficulty: 'easy',
              topics: ['Azure Boards', 'Project Management']
            }
          ]
        }
      }
    ],
    labs: [
      {
        id: 'devops-lab',
        title: 'Setup Azure DevOps Project',
        description: 'Create and configure an Azure DevOps project with basic CI/CD pipeline',
        difficulty: 'Beginner',
        estimatedTime: '60 minutes',
        completed: false,
        prerequisites: [],
        objectives: [],
        steps: [
          {
            id: 'create-project',
            title: 'Create DevOps Project',
            description: 'Create a new Azure DevOps project',
            instructions: ['Navigate to Azure DevOps', 'Click New Project', 'Configure project settings'],
            code: '# Navigate to Azure DevOps\n# Click "New Project"\n# Configure project settings',
            expectedResult: 'Project created successfully'
          }
        ],
        resources: []
      }
    ]
  }
];

export const azureCertificationPaths: AzureCertificationPath[] = [
  {
    id: 'az-900',
    name: 'Azure Fundamentals',
    description: 'Demonstrate foundational knowledge of cloud concepts and Azure services.',
    level: 'Fundamentals',
    duration: '2-4 weeks',
    prerequisites: ['Basic understanding of cloud concepts'],
    skills: [
      'Cloud concepts',
      'Azure services',
      'Azure workloads',
      'Security and privacy',
      'Azure pricing and support'
    ],
    examDetails: {
      code: 'AZ-900',
      name: 'Microsoft Azure Fundamentals',
      duration: 85,
      questionCount: 40,
      passingScore: 700,
      cost: '$99 USD',
      languages: ['English', 'Japanese', 'Chinese', 'Korean', 'Spanish', 'German', 'French']
    },
    studyGuide: [
      {
        id: 'cloud-concepts',
        title: 'Describe cloud concepts',
        weight: 25,
        topics: [
          'Benefits and considerations of cloud services',
          'Differences between Infrastructure-as-a-Service, Platform-as-a-Service, and Software-as-a-Service',
          'Differences between public, private, and hybrid cloud models'
        ],
        resources: [
          'Microsoft Learn: Cloud Concepts',
          'Azure Documentation: What is cloud computing?'
        ]
      }
    ],
    practiceTests: [
      {
        id: 'az-900-practice-1',
        name: 'AZ-900 Practice Test 1',
        description: 'Comprehensive practice test covering all AZ-900 exam topics',
        timeLimit: 60,
        questionCount: 30,
        difficulty: 'Practice',
        questions: [],
        attempts: []
      }
    ],
    recommendedExperience: 'Basic understanding of technology concepts'
  }
];
