# Cloud Learning Platform - Server

Backend server untuk Cloud Learning Platform menggunakan Express.js, PostgreSQL, dan Sequelize ORM dengan authentication dan Google OAuth.

## Features

- ✅ Express.js server
- ✅ PostgreSQL database dengan Sequelize ORM
- ✅ User authentication (register/login)
- ✅ Google OAuth integration
- ✅ JWT token-based authentication
- ✅ Password hashing dengan bcrypt
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS configuration

## Prerequisites

- Node.js (v14 atau lebih baru)
- PostgreSQL database
- Google Cloud Console project untuk OAuth

## Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env
```

3. Update file `.env` dengan konfigurasi Anda:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cloud_learning_db
DB_USERNAME=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Session Secret
SESSION_SECRET=your_session_secret_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

4. Setup database:
```bash
# Create database
createdb cloud_learning_db

# Run migrations
npm run migrate

# Run seeders (optional)
npm run seed
```

## Google OAuth Setup

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Enable Google+ API
4. Buat OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
5. Copy Client ID dan Client Secret ke file `.env`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Health Check
- `GET /api/health` - Server health check

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Testing

```bash
npm test
```

## Frontend Integration

Di frontend, gunakan axios untuk komunikasi dengan API:

```javascript
// Setup axios instance
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register user
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login user
const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Get user profile
const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// Google OAuth login
const googleLogin = () => {
  window.location.href = 'http://localhost:3000/api/auth/google';
};
```

## Project Structure

```
server/
├── config/
│   ├── config.js          # Database configuration
│   └── passport.js        # Passport configuration
├── controllers/
│   └── authController.js  # Authentication controllers
├── middlewares/
│   ├── authenticate.js    # JWT authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── migrations/            # Database migrations
├── models/
│   ├── index.js          # Sequelize models index
│   └── user.js           # User model
├── routes/
│   ├── index.js          # Main routes
│   └── auth.js           # Authentication routes
├── seeders/              # Database seeders
├── utils/
│   └── jwt.js            # JWT utilities
├── app.js                # Main application file
├── package.json
├── .env.example
└── README.md
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | PostgreSQL host | Yes |
| `DB_PORT` | PostgreSQL port | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_USERNAME` | Database username | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `SESSION_SECRET` | Express session secret | Yes |
| `PORT` | Server port | No (default: 3000) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `FRONTEND_URL` | Frontend URL | No (default: http://localhost:5173) |

## Error Handling

Server menggunakan centralized error handling dengan berbagai tipe error:
- Validation errors
- Authentication errors
- Database constraint errors
- Generic server errors

## Security Features

- Password hashing dengan bcrypt
- JWT token authentication
- CORS protection
- Input validation
- SQL injection protection (Sequelize ORM)
- Session security

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request
