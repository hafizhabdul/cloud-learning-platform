import type { AWSService, CertificationPath } from '../types/aws';

export const awsServices: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Compute',
    description: 'Virtual servers in the cloud. Launch and manage scalable compute capacity.',
    icon: 'Server',
    difficulty: 'Beginner',
    documentation: 'https://docs.aws.amazon.com/ec2/',
    pricing: 'https://aws.amazon.com/ec2/pricing/',
    useCases: [
      'Web applications',
      'Development and testing',
      'Backup and disaster recovery',
      'High-performance computing'
    ],
    modules: [
      {
        id: 'ec2-basics',
        title: 'EC2 Fundamentals',
        description: 'Learn the basics of Amazon EC2 instances',
        duration: '45 minutes',
        completed: false,
        lessons: [
          {
            id: 'ec2-intro',
            title: 'Introduction to EC2',
            content: `
# Amazon EC2 Overview

Amazon Elastic Compute Cloud (EC2) provides scalable computing capacity in the Amazon Web Services (AWS) cloud. Using Amazon EC2 eliminates your need to invest in hardware up front, so you can develop and deploy applications faster.

## Key Concepts

### Instance Types
- **General Purpose**: Balanced compute, memory, and networking (t3, m5)
- **Compute Optimized**: High-performance processors (c5, c6i)
- **Memory Optimized**: Fast performance for memory-intensive workloads (r5, x1e)
- **Storage Optimized**: High sequential read/write access (i3, d2)

### Instance States
- **Pending**: Instance is starting up
- **Running**: Instance is running and billable
- **Stopping**: Instance is shutting down
- **Stopped**: Instance is shut down (not billable for compute)
- **Terminated**: Instance is permanently deleted

### Pricing Models
- **On-Demand**: Pay per hour/second with no long-term commitments
- **Reserved Instances**: 1-3 year terms with significant discounts
- **Spot Instances**: Bid for spare capacity at reduced costs
- **Dedicated Hosts**: Physical servers dedicated for your use
            `,
            completed: false,
            keyPoints: [
              'EC2 provides resizable compute capacity',
              'Multiple instance types for different workloads',
              'Various pricing models to optimize costs',
              'Instances can be started, stopped, and terminated'
            ]
          },
          {
            id: 'ec2-launch',
            title: 'Launching Your First EC2 Instance',
            content: `
# Launching an EC2 Instance

## Prerequisites
- AWS Account with appropriate permissions
- Basic understanding of networking concepts
- SSH key pair for Linux instances or RDP for Windows

## Steps to Launch an Instance

### 1. Choose an Amazon Machine Image (AMI)
- **Amazon Linux 2**: Optimized for AWS, includes AWS CLI and tools
- **Ubuntu**: Popular Linux distribution
- **Windows Server**: For Windows-based applications
- **Custom AMIs**: Your own preconfigured images

### 2. Choose Instance Type
For beginners, start with **t3.micro** (eligible for free tier):
- 1 vCPU
- 1 GB Memory
- Low to Moderate network performance
- Burstable performance

### 3. Configure Instance Details
- **Number of instances**: How many to launch
- **Network (VPC)**: Which virtual network to use
- **Subnet**: Which subnet within the VPC
- **IAM Role**: Permissions for the instance
- **User Data**: Scripts to run at launch

### 4. Add Storage
- **Root Volume**: Operating system and applications
- **Additional EBS Volumes**: For data storage
- **Instance Store**: Temporary storage (lost when instance stops)

### 5. Configure Security Groups
Security groups act as virtual firewalls:
- **Inbound Rules**: What traffic can reach your instance
- **Outbound Rules**: What traffic can leave your instance
- **Common Ports**: SSH (22), HTTP (80), HTTPS (443), RDP (3389)

### 6. Review and Launch
- Review all settings
- Select or create a key pair
- Launch the instance
            `,
            completed: false,
            keyPoints: [
              'AMI determines the operating system and software',
              'Instance type defines compute resources',
              'Security groups control network access',
              'Key pairs are required for secure access'
            ],
            codeExamples: [
              {
                id: 'ec2-cli-launch',
                title: 'Launch EC2 Instance with AWS CLI',
                language: 'bash',
                code: `# Launch a new EC2 instance
aws ec2 run-instances \\
    --image-id ami-0abcdef1234567890 \\
    --count 1 \\
    --instance-type t3.micro \\
    --key-name MyKeyPair \\
    --security-group-ids sg-903004f8 \\
    --subnet-id subnet-6e7f829e

# List running instances
aws ec2 describe-instances \\
    --filters "Name=instance-state-name,Values=running" \\
    --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,PublicIpAddress]' \\
    --output table`,
                description: 'Basic AWS CLI commands to launch and list EC2 instances',
                runnable: false
              }
            ]
          }
        ],
        quiz: {
          id: 'ec2-basics-quiz',
          title: 'EC2 Fundamentals Quiz',
          description: 'Test your understanding of EC2 basics',
          timeLimit: 15,
          passingScore: 70,
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'Which EC2 pricing model offers the lowest cost but with the risk of interruption?',
              options: ['On-Demand', 'Reserved Instances', 'Spot Instances', 'Dedicated Hosts'],
              correctAnswer: 'Spot Instances',
              explanation: 'Spot Instances allow you to bid for spare EC2 capacity at reduced costs, but can be interrupted when AWS needs the capacity back.',
              difficulty: 'Medium',
              topics: ['EC2 Pricing'],
              points: 10
            },
            {
              id: 'q2',
              type: 'multiple-choice',
              question: 'What is the minimum billable time for an On-Demand EC2 instance?',
              options: ['1 second', '1 minute', '1 hour', '1 day'],
              correctAnswer: '1 second',
              explanation: 'EC2 On-Demand instances are billed per second with a minimum of 60 seconds for Linux instances.',
              difficulty: 'Easy',
              topics: ['EC2 Billing'],
              points: 5
            },
            {
              id: 'q3',
              type: 'multiple-select',
              question: 'Which of the following are valid EC2 instance states? (Select all that apply)',
              options: ['Pending', 'Running', 'Hibernating', 'Stopped', 'Terminated', 'Suspended'],
              correctAnswer: ['Pending', 'Running', 'Stopped', 'Terminated'],
              explanation: 'Valid EC2 states include pending, running, shutting-down, terminated, stopping, and stopped. Hibernating and Suspended are not standard EC2 states.',
              difficulty: 'Medium',
              topics: ['EC2 States'],
              points: 15
            }
          ],
          attempts: []
        }
      }
    ],
    labs: [
      {
        id: 'ec2-web-server-lab',
        title: 'Deploy a Web Server on EC2',
        description: 'Launch an EC2 instance and deploy a simple web server',
        difficulty: 'Beginner',
        duration: '30 minutes',
        prerequisites: ['AWS Account', 'Basic Linux knowledge'],
        objectives: [
          'Launch an EC2 instance',
          'Connect to the instance via SSH',
          'Install and configure a web server',
          'Test the web server from the internet'
        ],
        completed: false,
        steps: [
          {
            id: 'step1',
            title: 'Launch EC2 Instance',
            instruction: 'Navigate to EC2 console and launch a new t3.micro instance with Amazon Linux 2 AMI',
            tips: ['Use the free tier eligible t3.micro', 'Make sure to select a public subnet']
          },
          {
            id: 'step2',
            title: 'Configure Security Group',
            instruction: 'Create a security group that allows SSH (port 22) and HTTP (port 80) access',
            command: 'aws ec2 create-security-group --group-name WebServerSG --description "Security group for web server"',
            tips: ['Allow SSH from your IP only', 'Allow HTTP from anywhere (0.0.0.0/0)']
          },
          {
            id: 'step3',
            title: 'Connect to Instance',
            instruction: 'Use SSH to connect to your EC2 instance',
            command: 'ssh -i "your-key.pem" ec2-user@your-instance-public-ip',
            tips: ['Make sure your .pem file has correct permissions (chmod 400)', 'Use the public IP address of your instance']
          },
          {
            id: 'step4',
            title: 'Install Web Server',
            instruction: 'Install and start Apache web server',
            command: 'sudo yum update -y && sudo yum install -y httpd && sudo systemctl start httpd && sudo systemctl enable httpd',
            expectedOutput: 'Apache should start successfully'
          },
          {
            id: 'step5',
            title: 'Test Web Server',
            instruction: 'Open a web browser and navigate to your instance\'s public IP address',
            tips: ['You should see the Apache test page', 'If it doesn\'t work, check your security group settings']
          }
        ],
        resources: [
          {
            name: 'index.html',
            type: 'template',
            content: `<!DOCTYPE html>
<html>
<head>
    <title>My First EC2 Web Server</title>
</head>
<body>
    <h1>Hello from EC2!</h1>
    <p>This web server is running on Amazon EC2.</p>
    <p>Instance Details:</p>
    <ul>
        <li>Instance Type: t3.micro</li>
        <li>Operating System: Amazon Linux 2</li>
        <li>Web Server: Apache HTTP Server</li>
    </ul>
</body>
</html>`,
            description: 'Custom HTML page to replace the default Apache page'
          }
        ],
        validation: [
          'Web server responds to HTTP requests',
          'Instance is accessible via SSH',
          'Security group is properly configured'
        ]
      }
    ]
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Compute',
    description: 'Run code without thinking about servers. Pay only for the compute time you consume.',
    icon: 'Zap',
    difficulty: 'Intermediate',
    documentation: 'https://docs.aws.amazon.com/lambda/',
    pricing: 'https://aws.amazon.com/lambda/pricing/',
    useCases: [
      'Serverless web applications',
      'Real-time data processing',
      'API backends',
      'Event-driven automation',
      'Microservices architecture'
    ],
    modules: [
      {
        id: 'lambda-fundamentals',
        title: 'Lambda Fundamentals',
        description: 'Learn the basics of serverless computing with AWS Lambda',
        duration: '60 minutes',
        completed: false,
        lessons: [
          {
            id: 'lambda-intro',
            title: 'Introduction to Serverless Computing',
            content: `
# AWS Lambda: Serverless Computing

AWS Lambda is a compute service that lets you run code without provisioning or managing servers. Lambda automatically scales your application by running code in response to each trigger.

## Key Concepts

### What is Serverless?
- **No server management**: AWS handles all infrastructure
- **Automatic scaling**: From zero to thousands of concurrent executions
- **Pay per use**: Only pay for compute time consumed
- **High availability**: Built-in fault tolerance and redundancy

### Lambda Execution Model
- **Event-driven**: Triggered by events from AWS services
- **Stateless**: Each invocation is independent
- **Ephemeral**: Execution environment is temporary
- **Concurrent**: Multiple invocations can run simultaneously

### Supported Runtimes
- **Node.js**: v14.x, v16.x, v18.x
- **Python**: 3.8, 3.9, 3.10, 3.11
- **Java**: 8, 11, 17
- **C# (.NET)**: Core 3.1, 6
- **Go**: 1.x
- **Ruby**: 2.7, 3.2
- **Custom Runtimes**: Using Lambda Runtime API

## Lambda Function Anatomy

### Handler Function
The entry point for your Lambda function:
\`\`\`python
def lambda_handler(event, context):
    # Your code here
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
\`\`\`

### Event Object
Contains data about the triggering event:
- API Gateway request data
- S3 bucket notification
- DynamoDB stream record
- CloudWatch Events

### Context Object
Provides runtime information:
- Function name and version
- Request ID
- Remaining execution time
- Memory limit
            `,
            completed: false,
            keyPoints: [
              'Lambda runs code without server management',
              'Event-driven and automatically scales',
              'Pay only for actual compute time',
              'Supports multiple programming languages',
              'Stateless execution model'
            ]
          },
          {
            id: 'lambda-triggers',
            title: 'Lambda Event Sources and Triggers',
            content: `
# Lambda Event Sources

Lambda can be triggered by numerous AWS services and external sources.

## Common Event Sources

### API Gateway
Create RESTful APIs and HTTP APIs:
\`\`\`json
{
  "httpMethod": "POST",
  "path": "/users",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{\\"name\\": \\"John Doe\\"}"
}
\`\`\`

### S3 Events
Process file uploads, deletions, modifications:
\`\`\`json
{
  "Records": [{
    "eventName": "ObjectCreated:Put",
    "s3": {
      "bucket": {"name": "my-bucket"},
      "object": {"key": "image.jpg"}
    }
  }]
}
\`\`\`

### DynamoDB Streams
React to database changes:
\`\`\`json
{
  "Records": [{
    "eventName": "INSERT",
    "dynamodb": {
      "NewImage": {
        "id": {"S": "123"},
        "name": {"S": "John"}
      }
    }
  }]
}
\`\`\`

### CloudWatch Events/EventBridge
Schedule or event-based triggers:
\`\`\`json
{
  "source": "aws.ec2",
  "detail-type": "EC2 Instance State-change Notification",
  "detail": {
    "state": "running",
    "instance-id": "i-1234567890abcdef0"
  }
}
\`\`\`

### SQS (Simple Queue Service)
Process messages from queues:
\`\`\`json
{
  "Records": [{
    "messageId": "12345",
    "body": "Message content",
    "attributes": {}
  }]
}
\`\`\`

## Event Source Mapping

### Poll-based Sources
Lambda polls these sources:
- **SQS**: Pull messages from queue
- **Kinesis**: Read from data streams
- **DynamoDB Streams**: Read database changes

### Push-based Sources
These sources invoke Lambda directly:
- **API Gateway**: HTTP requests
- **S3**: Bucket notifications
- **SNS**: Topic messages
- **CloudWatch Events**: Scheduled or event-driven
            `,
            completed: false,
            keyPoints: [
              'Lambda supports numerous event sources',
              'API Gateway enables HTTP/REST APIs',
              'S3 events for file processing',
              'DynamoDB streams for database reactions',
              'Poll-based vs push-based invocation models'
            ]
          }
        ],
        quiz: {
          id: 'lambda-fundamentals-quiz',
          title: 'Lambda Fundamentals Quiz',
          description: 'Test your understanding of AWS Lambda fundamentals',
          timeLimit: 30,
          passingScore: 70,
          questions: [
            {
              id: 'lambda-q1',
              type: 'multiple-choice',
              question: 'What is the maximum execution time for a Lambda function?',
              options: ['5 minutes', '15 minutes', '30 minutes', '1 hour'],
              correctAnswer: '15 minutes',
              explanation: 'Lambda functions have a maximum execution time of 15 minutes.',
              difficulty: 'Easy',
              topics: ['Lambda Limits'],
              points: 5
            },
            {
              id: 'lambda-q2',
              type: 'multiple-choice',
              question: 'Which of the following is NOT a characteristic of AWS Lambda?',
              options: [
                'Automatic scaling',
                'Server management required',
                'Pay per execution',
                'Event-driven execution'
              ],
              correctAnswer: 'Server management required',
              explanation: 'Lambda is serverless - AWS manages all infrastructure automatically.',
              difficulty: 'Easy',
              topics: ['Serverless Concepts'],
              points: 5
            },
            {
              id: 'lambda-q3',
              type: 'multiple-choice',
              question: 'What is the best practice for handling database connections in Lambda?',
              options: [
                'Create new connection on every invocation',
                'Use connection pooling outside the handler',
                'Store connections in global variables',
                'Use RDS Proxy for connection management'
              ],
              correctAnswer: 'Use RDS Proxy for connection management',
              explanation: 'RDS Proxy efficiently manages database connections for serverless applications.',
              difficulty: 'Medium',
              topics: ['Lambda Best Practices', 'Database Connections'],
              points: 10
            }
          ],
          attempts: []
        }
      },
      {
        id: 'lambda-architecture',
        title: 'Serverless Architecture Patterns',
        description: 'Learn common serverless architecture patterns and best practices',
        duration: '75 minutes',
        completed: false,
        lessons: [
          {
            id: 'serverless-patterns',
            title: 'Common Serverless Patterns',
            content: `
# Serverless Architecture Patterns

## 1. API-Driven Pattern
**Use Case**: REST APIs, microservices
**Components**: API Gateway + Lambda + DynamoDB

\`\`\`
Internet → API Gateway → Lambda → DynamoDB
                     ↓
                  CloudWatch Logs
\`\`\`

**Benefits**:
- No server maintenance
- Automatic scaling
- Pay per request
- Built-in monitoring

## 2. Event-Driven Processing
**Use Case**: File processing, data transformation
**Components**: S3 + Lambda + SNS/SQS

\`\`\`
S3 Upload → Lambda → Processing → SNS/SQS → Lambda → Database
\`\`\`

**Benefits**:
- Decoupled architecture
- Fault tolerant
- Scalable processing
- Cost effective

## 3. Scheduled Jobs Pattern
**Use Case**: Batch processing, cleanup tasks
**Components**: CloudWatch Events + Lambda

\`\`\`
CloudWatch Events (Cron) → Lambda → Processing
\`\`\`

**Benefits**:
- No servers to maintain
- Built-in scheduling
- Cost effective for periodic tasks

## 4. Stream Processing Pattern
**Use Case**: Real-time data processing
**Components**: Kinesis + Lambda + Analytics

\`\`\`
Data Source → Kinesis Stream → Lambda → Analytics/Database
\`\`\`

**Benefits**:
- Real-time processing
- Auto-scaling
- Built-in checkpointing

## 5. Fan-out Pattern
**Use Case**: Multiple downstream processing
**Components**: SNS + Multiple Lambdas

\`\`\`
Event → SNS Topic → Lambda 1 (Email)
                 → Lambda 2 (SMS)
                 → Lambda 3 (Database)
\`\`\`

**Benefits**:
- Parallel processing
- Loose coupling
- Independent scaling
            `,
            completed: false,
            keyPoints: [
              'API Gateway + Lambda for REST APIs',
              'Event-driven processing with S3 and SNS',
              'Scheduled jobs with CloudWatch Events',
              'Stream processing with Kinesis',
              'Fan-out pattern for parallel processing'
            ]
          }
        ],
        quiz: {
          id: 'serverless-patterns-quiz',
          title: 'Serverless Patterns Quiz',
          description: 'Test your understanding of serverless architecture patterns',
          timeLimit: 20,
          passingScore: 70,
          questions: [
            {
              id: 'pattern-q1',
              type: 'multiple-choice',
              question: 'Which pattern is best for processing uploaded files?',
              options: [
                'API-Driven Pattern',
                'Event-Driven Processing',
                'Scheduled Jobs Pattern',
                'Stream Processing Pattern'
              ],
              correctAnswer: 'Event-Driven Processing',
              explanation: 'Event-driven processing with S3 triggers is ideal for file processing workflows.',
              difficulty: 'Medium',
              topics: ['Serverless Patterns'],
              points: 10
            }
          ],
          attempts: []
        }
      }
    ],
    labs: [
      {
        id: 'lambda-hello-world',
        title: 'Create Your First Lambda Function',
        description: 'Build and deploy a simple Lambda function using the AWS Console',
        difficulty: 'Beginner',
        duration: '30 minutes',
        prerequisites: ['AWS Account', 'Basic programming knowledge'],
        objectives: [
          'Create a Lambda function in the AWS Console',
          'Test the function with sample events',
          'Monitor function execution in CloudWatch',
          'Understand Lambda pricing model'
        ],
        steps: [
          {
            id: 'step1',
            title: 'Create Lambda Function',
            instruction: 'Navigate to AWS Lambda console and create a new function with Python 3.11 runtime',
            expectedOutput: 'Lambda function created successfully'
          }
        ],
        resources: [
          {
            name: 'Lambda Developer Guide',
            type: 'data',
            content: 'https://docs.aws.amazon.com/lambda/latest/dg/',
            description: 'Official AWS Lambda documentation'
          }
        ],
        validation: [
          'Lambda function created and deployed',
          'Function executes without errors',
          'CloudWatch logs show execution details'
        ],
        completed: false
      }
    ]
  },
  {
    id: 'api-gateway',
    name: 'Amazon API Gateway',
    category: 'Networking & Content Delivery',
    description: 'Create, publish, maintain, monitor, and secure APIs at any scale.',
    icon: 'Network',
    difficulty: 'Intermediate',
    documentation: 'https://docs.aws.amazon.com/apigateway/',
    pricing: 'https://aws.amazon.com/api-gateway/pricing/',
    useCases: [
      'REST and HTTP APIs',
      'WebSocket APIs',
      'API management and versioning',
      'Rate limiting and throttling',
      'API security and authentication'
    ],
    modules: [
      {
        id: 'api-gateway-fundamentals',
        title: 'API Gateway Fundamentals',
        description: 'Learn the basics of API Gateway and REST API creation',
        duration: '50 minutes',
        completed: false,
        lessons: [
          {
            id: 'api-gateway-intro',
            title: 'Introduction to API Gateway',
            content: `
# Amazon API Gateway

API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

## Key Features

### API Types
- **REST APIs**: Full-featured APIs with comprehensive management
- **HTTP APIs**: Lower cost, higher performance for simple use cases
- **WebSocket APIs**: Real-time bidirectional communication

### Request/Response Transformation
- Modify headers, query parameters, and body
- Data validation and format conversion
- Request and response mapping templates

### Security
- **AWS IAM**: Role-based access control
- **Cognito**: User pools for authentication
- **API Keys**: Simple API key management
- **Custom Authorizers**: Lambda-based authorization

### Monitoring and Analytics
- **CloudWatch**: Metrics and logging
- **AWS X-Ray**: Distributed tracing
- **Usage Plans**: Rate limiting and quotas

## API Gateway Architecture

\`\`\`
Client → API Gateway → Backend Integration
         ↓
    CloudWatch/X-Ray
\`\`\`

### Integration Types
1. **Lambda Function**: Serverless compute
2. **HTTP Endpoint**: External web services
3. **AWS Service**: Direct AWS service integration
4. **Mock**: Return static responses
5. **VPC Link**: Private resources in VPC

## Request/Response Flow

### Incoming Request
1. **Authentication**: Verify caller identity
2. **Authorization**: Check permissions
3. **Rate Limiting**: Apply throttling rules
4. **Validation**: Validate request format
5. **Transformation**: Modify request if needed
6. **Routing**: Forward to backend

### Response Processing
1. **Backend Response**: Receive from integration
2. **Transformation**: Modify response if needed
3. **Headers**: Add/modify response headers
4. **Logging**: Record metrics and logs
5. **Return**: Send response to client
            `,
            completed: false,
            keyPoints: [
              'API Gateway supports REST, HTTP, and WebSocket APIs',
              'Multiple security options including IAM and Cognito',
              'Request/response transformation capabilities',
              'Integration with Lambda and other AWS services',
              'Built-in monitoring and analytics'
            ]
          }
        ],
        quiz: {
          id: 'api-gateway-fundamentals-quiz',
          title: 'API Gateway Fundamentals Quiz',
          description: 'Test your understanding of API Gateway fundamentals',
          timeLimit: 25,
          passingScore: 70,
          questions: [
            {
              id: 'apig-q1',
              type: 'multiple-choice',
              question: 'Which API Gateway type offers the lowest cost for simple use cases?',
              options: ['REST API', 'HTTP API', 'WebSocket API', 'GraphQL API'],
              correctAnswer: 'HTTP API',
              explanation: 'HTTP APIs offer lower cost and higher performance for simple proxy use cases.',
              difficulty: 'Easy',
              topics: ['API Gateway Types'],
              points: 5
            },
            {
              id: 'apig-q2',
              type: 'multiple-choice',
              question: 'What is the purpose of a usage plan in API Gateway?',
              options: [
                'Transform request/response data',
                'Implement rate limiting and quotas',
                'Provide API documentation',
                'Handle authentication'
              ],
              correctAnswer: 'Implement rate limiting and quotas',
              explanation: 'Usage plans control access to APIs through rate limiting, throttling, and quota management.',
              difficulty: 'Medium',
              topics: ['Usage Plans', 'Rate Limiting'],
              points: 10
            }
          ],
          attempts: []
        }
      }
    ],
    labs: [
      {
        id: 'api-gateway-rest-api',
        title: 'Create REST API with API Gateway',
        description: 'Build a complete REST API with multiple resources and methods',
        difficulty: 'Intermediate',
        duration: '60 minutes',
        prerequisites: ['Lambda basics', 'REST API concepts'],
        objectives: [
          'Create REST API in API Gateway',
          'Configure multiple resources and methods',
          'Implement request validation',
          'Set up CORS',
          'Deploy API to stages'
        ],
        steps: [
          {
            id: 'rest-step1',
            title: 'Create REST API',
            instruction: 'Create a new REST API in API Gateway console with name UserManagementAPI',
            expectedOutput: 'REST API created with root resource'
          }
        ],
        resources: [
          {
            name: 'REST API Tutorial',
            type: 'data',
            content: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html',
            description: 'Official REST API tutorial'
          }
        ],
        validation: [
          'REST API successfully created',
          'Multiple resources configured',
          'CORS enabled for web clients',
          'API deployed to stage'
        ],
        completed: false
      }
    ]
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    description: 'Object storage service that offers scalability, data availability, security, and performance.',
    icon: 'Database',
    difficulty: 'Beginner',
    documentation: 'https://docs.aws.amazon.com/s3/',
    pricing: 'https://aws.amazon.com/s3/pricing/',
    useCases: [
      'Static website hosting',
      'Data backup and archiving',
      'Content distribution',
      'Data analytics'
    ],
    modules: [
      {
        id: 's3-basics',
        title: 'S3 Fundamentals',
        description: 'Learn the core concepts of Amazon S3',
        duration: '40 minutes',
        completed: false,
        lessons: [
          {
            id: 's3-intro',
            title: 'Introduction to Amazon S3',
            content: `
# Amazon S3 Overview

Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.

## Key Concepts

### Buckets
- Containers for objects in S3
- Must have globally unique names
- Regional resources
- Can contain unlimited number of objects

### Objects
- Files stored in S3 buckets
- Consist of data and metadata
- Can be 0 bytes to 5TB in size
- Identified by a unique key (filename)

### Storage Classes
- **Standard**: Frequently accessed data
- **Standard-IA**: Infrequently accessed data
- **One Zone-IA**: Lower cost for infrequently accessed data
- **Glacier**: Archive storage for long-term backup
- **Glacier Deep Archive**: Lowest cost archive storage

### Security Features
- **Bucket Policies**: JSON-based access policies
- **Access Control Lists (ACLs)**: Legacy access control
- **IAM Policies**: Identity-based permissions
- **Encryption**: Server-side and client-side encryption
            `,
            completed: false,
            keyPoints: [
              'S3 stores objects in buckets',
              'Bucket names must be globally unique',
              'Multiple storage classes for different use cases',
              'Strong security and access control features'
            ]
          }
        ],
        quiz: {
          id: 's3-basics-quiz',
          title: 'S3 Fundamentals Quiz',
          description: 'Test your knowledge of S3 basics',
          timeLimit: 10,
          passingScore: 70,
          questions: [
            {
              id: 's3q1',
              type: 'multiple-choice',
              question: 'What is the maximum size of a single object in S3?',
              options: ['1 GB', '5 GB', '5 TB', 'Unlimited'],
              correctAnswer: '5 TB',
              explanation: 'The maximum size of a single object in S3 is 5 TB.',
              difficulty: 'Easy',
              topics: ['S3 Limits'],
              points: 5
            }
          ],
          attempts: []
        }
      }
    ],
    labs: []
  },
  {
    id: 'eks',
    name: 'Amazon EKS',
    category: 'Containers',
    description: 'Managed Kubernetes service to run Kubernetes on AWS without needing to install and operate your own Kubernetes clusters.',
    icon: 'Container',
    difficulty: 'Advanced',
    documentation: 'https://docs.aws.amazon.com/eks/',
    pricing: 'https://aws.amazon.com/eks/pricing/',
    useCases: [
      'Microservices architecture',
      'Container orchestration',
      'Hybrid cloud deployments',
      'Application modernization',
      'DevOps and CI/CD pipelines'
    ],
    modules: [
      {
        id: 'eks-fundamentals',
        title: 'EKS and Kubernetes Fundamentals',
        description: 'Learn the basics of Kubernetes and Amazon EKS',
        duration: '90 minutes',
        completed: false,
        lessons: [
          {
            id: 'kubernetes-intro',
            title: 'Introduction to Kubernetes',
            content: `
# Kubernetes and Container Orchestration

Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

## Why Kubernetes?

### Container Challenges
- **Manual scaling**: Difficult to scale containers manually
- **Service discovery**: How containers find and communicate
- **Load balancing**: Distributing traffic across containers
- **Health monitoring**: Detecting and replacing failed containers
- **Rolling updates**: Updating applications without downtime

### Kubernetes Solutions
- **Automatic scaling**: Based on CPU, memory, or custom metrics
- **Service discovery**: Built-in DNS and service registry
- **Load balancing**: Automatic traffic distribution
- **Self-healing**: Automatically restarts failed containers
- **Rolling updates**: Zero-downtime deployments

## Kubernetes Architecture

### Control Plane Components
- **API Server**: Exposes Kubernetes API
- **etcd**: Distributed key-value store for cluster data
- **Scheduler**: Assigns pods to nodes
- **Controller Manager**: Runs controller processes

### Worker Node Components
- **kubelet**: Node agent that communicates with control plane
- **kube-proxy**: Network proxy for service load balancing
- **Container Runtime**: Docker, containerd, or other runtimes

## Key Kubernetes Concepts

### Pods
The smallest deployable unit in Kubernetes:
\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.20
    ports:
    - containerPort: 80
\`\`\`

### Deployments
Manage replica sets and rolling updates:
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.20
        ports:
        - containerPort: 80
\`\`\`

### Services
Expose applications and provide load balancing:
\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
\`\`\`
            `,
            completed: false,
            keyPoints: [
              'Kubernetes automates container orchestration',
              'Control plane manages cluster state',
              'Worker nodes run application containers',
              'Pods are the smallest deployable units',
              'Services provide networking and load balancing'
            ]
          },
          {
            id: 'eks-overview',
            title: 'Amazon EKS Overview',
            content: `
# Amazon Elastic Kubernetes Service (EKS)

EKS is a managed Kubernetes service that removes the complexity of running Kubernetes clusters.

## EKS Benefits

### Managed Control Plane
- **High availability**: Multi-AZ control plane
- **Automatic updates**: Kubernetes version management
- **Security patches**: Automated security updates
- **Monitoring**: CloudWatch integration
- **Compliance**: SOC, PCI, ISO certifications

### AWS Integration
- **IAM integration**: Native AWS authentication
- **VPC networking**: Secure cluster networking
- **Load balancers**: ALB and NLB integration
- **Storage**: EBS, EFS, and FSx integration
- **Monitoring**: CloudWatch and X-Ray integration

## EKS Architecture

\`\`\`
Internet Gateway
       ↓
   Public Subnets (ALB)
       ↓
   Private Subnets
    ↓        ↓
Worker Nodes  RDS
    ↓
  EKS Pods
\`\`\`

### EKS Cluster Components
1. **EKS Control Plane**: Managed by AWS
2. **Worker Nodes**: EC2 instances or Fargate
3. **VPC**: Custom networking configuration
4. **Security Groups**: Network access control
5. **IAM Roles**: Authentication and authorization

## EKS Node Groups

### Managed Node Groups
- **Automatic provisioning**: AWS manages EC2 instances
- **Auto Scaling**: Based on cluster needs
- **Rolling updates**: Automated node updates
- **Instance types**: Multiple instance type support

### Self-Managed Nodes
- **Custom AMIs**: Use custom Amazon Machine Images
- **Advanced configuration**: Full control over node setup
- **Cost optimization**: Spot instances and Reserved Instances

### AWS Fargate
- **Serverless containers**: No EC2 management
- **Pod-level isolation**: Each pod runs in isolated compute
- **Pay per pod**: Only pay for running pods
- **Automatic scaling**: Serverless scaling

## EKS Networking

### VPC Configuration
- **Public subnets**: For load balancers
- **Private subnets**: For worker nodes
- **NAT Gateway**: Outbound internet access
- **Internet Gateway**: Inbound internet access

### Pod Networking
- **AWS VPC CNI**: Each pod gets VPC IP
- **Security groups**: Pod-level security
- **Network policies**: Kubernetes network policies
- **Service mesh**: Istio or App Mesh integration
            `,
            completed: false,
            keyPoints: [
              'EKS provides managed Kubernetes control plane',
              'Native AWS service integrations',
              'Multiple worker node options',
              'VPC networking with pod-level IPs',
              'Built-in security and compliance'
            ]
          }
        ],
        quiz: {
          id: 'eks-fundamentals-quiz',
          title: 'EKS Fundamentals Quiz',
          description: 'Test your understanding of Kubernetes and EKS fundamentals',
          timeLimit: 40,
          passingScore: 70,
          questions: [
            {
              id: 'eks-q1',
              type: 'multiple-choice',
              question: 'What is the smallest deployable unit in Kubernetes?',
              options: ['Container', 'Pod', 'Deployment', 'Service'],
              correctAnswer: 'Pod',
              explanation: 'A Pod is the smallest deployable unit in Kubernetes and can contain one or more containers.',
              difficulty: 'Easy',
              topics: ['Kubernetes Concepts'],
              points: 5
            },
            {
              id: 'eks-q2',
              type: 'multiple-choice',
              question: 'Which EKS node option provides serverless container execution?',
              options: ['Managed Node Groups', 'Self-Managed Nodes', 'AWS Fargate', 'EC2 Spot Instances'],
              correctAnswer: 'AWS Fargate',
              explanation: 'AWS Fargate provides serverless container execution where you don\'t manage the underlying EC2 instances.',
              difficulty: 'Medium',
              topics: ['EKS Node Groups', 'Fargate'],
              points: 10
            },
            {
              id: 'eks-q3',
              type: 'multiple-choice',
              question: 'What networking model does EKS use for pods?',
              options: [
                'Bridge networking',
                'Each pod gets a VPC IP address',
                'Overlay networking only',
                'Host networking only'
              ],
              correctAnswer: 'Each pod gets a VPC IP address',
              explanation: 'EKS uses the AWS VPC CNI plugin, which assigns each pod a unique VPC IP address.',
              difficulty: 'Medium',
              topics: ['EKS Networking', 'VPC CNI'],
              points: 10
            }
          ],
          attempts: []
        }
      }
    ],
    labs: [
      {
        id: 'eks-cluster-setup',
        title: 'Create Your First EKS Cluster',
        description: 'Set up an EKS cluster with managed node groups',
        difficulty: 'Advanced',
        duration: '90 minutes',
        prerequisites: ['AWS CLI', 'kubectl', 'eksctl', 'Docker basics'],
        objectives: [
          'Create EKS cluster using eksctl',
          'Configure kubectl for cluster access',
          'Deploy a sample application',
          'Understand EKS networking and security'
        ],
        steps: [
          {
            id: 'eks-step1',
            title: 'Install Prerequisites',
            instruction: 'Install AWS CLI, kubectl, and eksctl tools for EKS management',
            expectedOutput: 'All required tools installed and configured'
          }
        ],
        resources: [
          {
            name: 'EKS Getting Started',
            type: 'data',
            content: 'https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html',
            description: 'Official EKS getting started guide'
          }
        ],
        validation: [
          'EKS cluster created successfully',
          'kubectl configured for cluster access',
          'Sample application deployed',
          'Worker nodes joined cluster'
        ],
        completed: false
      }
    ]
  },
  {
    id: 'cloudformation',
    name: 'AWS CloudFormation',
    category: 'DevOps & Automation',
    description: 'Infrastructure as Code service to model and set up AWS resources using templates.',
    icon: 'FileCode',
    difficulty: 'Intermediate',
    documentation: 'https://docs.aws.amazon.com/cloudformation/',
    pricing: 'https://aws.amazon.com/cloudformation/pricing/',
    useCases: [
      'Infrastructure automation',
      'Repeatable deployments',
      'Multi-environment management',
      'Disaster recovery automation',
      'Compliance and governance'
    ],
    modules: [
      {
        id: 'cloudformation-fundamentals',
        title: 'CloudFormation Fundamentals',
        description: 'Learn the basics of Infrastructure as Code with CloudFormation',
        duration: '80 minutes',
        completed: false,
        lessons: [
          {
            id: 'iac-introduction',
            title: 'Introduction to Infrastructure as Code',
            content: `
# Infrastructure as Code (IaC) with CloudFormation

Infrastructure as Code is the practice of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.

## Why Infrastructure as Code?

### Traditional Infrastructure Challenges
- **Manual configuration**: Prone to human errors and inconsistencies
- **Configuration drift**: Systems diverge from intended state over time
- **Lack of version control**: Difficult to track changes and rollback
- **Slow deployment**: Manual processes are time-consuming
- **Poor documentation**: Configuration knowledge in people's heads

### IaC Benefits
- **Consistency**: Same infrastructure every time
- **Version control**: Track changes, rollback, and collaborate
- **Automation**: Fast, reliable deployments
- **Testing**: Validate infrastructure before deployment
- **Cost control**: Tear down and rebuild environments easily

## AWS CloudFormation Overview

CloudFormation is AWS's native Infrastructure as Code service that allows you to:
- **Model**: Define AWS resources using JSON or YAML templates
- **Provision**: Create, update, and delete resources as a unit (stack)
- **Manage**: Monitor and troubleshoot stack operations

### Key Concepts

#### Templates
JSON or YAML files that describe AWS resources:
\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple EC2 instance template'

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0abcdef1234567890
      InstanceType: t3.micro
      SecurityGroupIds:
        - !Ref MySecurityGroup
      
  MySecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: 'Allow SSH and HTTP'
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
\`\`\`

#### Stacks
A collection of AWS resources managed as a single unit:
- **Create**: Deploy all resources together
- **Update**: Modify resources safely
- **Delete**: Clean up all resources automatically

#### Parameters
Allow templates to be customized at deployment time:
\`\`\`yaml
Parameters:
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues:
      - t3.micro
      - t3.small
      - t3.medium
    Description: EC2 instance type
    
  Environment:
    Type: String
    Default: dev
    AllowedValues:
      - dev
      - staging
      - prod
    Description: Environment name
\`\`\`

#### Outputs
Return values from stack that can be used by other stacks:
\`\`\`yaml
Outputs:
  InstanceId:
    Description: 'EC2 Instance ID'
    Value: !Ref MyEC2Instance
    Export:
      Name: !Sub '\${AWS::StackName}-InstanceId'
      
  SecurityGroupId:
    Description: 'Security Group ID'
    Value: !Ref MySecurityGroup
    Export:
      Name: !Sub '\${AWS::StackName}-SecurityGroupId'
\`\`\`
            `,
            completed: false,
            keyPoints: [
              'IaC eliminates manual configuration errors',
              'CloudFormation manages resources as stacks',
              'Templates define infrastructure declaratively',
              'Parameters enable template reusability',
              'Outputs allow cross-stack references'
            ]
          },
          {
            id: 'cloudformation-advanced',
            title: 'Advanced CloudFormation Concepts',
            content: `
# Advanced CloudFormation Features

## Intrinsic Functions

CloudFormation provides built-in functions to assign values to properties:

### !Ref Function
References parameters and logical resource IDs:
\`\`\`yaml
Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '\${Environment}-my-bucket-\${AWS::AccountId}'

Parameters:
  Environment:
    Type: String
    Default: dev
\`\`\`

### !GetAtt Function
Returns attribute values from resources:
\`\`\`yaml
Outputs:
  LoadBalancerDNS:
    Value: !GetAtt ApplicationLoadBalancer.DNSName  
  VPCDefaultSecurityGroup:
    Value: !GetAtt VPC.DefaultSecurityGroup
\`\`\`

### !Sub Function
Substitutes variables in strings:
\`\`\`yaml
Resources:
  LaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateName: !Sub '\${AWS::StackName}-launch-template'
      LaunchTemplateData:
        UserData:
          Fn::Base64: !Sub |
            #!/bin/bash
            echo "Environment: \${Environment}" > /tmp/env.txt
            echo "Stack: \${AWS::StackName}" >> /tmp/env.txt
\`\`\`

## Conditional Resources

Create resources based on conditions:
\`\`\`yaml
Conditions:
  CreateProdResources: !Equals [!Ref Environment, 'prod']
  CreateDevResources: !Equals [!Ref Environment, 'dev']

Resources:
  ProdDatabase:
    Type: AWS::RDS::DBInstance
    Condition: CreateProdResources
    Properties:
      Engine: mysql
      DBInstanceClass: db.r5.large
      MultiAZ: true
      
  DevDatabase:
    Type: AWS::RDS::DBInstance
    Condition: CreateDevResources
    Properties:
      Engine: mysql
      DBInstanceClass: db.t3.micro
      MultiAZ: false
\`\`\`

## Nested Stacks

Break large templates into smaller, reusable components:

### Parent Stack:
\`\`\`yaml
Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/templates/network.yaml
      Parameters:
        VpcCidr: 10.0.0.0/16
        Environment: !Ref Environment
        
  ApplicationStack:
    Type: AWS::CloudFormation::Stack
    DependsOn: NetworkStack
    Properties:
      TemplateURL: https://s3.amazonaws.com/templates/application.yaml
      Parameters:
        VpcId: !GetAtt NetworkStack.Outputs.VpcId
        SubnetIds: !GetAtt NetworkStack.Outputs.PrivateSubnetIds
\`\`\`

## Stack Sets

Deploy stacks across multiple accounts and regions:
- **Centralized management**: Deploy to multiple targets
- **Automatic updates**: Update all stacks simultaneously
- **Compliance**: Ensure consistent configurations

## Change Sets

Preview changes before applying:
\`\`\`bash
# Create change set
aws cloudformation create-change-set \\
  --stack-name my-stack \\
  --template-body file://template.yaml \\
  --change-set-name my-changes

# Review changes
aws cloudformation describe-change-set \\
  --stack-name my-stack \\
  --change-set-name my-changes

# Execute changes
aws cloudformation execute-change-set \\
  --stack-name my-stack \\
  --change-set-name my-changes
\`\`\`
            `,
            completed: false,
            keyPoints: [
              'Intrinsic functions enable dynamic template values',
              'Conditions create environment-specific resources',
              'Nested stacks enable modular architecture',
              'Stack sets manage multi-account deployments',
              'Change sets preview modifications safely'
            ]
          }
        ],
        quiz: {
          id: 'cloudformation-fundamentals-quiz',
          title: 'CloudFormation Fundamentals Quiz',
          description: 'Test your understanding of Infrastructure as Code and CloudFormation basics',
          timeLimit: 45,
          passingScore: 70,
          questions: [
            {
              id: 'cf-q1',
              type: 'multiple-choice',
              question: 'What is the main benefit of Infrastructure as Code?',
              options: [
                'Faster manual deployments',
                'Consistent, repeatable infrastructure',
                'Reduced need for documentation',
                'Elimination of all infrastructure costs'
              ],
              correctAnswer: 'Consistent, repeatable infrastructure',
              explanation: 'IaC ensures infrastructure is deployed consistently every time, reducing errors and configuration drift.',
              difficulty: 'Easy',
              topics: ['Infrastructure as Code'],
              points: 5
            },
            {
              id: 'cf-q2',
              type: 'multiple-choice',
              question: 'Which CloudFormation intrinsic function is used for string substitution?',
              options: ['!Ref', '!GetAtt', '!Sub', '!Join'],
              correctAnswer: '!Sub',
              explanation: '!Sub function performs variable substitution in strings, allowing dynamic content creation.',
              difficulty: 'Medium',
              topics: ['CloudFormation Functions'],
              points: 10
            },
            {
              id: 'cf-q3',
              type: 'multiple-choice',
              question: 'What should you use to preview changes before updating a CloudFormation stack?',
              options: ['Stack Sets', 'Change Sets', 'Nested Stacks', 'Parameters'],
              correctAnswer: 'Change Sets',
              explanation: 'Change Sets allow you to preview the changes CloudFormation will make before executing them.',
              difficulty: 'Medium',
              topics: ['Change Management'],
              points: 10
            },
            {
              id: 'cf-q4',
              type: 'multiple-choice',
              question: 'When would you use CloudFormation Stack Sets?',
              options: [
                'To create conditional resources',
                'To deploy across multiple AWS accounts and regions',
                'To reference other stack outputs',
                'To create reusable template components'
              ],
              correctAnswer: 'To deploy across multiple AWS accounts and regions',
              explanation: 'Stack Sets enable centralized deployment and management of stacks across multiple accounts and regions.',
              difficulty: 'Hard',
              topics: ['Stack Sets', 'Multi-account Management'],
              points: 15
            }
          ],
          attempts: []
        }
      }
    ],
    labs: [
      {
        id: 'cloudformation-vpc-lab',
        title: 'Build VPC Infrastructure with CloudFormation',
        description: 'Create a complete VPC infrastructure using CloudFormation templates',
        difficulty: 'Intermediate',
        duration: '60 minutes',
        prerequisites: ['AWS CLI', 'Basic networking knowledge', 'YAML/JSON understanding'],
        objectives: [
          'Create VPC with public and private subnets',
          'Configure Internet Gateway and NAT Gateway',
          'Set up routing tables and security groups',
          'Use CloudFormation parameters and outputs'
        ],
        steps: [
          {
            id: 'cf-step1',
            title: 'Create VPC Template',
            instruction: 'Create a CloudFormation template that defines a VPC with public and private subnets across two availability zones',
            expectedOutput: 'CloudFormation template file created'
          }
        ],
        resources: [
          {
            name: 'CloudFormation VPC Template',
            type: 'template',
            content: `AWSTemplateFormatVersion: '2010-09-09'
Description: 'VPC with public and private subnets'

Parameters:
  VpcCidr:
    Type: String
    Default: '10.0.0.0/16'
    Description: CIDR block for VPC

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCidr
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '\${AWS::StackName}-VPC'`,
            description: 'Basic VPC CloudFormation template'
          }
        ],
        validation: [
          'VPC created with correct CIDR block',
          'Public and private subnets in multiple AZs',
          'Internet Gateway and NAT Gateway configured',
          'Route tables properly associated'
        ],
        completed: false
      }
    ]
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    description: 'Object storage service that offers scalability, data availability, security, and performance.',
    icon: 'Database',
    difficulty: 'Beginner',
    documentation: 'https://docs.aws.amazon.com/s3/',
    pricing: 'https://aws.amazon.com/s3/pricing/',
    useCases: [
      'Static website hosting',
      'Data backup and archiving',
      'Content distribution',
      'Data analytics'
    ],
    modules: [
      {
        id: 's3-basics',
        title: 'S3 Fundamentals',
        description: 'Learn the core concepts of Amazon S3',
        duration: '40 minutes',
        completed: false,
        lessons: [
          {
            id: 's3-intro',
            title: 'Introduction to Amazon S3',
            content: `
# Amazon S3 Overview

Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.

## Key Concepts

### Buckets
- Containers for objects in S3
- Must have globally unique names
- Regional resources
- Can contain unlimited number of objects

### Objects
- Files stored in S3 buckets
- Consist of data and metadata
- Can be 0 bytes to 5TB in size
- Identified by a unique key (filename)

### Storage Classes
- **Standard**: Frequently accessed data
- **Standard-IA**: Infrequently accessed data
- **One Zone-IA**: Lower cost for infrequently accessed data
- **Glacier**: Archive storage for long-term backup
- **Glacier Deep Archive**: Lowest cost archive storage

### Security Features
- **Bucket Policies**: JSON-based access policies
- **Access Control Lists (ACLs)**: Legacy access control
- **IAM Policies**: Identity-based permissions
- **Encryption**: Server-side and client-side encryption
            `,
            completed: false,
            keyPoints: [
              'S3 stores objects in buckets',
              'Bucket names must be globally unique',
              'Multiple storage classes for different use cases',
              'Strong security and access control features'
            ]
          }
        ],
        quiz: {
          id: 's3-basics-quiz',
          title: 'S3 Fundamentals Quiz',
          description: 'Test your knowledge of S3 basics',
          timeLimit: 10,
          passingScore: 70,
          questions: [
            {
              id: 's3q1',
              type: 'multiple-choice',
              question: 'What is the maximum size of a single object in S3?',
              options: ['1 GB', '5 GB', '5 TB', 'Unlimited'],
              correctAnswer: '5 TB',
              explanation: 'The maximum size of a single object in S3 is 5 TB.',
              difficulty: 'Easy',
              topics: ['S3 Limits'],
              points: 5
            }
          ],
          attempts: []
        }
      }
    ],
    labs: []
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    category: 'Networking & Content Delivery',
    description: 'Virtual Private Cloud - Provision a logically isolated section of AWS cloud where you can launch AWS resources.',
    icon: 'Network',
    difficulty: 'Intermediate',
    documentation: 'https://docs.aws.amazon.com/vpc/',
    pricing: 'https://aws.amazon.com/vpc/pricing/',
    useCases: [
      'Secure application hosting',
      'Multi-tier web applications',
      'Hybrid cloud architectures',
      'Network segmentation',
      'Compliance requirements'
    ],
    modules: [
      {
        id: 'vpc-fundamentals',
        title: 'VPC Fundamentals and Design',
        description: 'Master VPC architecture and design patterns for secure, scalable networks',
        duration: '90 minutes',
        completed: false,
        lessons: [
          {
            id: 'vpc-concepts',
            title: 'VPC Core Concepts',
            content: `
# Amazon VPC (Virtual Private Cloud)

VPC is a virtual network dedicated to your AWS account, logically isolated from other virtual networks in AWS.

## VPC Components

### Core Components

#### 1. VPC CIDR Block
Defines the IP address range for your VPC:
\`\`\`
Example: 10.0.0.0/16
- Network: 10.0.0.0
- Broadcast: 10.0.255.255
- Usable IPs: 10.0.0.1 - 10.0.255.254
- Total addresses: 65,536
\`\`\`

**CIDR Planning Best Practices:**
- Use RFC 1918 private IP ranges:
  - 10.0.0.0/8 (10.0.0.0 - 10.255.255.255)
  - 172.16.0.0/12 (172.16.0.0 - 172.31.255.255)
  - 192.168.0.0/16 (192.168.0.0 - 192.168.255.255)
- Plan for growth and avoid overlapping with on-premises
- Use /16 for large environments, /20 for smaller ones

#### 2. Subnets
Subdivisions of VPC CIDR for different purposes:

**Public Subnet:**
- Has route to Internet Gateway
- Resources get public IP addresses
- Used for: Load balancers, NAT Gateways, Bastion hosts

**Private Subnet:**
- No direct internet access
- Route through NAT Gateway for outbound
- Used for: Application servers, databases

**Database Subnet:**
- Highly restricted private subnet
- No internet access at all
- Used for: Databases, sensitive data storage

#### 3. Internet Gateway (IGW)
Provides internet access to public subnets:
\`\`\`yaml
# CloudFormation example
InternetGateway:
  Type: AWS::EC2::InternetGateway
  Properties:
    Tags:
      - Key: Name
        Value: MyVPC-IGW

AttachGateway:
  Type: AWS::EC2::VPCGatewayAttachment
  Properties:
    VpcId: !Ref VPC
    InternetGatewayId: !Ref InternetGateway
\`\`\`

#### 4. NAT Gateway
Enables outbound internet access from private subnets:
- **Managed service**: No maintenance required
- **High availability**: Automatic failover within AZ
- **Bandwidth scaling**: Up to 45 Gbps
- **Cost consideration**: Hourly + data processing charges

#### 5. Route Tables
Control traffic routing within VPC:

**Public Route Table:**
\`\`\`
Destination         Target
10.0.0.0/16        Local
0.0.0.0/0          igw-12345678
\`\`\`

**Private Route Table:**
\`\`\`
Destination         Target
10.0.0.0/16        Local
0.0.0.0/0          nat-12345678
\`\`\`

## VPC Architecture Patterns

### 1. Single-Tier Architecture
Simple setup for development/testing:
\`\`\`
Internet Gateway
       ↓
   Public Subnet
   (Web + App + DB)
\`\`\`

### 2. Two-Tier Architecture
Separate web and database layers:
\`\`\`
Internet Gateway
       ↓
   Public Subnet     Private Subnet
   (Web Layer)  →    (Database)
\`\`\`

### 3. Three-Tier Architecture (Recommended)
Full separation of concerns:
\`\`\`
Internet Gateway
       ↓
   Public Subnet     Private Subnet    Database Subnet
   (Load Balancer) → (App Servers)  →  (Databases)
       ↓                  ↓
   NAT Gateway           (No direct
                         internet)
\`\`\`

### 4. Multi-AZ High Availability
Distribute across availability zones:
\`\`\`
        VPC (10.0.0.0/16)
           /          \\
    AZ-1 (10.0.0.0/17)  AZ-2 (10.0.128.0/17)
      /    |    \\         /     |     \\
   Public Private DB   Public Private  DB
  (.0/20) (.16/20)(.32/20)(.128/20)(.144/20)(.160/20)
\`\`\`
            `,
            completed: false,
            keyPoints: [
              'VPC provides isolated virtual network environment',
              'CIDR blocks define IP address ranges',
              'Subnets segment VPC for different purposes',
              'Internet Gateway enables public internet access',
              'NAT Gateway provides outbound access for private subnets',
              'Route tables control traffic flow',
              'Multi-AZ design ensures high availability'
            ]
          },
          {
            id: 'vpc-security',
            title: 'VPC Security: Security Groups and NACLs',
            content: `
# VPC Security Architecture

## Security Groups vs Network ACLs

### Security Groups (Instance-level Firewall)

**Characteristics:**
- **Stateful**: Return traffic automatically allowed
- **Instance-level**: Applied to ENI (Elastic Network Interface)
- **Allow rules only**: Cannot explicitly deny traffic
- **All rules evaluated**: If any rule matches, traffic is allowed

**Best Practices:**
\`\`\`yaml
# Web Server Security Group
WebServerSG:
  Type: AWS::EC2::SecurityGroup
  Properties:
    GroupDescription: 'Web server security group'
    VpcId: !Ref VPC
    SecurityGroupIngress:
      # Allow HTTP from ALB
      - IpProtocol: tcp
        FromPort: 80
        ToPort: 80
        SourceSecurityGroupId: !Ref LoadBalancerSG
      # Allow HTTPS from ALB
      - IpProtocol: tcp
        FromPort: 443
        ToPort: 443
        SourceSecurityGroupId: !Ref LoadBalancerSG
      # Allow SSH from bastion
      - IpProtocol: tcp
        FromPort: 22
        ToPort: 22
        SourceSecurityGroupId: !Ref BastionSG
    SecurityGroupEgress:
      # Allow all outbound (default)
      - IpProtocol: -1
        CidrIp: 0.0.0.0/0
\`\`\`

### Network ACLs (Subnet-level Firewall)

**Characteristics:**
- **Stateless**: Must define inbound AND outbound rules
- **Subnet-level**: Applied to all instances in subnet
- **Allow and deny rules**: Can explicitly deny traffic
- **Rules processed in order**: First match wins

**Common NACL Rules:**
\`\`\`yaml
# Public Subnet NACL
PublicNetworkAcl:
  Type: AWS::EC2::NetworkAcl
  Properties:
    VpcId: !Ref VPC

# Allow HTTP inbound
PublicNetworkAclEntryInboundHTTP:
  Type: AWS::EC2::NetworkAclEntry
  Properties:
    NetworkAclId: !Ref PublicNetworkAcl
    RuleNumber: 100
    Protocol: 6
    RuleAction: allow
    PortRange:
      From: 80
      To: 80
    CidrBlock: 0.0.0.0/0

# Allow ephemeral ports outbound
PublicNetworkAclEntryOutboundEphemeral:
  Type: AWS::EC2::NetworkAclEntry
  Properties:
    NetworkAclId: !Ref PublicNetworkAcl
    RuleNumber: 100
    Protocol: 6
    RuleAction: allow
    Egress: true
    PortRange:
      From: 1024
      To: 65535
    CidrBlock: 0.0.0.0/0
\`\`\`

## VPC Flow Logs

Monitor network traffic for security and troubleshooting:

### Flow Log Fields
\`\`\`
version account-id interface-id srcaddr dstaddr srcport dstport protocol packets bytes windowstart windowend action flowlogstatus
\`\`\`

### Example Flow Log Analysis
\`\`\`bash
# Find rejected traffic
aws logs filter-log-events \\
  --log-group-name VPCFlowLogs \\
  --filter-pattern "REJECT"

# Analyze traffic patterns
aws logs filter-log-events \\
  --log-group-name VPCFlowLogs \\
  --filter-pattern "[version, account, eni, source, destination, srcport, destport=80, protocol=6, packets, bytes, windowstart, windowend, action, flowlogstatus]"
\`\`\`

## VPC Endpoints

Secure access to AWS services without internet:

### Gateway Endpoints (S3, DynamoDB)
\`\`\`yaml
S3VPCEndpoint:
  Type: AWS::EC2::VPCEndpoint
  Properties:
    VpcId: !Ref VPC
    ServiceName: !Sub 'com.amazonaws.\${AWS::Region}.s3'
    VpcEndpointType: Gateway
    RouteTableIds:
      - !Ref PrivateRouteTable
\`\`\`

### Interface Endpoints (Other AWS services)
\`\`\`yaml
EC2VPCEndpoint:
  Type: AWS::EC2::VPCEndpoint
  Properties:
    VpcId: !Ref VPC
    ServiceName: !Sub 'com.amazonaws.\${AWS::Region}.ec2'
    VpcEndpointType: Interface
    SubnetIds:
      - !Ref PrivateSubnet1
      - !Ref PrivateSubnet2
    SecurityGroupIds:
      - !Ref VPCEndpointSG
\`\`\`

## Network Segmentation Strategies

### Micro-segmentation with Security Groups
\`\`\`
Database Tier:
├── RDS Security Group (port 3306 from App tier only)
├── Redis Security Group (port 6379 from App tier only)
└── Backup Security Group (port 443 to S3 endpoint only)

Application Tier:
├── Web Security Group (port 80/443 from ALB only)
├── API Security Group (port 8080 from ALB only)
└── Worker Security Group (no inbound, outbound to queues)

Load Balancer Tier:
├── Public ALB (port 80/443 from internet)
└── Internal ALB (port 80 from VPC only)
\`\`\`

### Network Zoning with Subnets
\`\`\`
DMZ Zone (Public Subnets):
├── Web Application Firewall
├── Load Balancers
└── NAT Gateways

Application Zone (Private Subnets):
├── Web Servers
├── Application Servers
└── API Services

Data Zone (Database Subnets):
├── RDS Instances
├── ElastiCache Clusters
└── Redshift Clusters

Management Zone:
├── Bastion Hosts
├── Monitoring Services
└── Backup Services
\`\`\`
            `,
            completed: false,
            keyPoints: [
              'Security Groups are stateful, instance-level firewalls',
              'NACLs are stateless, subnet-level firewalls',
              'VPC Flow Logs provide network traffic visibility',
              'VPC Endpoints enable private AWS service access',
              'Micro-segmentation improves security posture',
              'Network zoning with subnets creates defense in depth'
            ]
          }
        ],
        quiz: {
          id: 'vpc-fundamentals-quiz',
          title: 'VPC Fundamentals Quiz',
          description: 'Test your understanding of VPC concepts, design, and security',
          timeLimit: 50,
          passingScore: 75,
          questions: [
            {
              id: 'vpc-q1',
              type: 'multiple-choice',
              question: 'What is the main difference between Security Groups and Network ACLs?',
              options: [
                'Security Groups are subnet-level, NACLs are instance-level',
                'Security Groups are stateful, NACLs are stateless',
                'Security Groups allow deny rules, NACLs only allow rules',
                'Security Groups are free, NACLs have charges'
              ],
              correctAnswer: 'Security Groups are stateful, NACLs are stateless',
              explanation: 'Security Groups are stateful (return traffic is automatically allowed), while NACLs are stateless (you must define both inbound and outbound rules).',
              difficulty: 'Medium',
              topics: ['VPC Security', 'Security Groups', 'NACLs'],
              points: 10
            },
            {
              id: 'vpc-q2',
              type: 'multiple-choice',
              question: 'Which component provides internet access to private subnets?',
              options: ['Internet Gateway', 'NAT Gateway', 'VPC Endpoint', 'Transit Gateway'],
              correctAnswer: 'NAT Gateway',
              explanation: 'NAT Gateway allows instances in private subnets to access the internet for outbound traffic while preventing inbound internet access.',
              difficulty: 'Easy',
              topics: ['VPC Components', 'NAT Gateway'],
              points: 5
            },
            {
              id: 'vpc-q3',
              type: 'multiple-choice',
              question: 'What is the recommended architecture for production web applications?',
              options: [
                'Single public subnet with all resources',
                'Public subnet for web, private for database',
                'Three-tier: public (LB), private (app), database (DB)',
                'All resources in private subnets only'
              ],
              correctAnswer: 'Three-tier: public (LB), private (app), database (DB)',
              explanation: 'Three-tier architecture provides the best security by separating load balancers (public), application servers (private), and databases (database subnets).',
              difficulty: 'Medium',
              topics: ['VPC Architecture', 'Best Practices'],
              points: 10
            },
            {
              id: 'vpc-q4',
              type: 'multiple-choice',
              question: 'How can you provide secure access to S3 from private subnets without internet access?',
              options: [
                'Use NAT Gateway',
                'Create VPC Endpoint for S3',
                'Use Internet Gateway',
                'Configure Security Group rules'
              ],
              correctAnswer: 'Create VPC Endpoint for S3',
              explanation: 'VPC Endpoints for S3 (Gateway Endpoint) allow private subnet resources to access S3 without going through the internet.',
              difficulty: 'Medium',
              topics: ['VPC Endpoints', 'S3 Access'],
              points: 10
            }
          ],
          attempts: []
        }
      }
    ],
    labs: [
      {
        id: 'vpc-three-tier-lab',
        title: 'Build Three-Tier VPC Architecture',
        description: 'Design and implement a production-ready three-tier VPC with high availability',
        difficulty: 'Advanced',
        duration: '120 minutes',
        prerequisites: ['VPC concepts', 'CloudFormation basics', 'AWS CLI'],
        objectives: [
          'Create VPC with public, private, and database subnets',
          'Configure Internet Gateway and NAT Gateways',
          'Set up Security Groups with least privilege',
          'Implement VPC Flow Logs and monitoring',
          'Test connectivity and security'
        ],
        steps: [
          {
            id: 'vpc-step1',
            title: 'Design VPC Architecture',
            instruction: 'Plan VPC CIDR and subnet allocation for three-tier architecture across two availability zones',
            expectedOutput: 'VPC design document with IP allocation'
          }
        ],
        resources: [
          {
            name: 'Three-Tier VPC Template',
            type: 'template',
            content: `# VPC CIDR Planning
# VPC: 10.0.0.0/16 (65,536 IPs)
# AZ1: 10.0.0.0/17 (32,768 IPs)
# AZ2: 10.0.128.0/17 (32,768 IPs)
#
# Per AZ breakdown:
# Public:    10.0.0.0/20    (4,096 IPs)
# Private:   10.0.16.0/20   (4,096 IPs)  
# Database:  10.0.32.0/20   (4,096 IPs)
# Reserved:  10.0.48.0/20   (4,096 IPs)`,
            description: 'IP allocation planning for three-tier VPC'
          }
        ],
        validation: [
          'VPC created with correct CIDR allocation',
          'All subnets properly configured across AZs',
          'Security Groups follow least privilege principle',
          'Internet and NAT Gateways working correctly',
          'VPC Flow Logs capturing traffic'
        ],
        completed: false
      }
    ]
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    description: 'Object storage service that offers scalability, data availability, security, and performance.',
    icon: 'Database',
    difficulty: 'Beginner',
    documentation: 'https://docs.aws.amazon.com/s3/',
    pricing: 'https://aws.amazon.com/s3/pricing/',
    useCases: [
      'Static website hosting',
      'Data backup and archiving',
      'Content distribution',
      'Data analytics'
    ],
    modules: [
      {
        id: 's3-basics',
        title: 'S3 Fundamentals',
        description: 'Learn the core concepts of Amazon S3',
        duration: '40 minutes',
        completed: false,
        lessons: [
          {
            id: 's3-intro',
            title: 'Introduction to Amazon S3',
            content: `
# Amazon S3 Overview

Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance.

## Key Concepts

### Buckets
- Containers for objects in S3
- Must have globally unique names
- Regional resources
- Can contain unlimited number of objects

### Objects
- Files stored in S3 buckets
- Consist of data and metadata
- Can be 0 bytes to 5TB in size
- Identified by a unique key (filename)

### Storage Classes
- **Standard**: Frequently accessed data
- **Standard-IA**: Infrequently accessed data
- **One Zone-IA**: Lower cost for infrequently accessed data
- **Glacier**: Archive storage for long-term backup
- **Glacier Deep Archive**: Lowest cost archive storage

### Security Features
- **Bucket Policies**: JSON-based access policies
- **Access Control Lists (ACLs)**: Legacy access control
- **IAM Policies**: Identity-based permissions
- **Encryption**: Server-side and client-side encryption
            `,
            completed: false,
            keyPoints: [
              'S3 stores objects in buckets',
              'Bucket names must be globally unique',
              'Multiple storage classes for different use cases',
              'Strong security and access control features'
            ]
          }
        ],
        quiz: {
          id: 's3-basics-quiz',
          title: 'S3 Fundamentals Quiz',
          description: 'Test your knowledge of S3 basics',
          timeLimit: 10,
          passingScore: 70,
          questions: [
            {
              id: 's3q1',
              type: 'multiple-choice',
              question: 'What is the maximum size of a single object in S3?',
              options: ['1 GB', '5 GB', '5 TB', 'Unlimited'],
              correctAnswer: '5 TB',
              explanation: 'The maximum size of a single object in S3 is 5 TB.',
              difficulty: 'Easy',
              topics: ['S3 Limits'],
              points: 5
            }
          ],
          attempts: []
        }
      }
    ],
    labs: []
  }
];

export const certificationPaths: CertificationPath[] = [
  {
    id: 'aws-cloud-practitioner',
    name: 'AWS Certified Cloud Practitioner',
    level: 'Foundational',
    examCode: 'CLF-C01',
    description: 'Foundational understanding of AWS cloud services and basic AWS architecture principles',
    prerequisites: ['6 months of AWS cloud experience', 'Basic understanding of IT services'],
    modules: ['ec2-basics', 's3-basics'],
    estimatedStudyTime: '30-40 hours',
    examDetails: {
      duration: '90 minutes',
      questionsCount: 65,
      passingScore: 70,
      cost: '$100 USD',
      languages: ['English', 'Japanese', 'Korean', 'Simplified Chinese']
    },
    practiceTests: [
      {
        id: 'clf-practice-1',
        name: 'Cloud Practitioner Practice Test 1',
        description: 'Practice test covering cloud concepts and AWS core services',
        questionsCount: 20,
        timeLimit: 30,
        difficulty: 'Practice',
        questions: [
          {
            id: 'clf1',
            type: 'multiple-choice',
            question: 'Which AWS service is primarily used for content delivery?',
            options: ['CloudFront', 'Route 53', 'Direct Connect', 'VPC'],
            correctAnswer: 'CloudFront',
            explanation: 'Amazon CloudFront is a content delivery network (CDN) service that delivers data, videos, applications, and APIs to customers globally.',
            difficulty: 'Easy',
            topics: ['CloudFront', 'Content Delivery'],
            points: 5
          },
          {
            id: 'clf2',
            type: 'multiple-choice',
            question: 'What is the AWS shared responsibility model?',
            options: [
              'AWS is responsible for everything',
              'Customer is responsible for everything', 
              'AWS secures the cloud infrastructure, customer secures their data and applications',
              'Both share equal responsibility for all aspects'
            ],
            correctAnswer: 'AWS secures the cloud infrastructure, customer secures their data and applications',
            explanation: 'In the shared responsibility model, AWS is responsible for "security OF the cloud" while customers are responsible for "security IN the cloud".',
            difficulty: 'Medium',
            topics: ['Security', 'Shared Responsibility'],
            points: 10
          }
        ],
        attempts: []
      }
    ]
  },
  {
    id: 'aws-solutions-architect-associate',
    name: 'AWS Certified Solutions Architect - Associate',
    level: 'Associate',
    examCode: 'SAA-C03',
    description: 'Demonstrates knowledge of designing distributed systems on AWS',
    prerequisites: ['AWS Cloud Practitioner certification (recommended)', '1 year of hands-on AWS experience'],
    modules: ['ec2-basics', 's3-basics'],
    estimatedStudyTime: '80-120 hours',
    examDetails: {
      duration: '130 minutes',
      questionsCount: 65,
      passingScore: 72,
      cost: '$150 USD',
      languages: ['English', 'Japanese', 'Korean', 'Simplified Chinese']
    },
    practiceTests: [
      {
        id: 'saa-practice-1',
        name: 'SAA Practice Test 1',
        description: 'Practice test covering EC2, S3, VPC, and IAM fundamentals',
        questionsCount: 30,
        timeLimit: 60,
        difficulty: 'Practice',
        questions: [
          {
            id: 'saa1',
            type: 'multiple-choice',
            question: 'You need to launch multiple EC2 instances across multiple Availability Zones. What service should you use to automatically distribute instances?',
            options: [
              'Auto Scaling Group',
              'Elastic Load Balancer',
              'CloudFormation',
              'Systems Manager'
            ],
            correctAnswer: 'Auto Scaling Group',
            explanation: 'Auto Scaling Groups can launch instances across multiple AZs and automatically replace unhealthy instances.',
            difficulty: 'Medium',
            topics: ['EC2', 'Auto Scaling', 'High Availability'],
            points: 10
          },
          {
            id: 'saa2',
            type: 'multiple-choice',
            question: 'Which S3 storage class is most cost-effective for data that is accessed infrequently but requires rapid access when needed?',
            options: [
              'S3 Standard',
              'S3 Standard-IA',
              'S3 Glacier',
              'S3 Glacier Deep Archive'
            ],
            correctAnswer: 'S3 Standard-IA',
            explanation: 'S3 Standard-IA (Infrequent Access) is designed for data that is accessed less frequently but requires rapid access when needed.',
            difficulty: 'Easy',
            topics: ['S3', 'Storage Classes', 'Cost Optimization'],
            points: 5
          },
          {
            id: 'saa3',
            type: 'multiple-select',
            question: 'Which AWS services can be used to implement a highly available web application? (Select TWO)',
            options: [
              'Application Load Balancer',
              'Auto Scaling Group',
              'S3',
              'CloudWatch',
              'Route 53'
            ],
            correctAnswer: ['Application Load Balancer', 'Auto Scaling Group'],
            explanation: 'ALB distributes traffic across multiple instances, and Auto Scaling Group ensures instances are replaced if they fail.',
            difficulty: 'Hard',
            topics: ['Load Balancing', 'Auto Scaling', 'High Availability'],
            points: 15
          }
        ],
        attempts: []
      },
      {
        id: 'saa-mock-exam',
        name: 'SAA Mock Exam',
        description: 'Full-length mock exam simulating the real SAA-C03 exam',
        questionsCount: 65,
        timeLimit: 130,
        difficulty: 'Mock Exam',
        questions: [
          {
            id: 'saa-mock1',
            type: 'multiple-choice',
            question: 'A company wants to migrate their on-premises database to AWS. They need minimal downtime and want to keep their existing database engine. What is the best migration strategy?',
            options: [
              'Use AWS Database Migration Service (DMS)',
              'Create manual backups and restore to RDS',
              'Use AWS DataSync',
              'Export data to S3 and import to RDS'
            ],
            correctAnswer: 'Use AWS Database Migration Service (DMS)',
            explanation: 'DMS provides minimal downtime migration and supports homogeneous migrations (same database engine).',
            difficulty: 'Medium',
            topics: ['Database Migration', 'DMS', 'RDS'],
            points: 10
          },
          {
            id: 'saa-mock2',
            type: 'multiple-choice',
            question: 'What is the most cost-effective way to provide secure access to an S3 bucket for users from a mobile application?',
            options: [
              'Create IAM users for each mobile user',
              'Use IAM roles with AWS STS AssumeRole',
              'Store AWS access keys in the mobile app',
              'Use S3 bucket policies only'
            ],
            correctAnswer: 'Use IAM roles with AWS STS AssumeRole',
            explanation: 'IAM roles with STS provide temporary credentials, which is the most secure and scalable approach for mobile applications.',
            difficulty: 'Hard',
            topics: ['IAM', 'STS', 'Security', 'Mobile Applications'],
            points: 15
          }
        ],
        attempts: []
      }
    ]
  }
];
