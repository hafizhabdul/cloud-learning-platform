# AWS Cloud Solutions Architect Learning Platform

Platform pembelajaran komprehensif untuk mempersiapkan sertifikasi AWS dan cloud provider lainnya. Aplikasi ini menyediakan materi pembelajaran interaktif, practice labs, dan sistem quiz/latihan soal untuk persiapan sertifikasi resmi.

## 🎯 Fitur Utama

### ✅ Sudah Tersedia
- **🏠 Dashboard** - Overview progress pembelajaran dan statistik
- **📚 AWS Learning Hub** - Koleksi lengkap AWS services dengan learning modules
- **🎓 AWS Certifications** - Preparation path untuk sertifikasi AWS official
- **📝 Interactive Quiz System** - Quiz dengan timer, scoring, dan explanation
- **🔬 Practice Labs** - Hands-on labs dengan step-by-step instructions
- **📊 Progress Tracking** - Track completion dan scores untuk setiap module
- **🎨 Modern UI/UX** - Interface responsive dengan Tailwind CSS

### 🔄 AWS Services (Ready to Learn)
- **Amazon EC2** - Virtual servers dengan learning modules dan labs
- **Amazon S3** - Object storage dengan practice scenarios
- **Certification Paths** - AWS Cloud Practitioner & Solutions Architect Associate

### 🚀 Sistem Quiz & Assessment
- **Module Quizzes** - Quiz untuk setiap learning module
- **Practice Tests** - Simulasi exam untuk preparation sertifikasi
- **Interactive Features**:
  - Timer dengan countdown
  - Multiple choice & multiple select questions
  - Real-time scoring dengan passing threshold
  - Detailed explanations untuk setiap soal
  - Review hasil dengan breakdown per question
  - Retry functionality

### 🧪 Practice Labs
- **Step-by-step Instructions** - Guided hands-on exercises
- **Resource Management** - Template, scripts, dan configurations
- **Progress Tracking** - Mark completion untuk setiap step
- **Validation Checklist** - Verify hasil lab work
- **Interactive Elements**:
  - Copy-to-clipboard untuk commands
  - Expected output examples
  - Tips dan troubleshooting

## 🏗️ Teknologi

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Context + Hooks
- **Build Tool**: Vite

## 🚀 Quick Start

```bash
# Clone repository
git clone [repository-url]
cd "App for cloud architect solutions learning"

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:5173
```

## 📱 Cara Menggunakan

### 1. Dashboard
- Lihat overview progress pembelajaran
- Akses quick stats dan recent activities
- Navigate ke berbagai sections

### 2. AWS Learning Hub
- Browse AWS services (EC2, S3, dll)
- Click service card untuk detailed view
- Access learning modules dan practice labs

### 3. Learning Modules
- Read content dengan key points
- Watch videos (jika tersedia)
- Complete lessons secara berurutan
- Take quiz setelah menyelesaikan module

### 4. Quiz System
- **Start Quiz**: Read instructions dan exam details
- **Take Quiz**: Answer questions dengan time limit
- **Navigation**: Move between questions, mark untuk review
- **Submit**: Review answers sebelum final submission
- **Results**: View score, explanations, dan detailed breakdown

### 5. Practice Labs
- **Prerequisites**: Check requirements sebelum mulai
- **Step-by-step**: Follow guided instructions
- **Commands**: Copy commands to clipboard
- **Validation**: Use checklist untuk verify results
- **Completion**: Mark steps complete dan finish lab

### 6. Certifications
- Browse available certification paths
- View exam details (duration, cost, passing score)
- Access practice tests
- Track progress dan scores

## 📊 Data Structure

### AWS Services
```typescript
interface AWSService {
  id: string;
  name: string;
  category: string;
  description: string;
  modules: AWSModule[];
  labs: AWSLab[];
  // ... more properties
}
```

### Learning Modules
```typescript
interface AWSModule {
  id: string;
  title: string;
  lessons: AWSLesson[];
  quiz: Quiz;
  completed: boolean;
  score?: number;
}
```

### Quiz System
```typescript
interface Quiz {
  id: string;
  title: string;
  timeLimit: number;
  passingScore: number;
  questions: Question[];
  attempts: QuizAttempt[];
}
```

## 🎯 Learning Paths

### AWS Cloud Practitioner (Foundational)
- **Duration**: 30-40 hours
- **Modules**: EC2 Basics, S3 Basics
- **Practice Tests**: Foundation quiz dengan 30+ questions
- **Exam**: CLF-C01 (90 min, 65 questions, 70% passing)

### AWS Solutions Architect Associate
- **Duration**: 80-120 hours  
- **Modules**: Advanced EC2, S3, VPC, IAM
- **Practice Tests**: Mock exams dengan 65 questions
- **Exam**: SAA-C03 (130 min, 65 questions, 72% passing)

## 🔮 Roadmap

### Phase 2 (Planning)
- [ ] Azure learning modules
- [ ] Google Cloud Platform content
- [ ] Advanced AWS certifications (Professional, Specialty)
- [ ] Community features (discussions, sharing)
- [ ] User authentication & progress sync
- [ ] More practice labs dan scenarios

### Phase 3 (Future)
- [ ] Video content integration
- [ ] Live labs dengan real AWS environment
- [ ] Certification exam booking integration
- [ ] Mobile app
- [ ] AI-powered study recommendations

## 🎨 Screenshots

### Dashboard
- Clean interface dengan progress overview
- Quick access ke learning paths
- Statistics dan achievements

### AWS Service Detail
- Comprehensive module listings
- Progress tracking per module
- Direct access ke quiz dan labs

### Quiz Interface
- Professional exam-like interface
- Timer dan question navigation
- Detailed results dengan explanations

### Practice Labs
- Step-by-step guided interface
- Command copy functionality
- Progress validation

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Jika ada questions atau issues:
1. Check existing GitHub issues
2. Create new issue dengan detailed description
3. Include screenshots jika applicable

---

**Happy Learning! 🚀**

Start your cloud certification journey today dengan platform pembelajaran yang comprehensive dan interactive!
