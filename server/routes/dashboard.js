const express = require('express');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// Dashboard stats endpoint
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const user = req.user;
    
    // Mock data for now - in real app, this would come from database
    const stats = {
      completedCourses: 12,
      totalCourses: 45,
      certifications: 3,
      studyTimeHours: 127,
      currentStreak: 5,
      achievements: [
        { id: 1, name: 'AWS Beginner', icon: '🏆', earnedAt: '2024-06-20' },
        { id: 2, name: 'Azure Explorer', icon: '🌟', earnedAt: '2024-06-15' },
        { id: 3, name: 'GCP Starter', icon: '🚀', earnedAt: '2024-06-10' }
      ],
      recentActivity: [
        { 
          id: 1, 
          type: 'course_completed', 
          title: 'AWS Lambda Fundamentals', 
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        },
        { 
          id: 2, 
          type: 'quiz_passed', 
          title: 'Azure Storage Quiz', 
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
        },
        { 
          id: 3, 
          type: 'certification_earned', 
          title: 'GCP Associate', 
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
        }
      ],
      learningPaths: [
        { 
          id: 1, 
          name: 'AWS Solutions Architect', 
          progress: 65, 
          totalCourses: 15, 
          completedCourses: 10 
        },
        { 
          id: 2, 
          name: 'Azure Developer', 
          progress: 30, 
          totalCourses: 12, 
          completedCourses: 4 
        },
        { 
          id: 3, 
          name: 'GCP Data Engineer', 
          progress: 80, 
          totalCourses: 20, 
          completedCourses: 16 
        }
      ]
    };

    res.json({
      success: true,
      data: stats,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider
      }
    });
  } catch (error) {
    next(error);
  }
});

// User progress endpoint
router.get('/progress', authenticate, async (req, res, next) => {
  try {
    const user = req.user;
    
    // Mock progress data
    const progress = {
      overallProgress: 45, // percentage
      coursesCompleted: 12,
      totalCourses: 27,
      skillsProgress: {
        aws: { level: 'Intermediate', progress: 65, courses: 8 },
        azure: { level: 'Beginner', progress: 30, courses: 3 },
        gcp: { level: 'Advanced', progress: 80, courses: 12 },
        ibm: { level: 'Beginner', progress: 15, courses: 1 },
        oci: { level: 'Beginner', progress: 10, courses: 1 },
        alibaba: { level: 'Not Started', progress: 0, courses: 0 }
      },
      weeklyProgress: [
        { week: 'Week 1', completed: 3 },
        { week: 'Week 2', completed: 5 },
        { week: 'Week 3', completed: 2 },
        { week: 'Week 4', completed: 4 }
      ],
      nextMilestones: [
        { 
          title: 'Complete AWS Lambda Course', 
          description: 'Finish the serverless computing fundamentals',
          dueDate: '2024-07-15',
          progress: 75
        },
        { 
          title: 'Azure Certification Exam', 
          description: 'Schedule and take AZ-900 exam',
          dueDate: '2024-07-30',
          progress: 40
        }
      ]
    };

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
