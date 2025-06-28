export interface CloudProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  learningPaths: LearningPath[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  modules: Module[];
  prerequisites?: string[];
  certification?: string;
  progress?: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'hands-on' | 'assessment' | 'project';
  duration: string;
  content: ModuleContent;
  completed?: boolean;
  score?: number;
}

export interface ModuleContent {
  introduction?: string;
  theory?: TheoryContent;
  practicalLab?: PracticalLab;
  assessment?: Assessment;
  resources?: Resource[];
}

export interface TheoryContent {
  sections: Section[];
  diagrams?: Diagram[];
  codeExamples?: CodeExample[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  subSections?: SubSection[];
}

export interface SubSection {
  id: string;
  title: string;
  content: string;
}

export interface PracticalLab {
  id: string;
  title: string;
  objective: string;
  instructions: LabStep[];
  resources: LabResource[];
  validation: ValidationCriteria[];
}

export interface LabStep {
  id: string;
  title: string;
  description: string;
  code?: string;
  expectedOutput?: string;
  hints?: string[];
}

export interface LabResource {
  name: string;
  type: 'template' | 'data' | 'config' | 'documentation';
  url: string;
  description: string;
}

export interface ValidationCriteria {
  id: string;
  description: string;
  checkCommand?: string;
  expectedResult?: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'practical' | 'scenario';
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Diagram {
  id: string;
  title: string;
  type: 'architecture' | 'flow' | 'network' | 'service';
  imageUrl: string;
  description: string;
  interactiveElements?: InteractiveElement[];
}

export interface InteractiveElement {
  id: string;
  type: 'hotspot' | 'annotation' | 'link';
  coordinates: { x: number; y: number };
  content: string;
  action?: string;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  runnable?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'documentation' | 'video' | 'article' | 'tool' | 'cheatsheet';
  url: string;
  description: string;
  duration?: string;
}

export interface UserProgress {
  userId: string;
  completedModules: string[];
  scores: Record<string, number>;
  certifications: Certification[];
  totalHours: number;
  streakDays: number;
  lastActivity: Date;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  earnedDate: Date;
  expiryDate?: Date;
  score?: number;
  badgeUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  criteria: string;
  earnedDate?: Date;
  rarity: 'common' | 'rare' | 'legendary';
}

// Re-export all types
export * from './aws';
export * from './azure';
export * from './gcp';
export * from './oci';
export * from './ibm';
export * from './alibaba';
export * from './architecture';
