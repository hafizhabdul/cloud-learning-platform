#!/bin/bash

echo "🚀 Setting up Cloud Learning Platform..."

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../cloud-learning
npm install

echo "✅ Setup completed successfully!"
echo ""
echo "🗄️ Database Setup Required:"
echo "1. Make sure PostgreSQL is running on localhost:5432"
echo "2. Create database: createdb cloud_learning_db"
echo "3. Update server/.env with your database credentials"
echo "4. Run migrations: cd server && npm run migrate"
echo "5. Optionally run seeders: cd server && npm run seed"
echo ""
echo "🔑 Google OAuth Setup:"
echo "1. Go to Google Cloud Console"
echo "2. Create OAuth 2.0 credentials"
echo "3. Add to server/.env:"
echo "   GOOGLE_CLIENT_ID=your_client_id"
echo "   GOOGLE_CLIENT_SECRET=your_client_secret"
echo ""
echo "🚀 To start the application:"
echo "1. Start server: cd server && npm run dev"
echo "2. Start frontend: cd cloud-learning && npm run dev"
