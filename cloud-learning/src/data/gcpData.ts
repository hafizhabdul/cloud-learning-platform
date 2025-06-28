import type { GCPService, GCPCertificationPath } from '../types/gcp';

export const gcpServices: GCPService[] = [
  {
    id: 'compute-engine',
    name: 'Compute Engine',
    category: 'Compute',
    description: 'Scalable, high-performance virtual machines running in Google\'s data centers.',
    icon: 'Server',
    difficulty: 'Beginner',
    documentation: 'https://cloud.google.com/compute/docs',
    pricing: 'https://cloud.google.com/compute/pricing',
    useCases: [
      'Web applications and services',
      'Batch processing and analytics',
      'Development and testing',
      'High-performance computing'
    ],
    modules: [
      {
        id: 'ce-basics',
        title: 'Compute Engine Fundamentals',
        description: 'Learn the basics of Google Compute Engine',
        duration: '45 minutes',
        completed: false,
        lessons: [
          {
            id: 'ce-intro',
            title: 'Introduction to Compute Engine',
            content: `
# Google Compute Engine Overview

Compute Engine delivers virtual machines running in Google's innovative data centers and worldwide fiber network. Compute Engine's tooling and workflow support enable scaling from single instances to global, load-balanced cloud computing.

## Key Features
- **Custom machine types**: Create VMs tailored to your workloads
- **Preemptible instances**: Short-lived instances at lower costs
- **Live migration**: Transparent maintenance without downtime
- **Persistent disks**: High-performance, consistent block storage
- **Global load balancing**: Distribute traffic across regions

## Machine Types
- **General-purpose**: E2, N1, N2, N2D series for balanced workloads
- **Compute-optimized**: C2 series for compute-intensive tasks
- **Memory-optimized**: M1, M2 series for memory-intensive applications
- **Accelerator-optimized**: A2 series for GPU workloads

## Instance States
- **PROVISIONING**: Resources are being allocated
- **STAGING**: Resources acquired, instance being prepared
- **RUNNING**: Instance is running and billable
- **STOPPING**: Instance is being stopped
- **STOPPED**: Instance is stopped (still billed for attached disks)
- **TERMINATED**: Instance is permanently deleted

## Pricing Model
- **On-demand**: Standard per-second billing
- **Preemptible**: Up to 80% discount for short-lived workloads
- **Sustained use discounts**: Automatic discounts for running instances
- **Committed use discounts**: 1 or 3-year commitments for predictable workloads
            `,
            duration: '20 minutes',
            type: 'theory'
          },
          {
            id: 'ce-networking',
            title: 'Compute Engine Networking',
            content: `
# Compute Engine Networking

Understanding networking is crucial for properly configuring and securing your Compute Engine instances.

## VPC Networks
- **Default network**: Automatically created for each project
- **Custom networks**: User-defined networks with custom subnets
- **Shared VPC**: Share networks across projects
- **Network peering**: Connect VPC networks

## Firewall Rules
- **Ingress rules**: Control incoming traffic
- **Egress rules**: Control outgoing traffic
- **Target tags**: Apply rules to specific instances
- **Source/destination filters**: Define traffic sources and destinations

## External IP Addresses
- **Ephemeral**: Temporary IP that changes when instance stops
- **Static**: Reserved IP that persists when instance stops
- **Regional**: Available within a specific region
- **Global**: Available across all regions (for load balancers)
            `,
            duration: '15 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'ce-quiz',
          title: 'Compute Engine Fundamentals Quiz',
          description: 'Test your knowledge of Google Compute Engine',
          timeLimit: 20,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'ce-q1',
              type: 'multiple-choice',
              question: 'What is the maximum discount you can get with preemptible instances?',
              options: [
                { id: 'a', text: '50%', isCorrect: false },
                { id: 'b', text: '60%', isCorrect: false },
                { id: 'c', text: '80%', isCorrect: true },
                { id: 'd', text: '90%', isCorrect: false }
              ],
              correctAnswers: ['c'],
              explanation: 'Preemptible instances can provide up to 80% discount compared to regular instances, but they can be terminated by Google with 30 seconds notice.',
              difficulty: 'easy',
              topics: ['Pricing', 'Preemptible Instances']
            },
            {
              id: 'ce-q2',
              type: 'multiple-choice',
              question: 'Which machine type series is optimized for memory-intensive workloads?',
              options: [
                { id: 'a', text: 'E2 series', isCorrect: false },
                { id: 'b', text: 'C2 series', isCorrect: false },
                { id: 'c', text: 'M1/M2 series', isCorrect: true },
                { id: 'd', text: 'A2 series', isCorrect: false }
              ],
              correctAnswers: ['c'],
              explanation: 'M1 and M2 series are memory-optimized machine types designed for memory-intensive workloads with high memory-to-vCPU ratios.',
              difficulty: 'medium',
              topics: ['Machine Types', 'Memory Optimization']
            }
          ]
        }
      }
    ],
    labs: [
      {
        id: 'ce-lab1',
        title: 'Create and Configure Compute Engine Instance',
        description: 'Hands-on lab to create and configure a Compute Engine instance',
        difficulty: 'Beginner',
        estimatedTime: '60 minutes',
        prerequisites: ['Google Cloud account', 'Basic GCP Console knowledge'],
        objectives: [
          'Create a new Compute Engine instance',
          'Configure firewall rules',
          'Connect to the instance via SSH',
          'Install and configure a web server'
        ],
        completed: false,
        steps: [
          {
            id: 'step1',
            title: 'Create Compute Engine Instance',
            description: 'Create a new Linux VM instance',
            instructions: [
              'Navigate to Google Cloud Console',
              'Go to Compute Engine > VM instances',
              'Click "Create Instance"',
              'Enter name "web-server-vm"',
              'Select e2-micro machine type',
              'Choose Ubuntu 20.04 LTS boot disk',
              'Allow HTTP and HTTPS traffic',
              'Click "Create"'
            ],
            validation: 'Instance should be in "Running" state'
          },
          {
            id: 'step2',
            title: 'Configure Firewall Rules',
            description: 'Create firewall rules for web traffic',
            instructions: [
              'Go to VPC network > Firewall',
              'Click "Create Firewall Rule"',
              'Name: "allow-web-traffic"',
              'Direction: Ingress',
              'Targets: Specified target tags',
              'Target tags: "web-server"',
              'Source IP ranges: 0.0.0.0/0',
              'Protocols and ports: TCP 80, 443'
            ],
            validation: 'Firewall rule should be created and active'
          }
        ],
        resources: [
          {
            name: 'Compute Engine Documentation',
            type: 'documentation',
            url: 'https://cloud.google.com/compute/docs',
            description: 'Official Compute Engine documentation'
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-storage',
    name: 'Cloud Storage',
    category: 'Storage',
    description: 'Unified object storage for developers and enterprises with global edge caching.',
    icon: 'Database',
    difficulty: 'Beginner',
    documentation: 'https://cloud.google.com/storage/docs',
    pricing: 'https://cloud.google.com/storage/pricing',
    useCases: [
      'Website content and media',
      'Data backup and archiving',
      'Data lakes and analytics',
      'Content distribution'
    ],
    modules: [
      {
        id: 'cs-basics',
        title: 'Cloud Storage Fundamentals',
        description: 'Learn about Google Cloud Storage concepts and features',
        duration: '50 minutes',
        completed: false,
        lessons: [
          {
            id: 'cs-intro',
            title: 'Introduction to Cloud Storage',
            content: `
# Google Cloud Storage Overview

Cloud Storage is a RESTful online file storage web service for storing and accessing data on Google Cloud Platform infrastructure.

## Key Concepts
- **Buckets**: Containers that hold your data
- **Objects**: Individual pieces of data stored in buckets
- **Projects**: Top-level container for all GCP resources
- **Storage classes**: Different storage options for different use cases

## Storage Classes
- **Standard**: Frequently accessed data
- **Nearline**: Data accessed less than once per month
- **Coldline**: Data accessed less than once per quarter
- **Archive**: Data accessed less than once per year

## Access Control
- **IAM**: Identity and Access Management for project-level access
- **ACLs**: Access Control Lists for fine-grained object access
- **Signed URLs**: Time-limited access to specific objects
- **Uniform bucket-level access**: Simplified access control

## Data Transfer
- **gsutil**: Command-line tool for Cloud Storage
- **Client libraries**: SDKs for various programming languages
- **REST API**: Direct HTTP API access
- **Transfer services**: For large-scale data migrations
            `,
            duration: '25 minutes',
            type: 'theory'
          }
        ],
        quiz: {
          id: 'cs-quiz',
          title: 'Cloud Storage Quiz',
          description: 'Test your Cloud Storage knowledge',
          timeLimit: 15,
          passingScore: 70,
          attempts: [],
          questions: [
            {
              id: 'cs-q1',
              type: 'multiple-choice',
              question: 'Which Cloud Storage class is most cost-effective for data accessed less than once per year?',
              options: [
                { id: 'a', text: 'Standard', isCorrect: false },
                { id: 'b', text: 'Nearline', isCorrect: false },
                { id: 'c', text: 'Coldline', isCorrect: false },
                { id: 'd', text: 'Archive', isCorrect: true }
              ],
              correctAnswers: ['d'],
              explanation: 'Archive storage class is designed for data that is accessed less than once per year and offers the lowest storage cost.',
              difficulty: 'easy',
              topics: ['Storage Classes', 'Cost Optimization']
            }
          ]
        }
      }
    ],
    labs: []
  }
];

export const gcpCertificationPaths: GCPCertificationPath[] = [
  {
    id: 'cloud-digital-leader',
    name: 'Cloud Digital Leader',
    description: 'Demonstrate knowledge of cloud concepts and Google Cloud products and services.',
    level: 'User',
    duration: '4-6 weeks',
    prerequisites: ['Basic understanding of cloud concepts'],
    skills: [
      'Digital transformation with Google Cloud',
      'Innovating with data and Google Cloud',
      'Infrastructure and application modernization',
      'Understanding Google Cloud security and operations'
    ],
    examDetails: {
      code: 'CDL',
      name: 'Google Cloud Digital Leader',
      duration: 90,
      questionCount: 50,
      passingScore: 70,
      cost: '$99 USD',
      languages: ['English', 'Spanish', 'Portuguese', 'French', 'German', 'Italian', 'Japanese']
    },
    studyGuide: [
      {
        id: 'digital-transformation',
        title: 'Digital transformation with Google Cloud',
        weight: 30,
        topics: [
          'Why cloud technology is revolutionizing business',
          'Fundamental cloud concepts',
          'Cloud adoption and digital transformation',
          'Innovation drivers and transformation challenges'
        ],
        resources: [
          'Google Cloud Digital Leader Learning Path',
          'Cloud Adoption Framework'
        ]
      },
      {
        id: 'data-innovation',
        title: 'Innovating with data and Google Cloud',
        weight: 30,
        topics: [
          'The value of data in digital transformation',
          'Google Cloud data management solutions',
          'Making data useful and accessible',
          'Smart analytics and AI/ML solutions'
        ],
        resources: [
          'Google Cloud Data Analytics Learning Path',
          'AI and ML on Google Cloud'
        ]
      }
    ],
    practiceTests: [
      {
        id: 'cdl-practice',
        name: 'Cloud Digital Leader Practice Test',
        description: 'Practice test for Google Cloud Digital Leader certification',
        questionCount: 25,
        timeLimit: 45,
        difficulty: 'Practice',
        attempts: [],
        questions: [
          {
            id: 'cdl-q1',
            type: 'multiple-choice',
            question: 'What is the primary benefit of cloud computing for digital transformation?',
            options: [
              { id: 'a', text: 'Lower hardware costs only', isCorrect: false },
              { id: 'b', text: 'Faster innovation and scalability', isCorrect: true },
              { id: 'c', text: 'Better office space utilization', isCorrect: false },
              { id: 'd', text: 'Simplified employee management', isCorrect: false }
            ],
            correctAnswers: ['b'],
            explanation: 'Cloud computing enables faster innovation through rapid provisioning, scalability, and access to advanced services without upfront infrastructure investment.',
            difficulty: 'easy',
            topics: ['Digital Transformation', 'Cloud Benefits']
          }
        ]
      }
    ],
    recommendedExperience: 'No prior Google Cloud experience required, but basic understanding of business and technology concepts is helpful.'
  },
  {
    id: 'associate-cloud-engineer',
    name: 'Associate Cloud Engineer',
    description: 'Deploy applications, monitor operations, and manage enterprise solutions on Google Cloud.',
    level: 'Associate',
    duration: '8-12 weeks',
    prerequisites: ['6+ months of hands-on experience with Google Cloud'],
    skills: [
      'Setting up a cloud solution environment',
      'Planning and configuring a cloud solution',
      'Deploying and implementing a cloud solution',
      'Ensuring successful operation of a cloud solution',
      'Configuring access and security'
    ],
    examDetails: {
      code: 'ACE',
      name: 'Google Associate Cloud Engineer',
      duration: 120,
      questionCount: 50,
      passingScore: 70,
      cost: '$125 USD',
      languages: ['English', 'Spanish', 'Portuguese', 'French', 'German', 'Italian', 'Japanese']
    },
    studyGuide: [
      {
        id: 'cloud-solution-environment',
        title: 'Setting up a cloud solution environment',
        weight: 17,
        topics: [
          'Setting up cloud projects and accounts',
          'Managing billing configuration',
          'Installing and configuring the command line interface (CLI)'
        ],
        resources: [
          'Google Cloud Console Fundamentals',
          'gcloud CLI Documentation'
        ]
      },
      {
        id: 'planning-configuring',
        title: 'Planning and configuring a cloud solution',
        weight: 18,
        topics: [
          'Planning and estimating GCP product use using the Pricing Calculator',
          'Planning and configuring compute resources',
          'Planning and configuring data storage options',
          'Planning and configuring network resources'
        ],
        resources: [
          'Google Cloud Architecture Center',
          'Compute Engine Documentation'
        ]
      }
    ],
    practiceTests: [
      {
        id: 'ace-practice',
        name: 'Associate Cloud Engineer Practice Test',
        description: 'Practice test for Google Associate Cloud Engineer certification',
        questionCount: 30,
        timeLimit: 70,
        difficulty: 'Practice',
        attempts: [],
        questions: [
          {
            id: 'ace-q1',
            type: 'multiple-choice',
            question: 'Which gcloud command is used to set the default project?',
            options: [
              { id: 'a', text: 'gcloud project set [PROJECT_ID]', isCorrect: false },
              { id: 'b', text: 'gcloud config set project [PROJECT_ID]', isCorrect: true },
              { id: 'c', text: 'gcloud set project [PROJECT_ID]', isCorrect: false },
              { id: 'd', text: 'gcloud default project [PROJECT_ID]', isCorrect: false }
            ],
            correctAnswers: ['b'],
            explanation: 'The correct command is "gcloud config set project [PROJECT_ID]" to set the default project for gcloud commands.',
            difficulty: 'medium',
            topics: ['gcloud CLI', 'Project Management']
          }
        ]
      }
    ],
    recommendedExperience: '6+ months of hands-on experience with Google Cloud, including experience with gcloud command line tool.'
  }
];
