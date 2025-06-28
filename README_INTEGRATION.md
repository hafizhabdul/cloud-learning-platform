# Cloud Learning Platform

Platform pembelajaran cloud computing yang mendukung multiple cloud providers (AWS, Azure, GCP, IBM, OCI, Alibaba Cloud) dengan fitur autentikasi dan Google OAuth.

## 🚀 Fitur Utama

- **Autentikasi Lengkap**: Login/Register lokal + Google OAuth
- **Multi-Cloud Learning**: Dukungan untuk 6 cloud providers utama
- **Progress Tracking**: Lacak kemajuan pembelajaran
- **Interactive Learning**: Simulator, cost calculator, architecture designer
- **Community**: Forum diskusi dan sharing knowledge
- **Responsive Design**: UI modern dengan dark/light mode

## 🛠️ Tech Stack

### Frontend
- React 19 + TypeScript
- Vite untuk build tool
- Tailwind CSS untuk styling
- React Router untuk routing
- Context API untuk state management

### Backend
- Node.js + Express
- PostgreSQL database
- Sequelize ORM
- Passport.js untuk autentikasi
- JWT untuk session management
- Google OAuth 2.0

## 📋 Prerequisites

- Node.js (v18 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- Google Cloud Platform account (untuk OAuth)

## 🔧 Setup & Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd cloud-learning-platform
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Database Setup
```bash
# Buat database PostgreSQL
createdb cloud_learning_db

# Jalankan migrasi
npm run migrate

# (Opsional) Jalankan seeder untuk data contoh
npm run seed
```

### 4. Environment Configuration

#### Server (.env)
```env
# Database Configuration
DB_USERNAME=postgres
DB_PASSWORD=your_password_here
DB_NAME=cloud_learning_db
DB_HOST=localhost
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Session Configuration
SESSION_SECRET=your-session-secret

# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

### 5. Google OAuth Setup

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Enable Google+ API
4. Buat OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
5. Copy Client ID dan Client Secret ke `.env` file

### 6. Start Development

```bash
# Start both server and frontend
npm run dev

# Atau start secara terpisah:
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Frontend
cd cloud-learning && npm run dev
```

### 7. Access Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000

## 📱 Penggunaan

### Autentikasi
1. **Register**: Buat akun baru dengan email/password
2. **Login**: Masuk dengan credentials atau Google OAuth
3. **Google OAuth**: Klik "Continue with Google" untuk login cepat

### Fitur Learning
1. **Dashboard**: Overview progress dan rekomendasi
2. **Learning Paths**: Jalur pembelajaran terstruktur
3. **Certifications**: Informasi sertifikasi cloud
4. **Progress Tracking**: Monitor kemajuan belajar

### Fitur Tools
1. **Architecture Designer**: Desain arsitektur cloud
2. **Cost Calculator**: Hitung estimasi biaya
3. **Price Comparison**: Bandingkan harga antar provider
4. **Migration Planner**: Rencanakan migrasi cloud

## 🗂️ Struktur Project

```
cloud-learning-platform/
├── cloud-learning/          # Frontend React app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   └── public/
├── server/                  # Backend Express app
│   ├── config/             # Database & Passport config
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback

### Health Check
- `GET /api/health` - Server health status

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Pastikan set environment variables berikut untuk production:
- `NODE_ENV=production`
- Database credentials untuk production
- Secure JWT_SECRET dan SESSION_SECRET
- Google OAuth credentials untuk domain production

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Database Connection Issues
- Pastikan PostgreSQL service berjalan
- Cek kredensial database di `.env`
- Pastikan database `cloud_learning_db` sudah dibuat

### Google OAuth Issues
- Cek Google Client ID dan Secret
- Pastikan callback URL sudah benar di Google Console
- Pastikan Google+ API sudah dienable

### Port Conflicts
- Server default: port 3000
- Frontend default: port 5173
- Ubah di file konfigurasi jika ada konflik

## 📞 Support

Jika ada pertanyaan atau issues, silakan:
1. Check existing issues di repository
2. Buat issue baru dengan deskripsi detail
3. Contact maintainer

---

Happy Learning! 🎓☁️
