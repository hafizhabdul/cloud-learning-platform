// AWS Service Data and Learning Content
export interface AWSService {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: AWSModule[];
  labs: AWSLab[];
  documentation: string;
  pricing: string;
  useCases: string[];
}

export interface AWSModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: AWSLesson[];
  quiz: Quiz;
  completed: boolean;
  score?: number;
}

export interface AWSLesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  diagrams?: string[];
  codeExamples?: CodeExample[];
  keyPoints: string[];
  completed: boolean;
}

export interface AWSLab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  prerequisites: string[];
  objectives: string[];
  steps: LabStep[];
  resources: LabResource[];
  validation: string[];
  completed: boolean;
}

export interface LabStep {
  id: string;
  title: string;
  instruction: string;
  command?: string;
  expectedOutput?: string;
  screenshot?: string;
  tips?: string[];
}

export interface LabResource {
  name: string;
  type: 'template' | 'script' | 'configuration' | 'data';
  content: string;
  description: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  questions: Question[];
  attempts: QuizAttempt[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  points: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  answers: { [questionId: string]: string | string[] };
  score?: number;
  passed?: boolean;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  runnable: boolean;
}

export interface CertificationPath {
  id: string;
  name: string;
  level: 'Foundational' | 'Associate' | 'Professional' | 'Specialty';
  examCode: string;
  description: string;
  prerequisites: string[];
  modules: string[]; // module IDs
  practiceTests: PracticeTest[];
  estimatedStudyTime: string;
  examDetails: {
    duration: string;
    questionsCount: number;
    passingScore: number;
    cost: string;
    languages: string[];
  };
}

export interface PracticeTest {
  id: string;
  name: string;
  description: string;
  questionsCount: number;
  timeLimit: number;
  difficulty: 'Practice' | 'Mock Exam';
  questions: Question[];
  attempts: QuizAttempt[];
}
