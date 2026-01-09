# Open Library with AI Book Suggestion

A modern, feature-rich library management system with AI-powered book suggestions, designed to streamline library operations and enhance user experience.

## 📋 Overview

Open Library is a comprehensive library management system that combines traditional library functionality with cutting-edge AI technology. It provides an intuitive platform for both librarians and library members to manage books, track borrowing, and get personalized book recommendations.

## ✨ Features

### Core Library Management
- **Book Management**: Add, edit, delete, and update book records with detailed information
- **Category System**: Organize books into categories for easy navigation
- **Borrowing System**: Track borrowed books, due dates, and returns
- **Search & Filter**: Advanced search functionality with filtering options

### User Authentication & Authorization
- **Firebase Authentication**: Secure login/registration with email/password and Google sign-in
- **JWT-based Authentication**: Token-based secure API access
- **Role-based Access**: Different permissions for librarians and regular users
- **Private Routes**: Protected pages for authenticated users

### AI-powered Features
- **Smart Book Suggestions**: AI-driven recommendations based on user queries
- **Natural Language Processing**: Understand natural language requests for book recommendations
- **Context-aware Suggestions**: Recommendations based on book categories, authors, and user preferences

### UI/UX Features
- **Responsive Design**: Fully responsive for all device sizes
- **Light & Dark Mode**: Toggle between themes for comfortable reading
- **Lottie Animations**: Smooth animations for enhanced user experience
- **Carousel & Sliders**: Attractive display of featured books
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router v6** - Navigation management
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling
- **React Hot Toast** - Toast notifications
- **Lottie React** - Animation library
- **Swiper** - Carousel component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Firebase Auth** - Authentication service
- **JWT** - JSON Web Tokens
- **Google Generative AI** - AI for book suggestions

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Firebase project setup
- Google Generative AI API key

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Santoshsharm07/Open-Library-with-Ai-Book-Suggestion.git
   cd Open-Library-with-Ai-Book-Suggestion
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the backend directory with the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     SECRET_KEY=your_jwt_secret_key
     GEMINI_API_KEY=your_google_generative_ai_key
     ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the frontend directory with the following variables:
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

## 🚀 Usage

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

### API Endpoints

#### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login with email/password
- `POST /api/google-login` - Login with Google
- `POST /api/jwt` - Generate JWT token
- `POST /api/logout` - Logout user

#### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

#### Categories
- `GET /api/categories` - Get all categories
- `GET /api/sub-Books/:id` - Get books by category

#### Borrowed Books
- `GET /api/borrowed-books` - Get borrowed books
- `POST /api/borrow-book` - Borrow a book
- `POST /api/return-book/:id` - Return a borrowed book

#### AI Suggestions
- `POST /api/book-suggestions` - Get AI-powered book suggestions

## 📁 Project Structure

```
Open-Library-with-Ai-Book-Suggestion/
├── backend/                # Backend server
│   ├── models/             # Mongoose models
│   ├── index.js           # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Backend environment variables
├── frontend/               # Frontend application
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── Components/    # React components
│   │   │   ├── Authentication/  # Auth components
│   │   │   ├── Pages/           # Page components
│   │   │   ├── AuthProvider.jsx # Auth context
│   │   │   ├── Footer.jsx       # Footer component
│   │   │   ├── Navbar.jsx       # Navbar component
│   │   │   └── Router.jsx       # Route configuration
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx        # Main App component
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── .env               # Frontend environment variables
└── README.md              # This file
```

## 🎨 Key Components

### Pages
- **Home**: Landing page with carousel and featured books
- **AllBooks**: View all books with search and filter options
- **AddBook**: Form to add new books
- **UpdateBook**: Edit existing book details
- **BookCategories**: Browse books by categories
- **BorrowedBooks**: View and manage borrowed books
- **BookSuggestions**: Get AI-powered book recommendations
- **AboutUs**: Information about the library
- **ContactUs**: Contact form
- **Login/Register**: Authentication pages

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
2. Enable Email/Password and Google authentication
3. Copy the Firebase configuration to your frontend code

### Google Generative AI Setup
1. Create a project at [cloud.google.com](https://cloud.google.com/)
2. Enable the Generative AI API
3. Create an API key and add it to your backend .env file

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Live Demo

Check out the live demo at: [https://open-librarian.web.app/](https://open-librarian.web.app/)

## 📞 Support

For any issues or questions, please open an issue on the GitHub repository or contact the project maintainer.

---

**Open Library with AI Book Suggestion** - Empowering libraries with modern technology and AI-driven insights.
