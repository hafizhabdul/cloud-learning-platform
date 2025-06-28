import { useState, useEffect } from 'react';
import { dashboardApi } from '../services/apiClient';

interface DashboardStats {
  completedCourses: number;
  totalCourses: number;
  certifications: number;
  studyTimeHours: number;
  currentStreak: number;
  achievements: Array<{
    id: number;
    name: string;
    icon: string;
    earnedAt: string;
  }>;
  recentActivity: Array<{
    id: number;
    type: string;
    title: string;
    timestamp: Date;
  }>;
  learningPaths: Array<{
    id: number;
    name: string;
    progress: number;
    totalCourses: number;
    completedCourses: number;
  }>;
}

interface UserProgress {
  overallProgress: number;
  coursesCompleted: number;
  totalCourses: number;
  skillsProgress: {
    [key: string]: {
      level: string;
      progress: number;
      courses: number;
    };
  };
  weeklyProgress: Array<{
    week: string;
    completed: number;
  }>;
  nextMilestones: Array<{
    title: string;
    description: string;
    dueDate: string;
    progress: number;
  }>;
}

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard stats
      const statsResponse = await dashboardApi.getStats();
      
      if (statsResponse && statsResponse.success) {
        setStats(statsResponse.data as DashboardStats);
      }

      // Fetch user progress
      const progressResponse = await dashboardApi.getProgress();

      if (progressResponse && progressResponse.success) {
        setProgress(progressResponse.data as UserProgress);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    stats,
    progress,
    loading,
    error,
    refetch: fetchDashboardData
  };
};
