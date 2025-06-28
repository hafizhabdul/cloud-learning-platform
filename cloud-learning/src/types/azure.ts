export interface AzureService {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  documentation: string;
  pricing: string;
  useCases: string[];
  modules: AzureModule[];
  labs: AzureLab[];
}

export interface AzureModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  score?: number;
  lessons: AzureLesson[];
  quiz: AzureQuiz;
}

export interface AzureLesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  type: 'theory' | 'demo' | 'hands-on';
}

export interface AzureQuiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  questions: AzureQuestion[];
  attempts: AzureQuizAttempt[];
}

export interface AzureQuestion {
  id: string;
  type: 'multiple-choice' | 'multiple-select' | 'scenario' | 'drag-drop';
  question: string;
  options: AzureQuestionOption[];
  correctAnswers: string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
}

export interface AzureQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface AzureQuizAttempt {
  id: string;
  date: Date;
  score: number;
  timeSpent: number;
  answers: Record<string, string[]>;
}

export interface AzureLab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  prerequisites: string[];
  objectives: string[];
  steps: AzureLabStep[];
  resources: AzureLabResource[];
  completed: boolean;
}

export interface AzureLabStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  code?: string;
  expectedResult?: string;
  hints?: string[];
  validation?: string;
}

export interface AzureLabResource {
  name: string;
  type: 'template' | 'script' | 'documentation' | 'tool';
  url: string;
  description: string;
}

export interface AzureCertificationPath {
  id: string;
  name: string;
  description: string;
  level: 'Fundamentals' | 'Associate' | 'Expert' | 'Specialty';
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
  studyGuide: AzureStudySection[];
  practiceTests: AzurePracticeTest[];
  recommendedExperience: string;
}

export interface AzureStudySection {
  id: string;
  title: string;
  weight: number;
  topics: string[];
  resources: string[];
}

export interface AzurePracticeTest {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  difficulty: 'Practice' | 'Mock Exam';
  questions: AzureQuestion[];
  attempts: AzureQuizAttempt[];
}
