// Architecture patterns and case study types

export interface ArchitecturePattern {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  components: ArchitectureComponent[];
  benefits: string[];
  considerations: string[];
  useCases: string[];
  awsServices: string[];
  estimatedCost: string;
  designPrinciples: string[];
}

export interface ArchitectureComponent {
  name: string;
  service: string;
  purpose: string;
  tier: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  scenario: string;
  businessRequirements: string[];
  technicalChallenges: string[];
  proposedSolution: SolutionArchitecture;
  migrationStrategy: MigrationPhase[];
  expectedBenefits: string[];
  riskMitigation: RiskMitigation[];
  kpis: string[];
  lessonsLearned: string[];
}

export interface SolutionArchitecture {
  architecture: string;
  cloudProvider: string;
  components: SolutionComponent[];
  dataFlow: string[];
}

export interface SolutionComponent {
  component: string;
  service: string;
  description: string;
}

export interface MigrationPhase {
  phase: string;
  duration: string;
  activities: string[];
}

export interface RiskMitigation {
  risk: string;
  mitigation: string;
}

export interface ArchitectureDecision {
  id: string;
  title: string;
  status: 'Proposed' | 'Accepted' | 'Rejected' | 'Superseded';
  context: string;
  decision: string;
  consequences: string[];
  alternatives: string[];
  date: string;
}

export interface CostAnalysis {
  service: string;
  monthlyEstimate: number;
  usage: string;
  optimization: string[];
}

export interface SecurityAssessment {
  component: string;
  threats: string[];
  mitigations: string[];
  complianceFrameworks: string[];
}

export interface PerformanceRequirement {
  metric: string;
  target: string;
  measurement: string;
  optimization: string[];
}
