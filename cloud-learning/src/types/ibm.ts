// IBM Cloud Types
export interface IBMService {
  id: string;
  name: string;
  category: 'compute' | 'storage' | 'networking' | 'database' | 'analytics' | 'ai' | 'security' | 'integration' | 'devops';
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

export interface IBMLearningPath {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  prerequisites: string[];
  services: string[];
  lessons: IBMLesson[];
}

export interface IBMLesson {
  id: string;
  title: string;
  type: 'theory' | 'hands-on' | 'quiz' | 'case-study';
  duration: string;
  content: string;
  objectives: string[];
  resources?: string[];
  labInstructions?: string[];
  quiz?: IBMQuiz;
}

export interface IBMQuiz {
  id: string;
  title: string;
  questions: IBMQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface IBMQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false';
  options: string[];
  correctAnswers: number[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface IBMCertification {
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

export interface IBMPracticeLab {
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
