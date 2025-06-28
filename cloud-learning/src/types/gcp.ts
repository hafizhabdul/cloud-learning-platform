export interface GCPService {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  documentation: string;
  pricing: string;
  useCases: string[];
  modules: GCPModule[];
  labs: GCPLab[];
}

export interface GCPModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  score?: number;
  lessons: GCPLesson[];
  quiz: GCPQuiz;
}

export interface GCPLesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  type: 'theory' | 'demo' | 'hands-on';
}

export interface GCPQuiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: GCPQuestion[];
  attempts: GCPQuizAttempt[];
}

export interface GCPQuestion {
  id: string;
  type: 'multiple-choice' | 'multiple-select' | 'scenario' | 'case-study';
  question: string;
  options: GCPQuestionOption[];
  correctAnswers: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
}

export interface GCPQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface GCPQuizAttempt {
  id: string;
  date: Date;
  score: number;
  timeSpent: number;
  answers: Record<string, string[]>;
}

export interface GCPLab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  prerequisites: string[];
  objectives: string[];
  steps: GCPLabStep[];
  resources: GCPLabResource[];
  completed: boolean;
}

export interface GCPLabStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  code?: string;
  expectedResult?: string;
  hints?: string[];
  validation?: string;
}

export interface GCPLabResource {
  name: string;
  type: 'template' | 'script' | 'documentation' | 'tool';
  url: string;
  description: string;
}

export interface GCPCertificationPath {
  id: string;
  name: string;
  description: string;
  level: 'Associate' | 'Professional' | 'User';
  duration: string;
  prerequisites: string[];
  skills: string[];
  examDetails: {
    code: string;
    name: string;
    duration: number;
    questionCount: number;
    passingScore: number;
    cost: string;
    languages: string[];
  };
  studyGuide: GCPStudySection[];
  practiceTests: GCPPracticeTest[];
  recommendedExperience: string;
}

export interface GCPStudySection {
  id: string;
  title: string;
  weight: number;
  topics: string[];
  resources: string[];
}

export interface GCPPracticeTest {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  difficulty: 'Practice' | 'Mock Exam';
  questions: GCPQuestion[];
  attempts: GCPQuizAttempt[];
}
