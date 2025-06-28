import type { ArchitecturePattern, CaseStudy } from '../types/architecture.ts';

export const architecturePatterns: ArchitecturePattern[] = [
  {
    id: 'three-tier-web-app',
    name: '3-Tier Web Application',
    category: 'Web Applications',
    description: 'Classic web application architecture with presentation, application, and data tiers',
    difficulty: 'Intermediate',
    components: [
      {
        name: 'Application Load Balancer',
        service: 'ALB',
        purpose: 'Distribute traffic across web servers',
        tier: 'Presentation'
      },
      {
        name: 'Web Servers',
        service: 'EC2',
        purpose: 'Host web application frontend',
        tier: 'Presentation'
      },
      {
        name: 'Application Servers',
        service: 'EC2',
        purpose: 'Business logic processing',
        tier: 'Application'
      },
      {
        name: 'Database',
        service: 'RDS',
        purpose: 'Data persistence and management',
        tier: 'Data'
      }
    ],
    benefits: [
      'Clear separation of concerns',
      'Scalable and maintainable',
      'Well-understood architecture',
      'Easy to implement security at each tier'
    ],
    considerations: [
      'Potential single points of failure',
      'Network latency between tiers',
      'Complexity in deployment',
      'Resource utilization efficiency'
    ],
    useCases: [
      'E-commerce applications',
      'Content management systems',
      'Customer portals',
      'Enterprise web applications'
    ],
    awsServices: ['ALB', 'EC2', 'RDS', 'VPC', 'Security Groups', 'CloudWatch'],
    estimatedCost: '$200-800/month',
    designPrinciples: [
      'High Availability across multiple AZs',
      'Auto Scaling for demand fluctuation',
      'Security in depth with WAF and Security Groups',
      'Monitoring and logging with CloudWatch'
    ]
  },
  {
    id: 'serverless-microservices',
    name: 'Serverless Microservices',
    category: 'Microservices',
    description: 'Event-driven microservices architecture using serverless technologies',
    difficulty: 'Advanced',
    components: [
      {
        name: 'API Gateway',
        service: 'API Gateway',
        purpose: 'API management and routing',
        tier: 'API'
      },
      {
        name: 'Lambda Functions',
        service: 'Lambda',
        purpose: 'Business logic execution',
        tier: 'Compute'
      },
      {
        name: 'DynamoDB',
        service: 'DynamoDB',
        purpose: 'NoSQL data storage',
        tier: 'Data'
      },
      {
        name: 'EventBridge',
        service: 'EventBridge',
        purpose: 'Event routing and integration',
        tier: 'Integration'
      }
    ],
    benefits: [
      'No server management required',
      'Automatic scaling to zero',
      'Pay only for actual usage',
      'Built-in high availability',
      'Fast deployment and iteration'
    ],
    considerations: [
      'Cold start latency',
      'Vendor lock-in',
      'Debugging complexity',
      'Limited execution time',
      'State management challenges'
    ],
    useCases: [
      'Real-time data processing',
      'IoT backends',
      'Chat applications',
      'Image/video processing',
      'API-first applications'
    ],
    awsServices: ['Lambda', 'API Gateway', 'DynamoDB', 'EventBridge', 'SQS', 'SNS'],
    estimatedCost: '$50-300/month',
    designPrinciples: [
      'Event-driven architecture',
      'Stateless function design',
      'Asynchronous processing where possible',
      'Circuit breaker patterns for resilience'
    ]
  },
  {
    id: 'data-lake-analytics',
    name: 'Data Lake and Analytics',
    category: 'Big Data',
    description: 'Scalable data lake architecture for data storage, processing, and analytics',
    difficulty: 'Advanced',
    components: [
      {
        name: 'Data Ingestion',
        service: 'Kinesis',
        purpose: 'Real-time data streaming',
        tier: 'Ingestion'
      },
      {
        name: 'Raw Data Storage',
        service: 'S3',
        purpose: 'Store raw data in data lake',
        tier: 'Storage'
      },
      {
        name: 'Data Processing',
        service: 'EMR',
        purpose: 'Big data processing with Spark',
        tier: 'Processing'
      },
      {
        name: 'Data Warehouse',
        service: 'Redshift',
        purpose: 'Structured data for analytics',
        tier: 'Analytics'
      },
      {
        name: 'Visualization',
        service: 'QuickSight',
        purpose: 'Business intelligence dashboards',
        tier: 'Presentation'
      }
    ],
    benefits: [
      'Store any type of data at scale',
      'Cost-effective storage',
      'Flexible data processing',
      'Advanced analytics capabilities',
      'Machine learning integration'
    ],
    considerations: [
      'Data governance complexity',
      'Security and compliance',
      'Performance optimization',
      'Cost management',
      'Skill requirements'
    ],
    useCases: [
      'Business intelligence',
      'Machine learning pipelines',
      'Log analysis',
      'IoT data processing',
      'Financial analytics'
    ],
    awsServices: ['S3', 'Kinesis', 'EMR', 'Redshift', 'Glue', 'QuickSight', 'Athena'],
    estimatedCost: '$500-5000/month',
    designPrinciples: [
      'Schema-on-read approach',
      'Tiered storage for cost optimization',
      'Data cataloging and governance',
      'Security and encryption at rest and in transit'
    ]
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform Modernization',
    industry: 'Retail',
    scenario: `
A traditional e-commerce company with 1 million+ customers wants to modernize their platform to handle:
- Black Friday traffic spikes (10x normal load)
- Global expansion to multiple regions
- Mobile-first customer experience
- Real-time inventory management
- Personalized recommendations

Current challenges:
- Monolithic application causing deployment issues
- Database becomes bottleneck during peak traffic
- Manual scaling leading to downtime
- Limited analytics and insights
- High infrastructure costs during low-traffic periods
    `,
    businessRequirements: [
      'Handle 100,000 concurrent users',
      'Sub-second page load times globally',
      '99.99% uptime during business hours',
      'Cost reduction of 30% compared to current infrastructure',
      'Real-time inventory updates across all channels',
      'Personalized shopping experience',
      'Compliance with PCI DSS and GDPR'
    ],
    technicalChallenges: [
      'Legacy monolithic architecture',
      'Database performance bottlenecks',
      'Limited auto-scaling capabilities',
      'Manual deployment processes',
      'Lack of real-time data processing',
      'Security and compliance requirements'
    ],
    proposedSolution: {
      architecture: 'Microservices with API Gateway',
      cloudProvider: 'AWS',
      components: [
        {
          component: 'Frontend',
          service: 'CloudFront + S3',
          description: 'Global CDN for static assets and SPA hosting'
        },
        {
          component: 'API Layer',
          service: 'API Gateway + Lambda',
          description: 'Serverless microservices for business logic'
        },
        {
          component: 'User Service',
          service: 'ECS + RDS',
          description: 'User authentication and profile management'
        },
        {
          component: 'Product Catalog',
          service: 'ElasticSearch + DynamoDB',
          description: 'Search and product information storage'
        },
        {
          component: 'Inventory Management',
          service: 'Lambda + DynamoDB + Kinesis',
          description: 'Real-time inventory tracking and updates'
        },
        {
          component: 'Order Processing',
          service: 'SQS + Lambda + RDS',
          description: 'Asynchronous order processing pipeline'
        },
        {
          component: 'Payment Processing',
          service: 'Lambda + Secrets Manager',
          description: 'Secure payment processing with third-party integration'
        },
        {
          component: 'Recommendations',
          service: 'SageMaker + Lambda',
          description: 'ML-powered personalized recommendations'
        }
      ],
      dataFlow: [
        'User accesses web app via CloudFront',
        'API Gateway routes requests to appropriate microservices',
        'Lambda functions process business logic',
        'DynamoDB stores user sessions and product data',
        'Kinesis streams real-time events for analytics',
        'SageMaker processes data for recommendations'
      ]
    },
    migrationStrategy: [
      {
        phase: 'Phase 1: Infrastructure Setup',
        duration: '4 weeks',
        activities: [
          'Set up AWS accounts and organizations',
          'Configure VPC, subnets, and security groups',
          'Implement CI/CD pipeline with CodePipeline',
          'Set up monitoring with CloudWatch and X-Ray'
        ]
      },
      {
        phase: 'Phase 2: Data Migration',
        duration: '6 weeks',
        activities: [
          'Migrate user data to DynamoDB',
          'Set up product catalog in ElasticSearch',
          'Implement data synchronization processes',
          'Validate data integrity and performance'
        ]
      },
      {
        phase: 'Phase 3: Service Migration',
        duration: '8 weeks',
        activities: [
          'Deploy user service microservice',
          'Migrate product catalog service',
          'Implement order processing pipeline',
          'Deploy payment processing service'
        ]
      },
      {
        phase: 'Phase 4: Advanced Features',
        duration: '6 weeks',
        activities: [
          'Implement recommendation engine',
          'Add real-time analytics',
          'Optimize performance and costs',
          'Security audit and compliance validation'
        ]
      }
    ],
    expectedBenefits: [
      '10x improvement in scalability',
      '50% reduction in page load times',
      '30% cost reduction through serverless adoption',
      '99.99% uptime achievement',
      '25% increase in conversion rates',
      'Real-time inventory accuracy',
      'Faster feature deployment (daily vs monthly)'
    ],
    riskMitigation: [
      {
        risk: 'Data loss during migration',
        mitigation: 'Implement blue-green deployment with data validation'
      },
      {
        risk: 'Performance degradation',
        mitigation: 'Load testing and gradual traffic migration'
      },
      {
        risk: 'Security vulnerabilities',
        mitigation: 'Security reviews, penetration testing, WAF implementation'
      },
      {
        risk: 'Cost overruns',
        mitigation: 'Cost monitoring, budget alerts, and resource optimization'
      }
    ],
    kpis: [
      'Response time < 200ms for API calls',
      'Cost per transaction reduced by 30%',
      'Zero downtime during peak traffic',
      'Customer satisfaction score > 4.5/5',
      'Security incidents = 0',
      'Development velocity increased 3x'
    ],
    lessonsLearned: [
      'Start with data migration and validation',
      'Implement comprehensive monitoring early',
      'Use feature flags for gradual rollouts',
      'Invest in automated testing and deployment',
      'Regular security and performance reviews'
    ]
  },
  {
    id: 'financial-data-platform',
    title: 'Financial Data Analytics Platform',
    industry: 'Financial Services',
    scenario: `
A financial institution needs to build a real-time analytics platform to:
- Process millions of transactions per day
- Detect fraudulent activities in real-time
- Generate regulatory compliance reports
- Provide real-time dashboards for traders
- Ensure data security and audit trails

Regulatory requirements:
- SOX compliance for financial reporting
- PCI DSS for payment data
- Data residency requirements
- Audit trail for all data access
- Real-time fraud detection (<100ms)
    `,
    businessRequirements: [
      'Process 10M+ transactions daily',
      'Real-time fraud detection (<100ms)',
      'Generate compliance reports within 24 hours',
      'Support 500+ concurrent dashboard users',
      'Maintain audit trail for 7 years',
      'Cross-region data replication',
      '99.95% uptime for trading hours'
    ],
    technicalChallenges: [
      'High-volume real-time data processing',
      'Low-latency fraud detection',
      'Complex regulatory compliance requirements',
      'Data security and encryption',
      'Multi-region deployment',
      'Cost optimization for large data volumes'
    ],
    proposedSolution: {
      architecture: 'Event-driven Data Lake with Real-time Processing',
      cloudProvider: 'AWS',
      components: [
        {
          component: 'Data Ingestion',
          service: 'Kinesis Data Streams',
          description: 'Real-time transaction data ingestion'
        },
        {
          component: 'Stream Processing',
          service: 'Kinesis Analytics + Lambda',
          description: 'Real-time fraud detection and enrichment'
        },
        {
          component: 'Data Lake',
          service: 'S3 + Glue + Lake Formation',
          description: 'Secure data storage with governance'
        },
        {
          component: 'Data Warehouse',
          service: 'Redshift',
          description: 'Structured data for reporting and analytics'
        },
        {
          component: 'Machine Learning',
          service: 'SageMaker',
          description: 'Fraud detection model training and inference'
        },
        {
          component: 'Visualization',
          service: 'QuickSight + Custom Dashboards',
          description: 'Real-time trading and compliance dashboards'
        },
        {
          component: 'Security',
          service: 'KMS + CloudHSM + WAF',
          description: 'Encryption, key management, and access control'
        }
      ],
      dataFlow: [
        'Transaction data streams through Kinesis',
        'Real-time processing checks for fraud patterns',
        'Clean data stored in S3 data lake',
        'Glue ETL jobs process data for analytics',
        'Redshift provides structured data for reporting',
        'QuickSight displays real-time dashboards'
      ]
    },
    migrationStrategy: [
      {
        phase: 'Phase 1: Foundation',
        duration: '6 weeks',
        activities: [
          'Set up secure AWS environment',
          'Implement data lake architecture',
          'Configure encryption and key management',
          'Set up audit logging and monitoring'
        ]
      },
      {
        phase: 'Phase 2: Data Pipeline',
        duration: '8 weeks',
        activities: [
          'Build real-time data ingestion pipeline',
          'Implement data processing and transformation',
          'Set up data warehouse and analytics',
          'Validate data quality and accuracy'
        ]
      },
      {
        phase: 'Phase 3: Analytics and ML',
        duration: '10 weeks',
        activities: [
          'Deploy fraud detection models',
          'Build compliance reporting system',
          'Create real-time dashboards',
          'Implement alerting and notifications'
        ]
      }
    ],
    expectedBenefits: [
      'Real-time fraud detection reducing losses by 60%',
      'Automated compliance reporting saving 80% effort',
      'Sub-second query performance on petabyte data',
      '50% cost reduction through optimized storage',
      'Improved trader productivity with real-time insights',
      'Enhanced regulatory compliance and audit capabilities'
    ],
    riskMitigation: [
      {
        risk: 'Data breach or security incident',
        mitigation: 'Multi-layer security, encryption, regular security audits'
      },
      {
        risk: 'Regulatory compliance failure',
        mitigation: 'Regular compliance reviews, automated controls'
      },
      {
        risk: 'Performance degradation during peak trading',
        mitigation: 'Load testing, auto-scaling, performance monitoring'
      }
    ],
    kpis: [
      'Fraud detection accuracy > 99%',
      'Query response time < 1 second',
      'Data pipeline availability > 99.9%',
      'Compliance report generation < 24 hours',
      'Cost per transaction reduced by 50%'
    ],
    lessonsLearned: [
      'Security and compliance must be built-in from day one',
      'Real-time processing requires careful capacity planning',
      'Data quality validation is critical for ML models',
      'Regular disaster recovery testing is essential',
      'Cost optimization requires ongoing monitoring'
    ]
  }
];
