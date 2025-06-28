// Alibaba Cloud Types
export interface AlibabaService {
  id: string;
  name: string;
  category: 'compute' | 'storage' | 'networking' | 'database' | 'analytics' | 'ai' | 'security' | 'cdn' | 'middleware';
  description: string;
  icon: string;
  features: string[];
  useCases: string[];
  pricing?: {
    model: string;
    startingPrice: string;
    unit: string;
  };
  documentation?: string;
  tutorials?: string[];
}

export interface AlibabaLearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  prerequisites: string[];
  services: string[];
  lessons: AlibabaLesson[];
}

export interface AlibabaLesson {
  id: string;
  title: string;
  type: 'theory' | 'hands-on' | 'quiz' | 'case-study';
  duration: string;
  content: string;
  objectives: string[];
  resources?: string[];
  labInstructions?: string[];
  quiz?: AlibabaQuiz;
}

export interface AlibabaQuiz {
  id: string;
  title: string;
  questions: AlibabaQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface AlibabaQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false';
  options: string[];
  correctAnswers: number[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AlibabaCertification {
  id: string;
  name: string;
  level: 'associate' | 'professional' | 'expert';
  description: string;
  prerequisites: string[];
  examDetails: {
    duration: string;
    questions: number;
    passingScore: string;
    cost: string;
  };
  domains: {
    name: string;
    weight: string;
    topics: string[];
  }[];
  preparationResources: string[];
}

export interface AlibabaPracticeLab {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  services: string[];
  objectives: string[];
  steps: {
    title: string;
    description: string;
    instructions: string[];
    verification?: string;
  }[];
  cleanup?: string[];
}
