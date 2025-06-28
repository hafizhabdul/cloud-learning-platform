// Oracle Cloud Infrastructure (OCI) Types
export interface OCIService {
  id: string;
  name: string;
  category: 'compute' | 'storage' | 'networking' | 'database' | 'analytics' | 'ai' | 'security' | 'management';
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

export interface OCILearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  prerequisites: string[];
  services: string[];
  lessons: OCILesson[];
}

export interface OCILesson {
  id: string;
  title: string;
  type: 'theory' | 'hands-on' | 'quiz' | 'case-study';
  duration: string;
  content: string;
  objectives: string[];
  resources?: string[];
  labInstructions?: string[];
  quiz?: OCIQuiz;
}

export interface OCIQuiz {
  id: string;
  title: string;
  questions: OCIQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface OCIQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false';
  options: string[];
  correctAnswers: number[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface OCICertification {
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

export interface OCIPracticeLab {
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
