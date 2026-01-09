const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Import User model
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Initialize Gemini AI client with latest model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash', // Latest Gemini model for improved performance
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2000
  }
});

// Open Library API integration
const OPEN_LIBRARY_API = 'https://openlibrary.org';
const axios = require('axios');

// Fetch books from Open Library by category
const fetchBooksFromOpenLibrary = async (category, limit = 10) => {
  try {
    // Map our categories to Open Library subject slugs
    const categoryMap = {
      'Fiction': 'subjects/fiction',
      'Non-Fiction': 'subjects/nonfiction',
      'Science': 'subjects/science',
      'History': 'subjects/history',
      'Horror': 'subjects/horror',
      'Fantasy': 'subjects/fantasy',
      'Mystery': 'subjects/mystery'
    };
    
    const subjectSlug = categoryMap[category] || 'subjects/fiction';
    const url = `${OPEN_LIBRARY_API}/${subjectSlug}.json?limit=${limit}`;
    
    const response = await axios.get(url);
    const works = response.data.works || [];
    
    // Transform Open Library data to match our book schema
    const books = await Promise.all(works.map(async (work, index) => {
      const book = {
        id: `ol-${Date.now()}-${index}`,
        title: work.title || 'Unknown Title',
        author: work.authors?.[0]?.name || 'Unknown Author',
        category: category,
        description: work.first_sentence?.value || 'No description available',
        available: Math.random() > 0.3, // Random availability for demo
        image: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : 'https://via.placeholder.com/80x120?text=Book'
      };
      
      return book;
    }));
    
    return books;
  } catch (error) {
    console.error('Error fetching books from Open Library:', error);
    return [];
  }
};

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// MongoDB Connection
let isMongoConnected = false;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    isMongoConnected = true;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    isMongoConnected = false;
    // Retry connection after 5 seconds
    setTimeout(connectToMongoDB, 5000);
  }
};

connectToMongoDB();

// MongoDB connection health check middleware
const checkMongoConnection = (req, res, next) => {
  if (!isMongoConnected) {
    return res.status(503).json({ message: 'Database connection unavailable. Please try again later.' });
  }
  if (typeof next === 'function') {
    next();
  }
};

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      if (typeof next === 'function') {
        next();
      }
    });
  } else {
    if (typeof next === 'function') {
      next();
    }
  }
};

app.use(verifyToken);

// File-based database for books, categories, and borrowed books
const DB_PATH = path.join(__dirname, 'db.json');

// Initialize or update database with Open Library cover images
const initializeDB = () => {
    const initialData = {
      books: [
        {
          id: '1',
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          category: 'Fiction',
          description: 'A classic novel about the American Dream and the Roaring Twenties',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0743273567-L.jpg'
        },
        {
          id: '2',
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          category: 'Fiction',
          description: 'A story about racial injustice and moral growth in the American South',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0061120081-L.jpg'
        },
        {
          id: '3',
          title: 'The Shining',
          author: 'Stephen King',
          category: 'Horror',
          description: 'A family becomes caretakers of a haunted hotel, leading to terrifying consequences',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0307743659-L.jpg'
        },
        {
          id: '4',
          title: 'The Lord of the Rings',
          author: 'J.R.R. Tolkien',
          category: 'Fantasy',
          description: 'An epic fantasy adventure about the battle between good and evil in Middle-earth',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0618640150-L.jpg'
        },
        {
          id: '5',
          title: 'Harry Potter and the Sorcerer\'s Stone',
          author: 'J.K. Rowling',
          category: 'Fantasy',
          description: 'A young boy discovers he is a wizard and begins his journey at Hogwarts School of Witchcraft and Wizardry',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/059035342X-L.jpg'
        },
        {
          id: '6',
          title: 'It',
          author: 'Stephen King',
          category: 'Horror',
          description: 'A group of friends confronts a shape-shifting evil that preys on children in their small town',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/1501142976-L.jpg'
        },
        {
          id: '7',
          title: 'The Hobbit',
          author: 'J.R.R. Tolkien',
          category: 'Fantasy',
          description: 'A hobbit named Bilbo Baggins embarks on an unexpected adventure to reclaim a treasure from a dragon',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/054792822X-L.jpg'
        },
        {
          id: '8',
          title: 'Dracula',
          author: 'Bram Stoker',
          category: 'Horror',
          description: 'The classic tale of the vampire Count Dracula and his quest to spread his curse to England',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0451527182-L.jpg'
        },
        {
          id: '9',
          title: 'Frankenstein',
          author: 'Mary Shelley',
          category: 'Horror',
          description: 'A scientist creates a living being from dead tissue, with terrifying consequences',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0486282112-L.jpg'
        },
        {
          id: '10',
          title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
          author: 'C.S. Lewis',
          category: 'Fantasy',
          description: 'Four siblings discover a magical wardrobe that leads to the enchanted land of Narnia',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0064404994-L.jpg'
        },
        {
          id: '11',
          title: 'A Game of Thrones',
          author: 'George R.R. Martin',
          category: 'Fantasy',
          description: 'The first book in the epic fantasy series about power struggles in the Seven Kingdoms',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0553103547-L.jpg'
        },
        {
          id: '12',
          title: 'The Silence of the Lambs',
          author: 'Thomas Harris',
          category: 'Horror',
          description: 'An FBI trainee seeks the help of a brilliant psychiatrist and cannibalistic serial killer to catch another killer',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0316324077-L.jpg'
        },
        {
          id: '13',
          title: '1984',
          author: 'George Orwell',
          category: 'Fiction',
          description: 'A dystopian novel about a totalitarian society where individualism is suppressed',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0451524934-L.jpg'
        },
        {
          id: '14',
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          category: 'Fiction',
          description: 'A classic romance novel about the Bennet sisters and their quest for love and marriage',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0141439513-L.jpg'
        },
        {
          id: '15',
          title: 'The Da Vinci Code',
          author: 'Dan Brown',
          category: 'Mystery',
          description: 'A symbologist and cryptologist uncover a conspiracy involving the Catholic Church and the Holy Grail',
          available: true,
          image: 'https://covers.openlibrary.org/b/isbn/0385504209-L.jpg'
        }
      ],
      categories: [
        { id: '1', name: 'Fiction', image: 'https://covers.openlibrary.org/b/isbn/0061120081-L.jpg' },
        { id: '2', name: 'Non-Fiction', image: 'https://covers.openlibrary.org/b/isbn/0374533555-L.jpg' },
        { id: '3', name: 'Science', image: 'https://covers.openlibrary.org/b/isbn/0393061348-L.jpg' },
        { id: '4', name: 'History', image: 'https://covers.openlibrary.org/b/isbn/0143127741-L.jpg' },
        { id: '5', name: 'Horror', image: 'https://covers.openlibrary.org/b/isbn/0307743659-L.jpg' },
        { id: '6', name: 'Fantasy', image: 'https://covers.openlibrary.org/b/isbn/059035342X-L.jpg' },
        { id: '7', name: 'Mystery', image: 'https://covers.openlibrary.org/b/isbn/0385504209-L.jpg' }
      ],
      borrowedBooks: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    console.log('Book database initialized with sample data and Open Library cover images');
};

// Read database
const readDB = () => {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
};

// Write to database
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Initialize database
initializeDB();

// User Authentication Routes
app.post('/api/register', checkMongoConnection, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/login', checkMongoConnection, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/google-login', checkMongoConnection, async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user for Google login
      user = new User({
        name,
        email,
        password: Math.random().toString(36).slice(-8), // Random password for Google users
        photoURL
      });
      await user.save();
    }
    
    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book Routes
app.get('/api/books', async (req, res) => {
  try {
    // Fetch books from Open Library API across different categories
    const categories = ['Fiction', 'Fantasy', 'Horror', 'Science', 'History'];
    let allOpenLibraryBooks = [];
    
    // Fetch books from each category
    for (const category of categories) {
      const books = await fetchBooksFromOpenLibrary(category, 5);
      allOpenLibraryBooks = [...allOpenLibraryBooks, ...books];
    }
    
    // Shuffle the books to provide a diverse selection
    allOpenLibraryBooks = allOpenLibraryBooks.sort(() => Math.random() - 0.5);
    
    if (allOpenLibraryBooks.length > 0) {
      console.log(`Fetched ${allOpenLibraryBooks.length} diverse books from Open Library`);
      res.json(allOpenLibraryBooks);
    } else {
      // Fallback to local database if Open Library returns no results
      const db = readDB();
      res.json(db.books);
    }
  } catch (error) {
    console.error('Error in books route:', error);
    // Fallback to local database on error
    const db = readDB();
    res.json(db.books);
  }
});

app.get('/api/books/:id', (req, res) => {
  const db = readDB();
  const book = db.books.find(b => b.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.post('/api/books', (req, res) => {
  const db = readDB();
  const newBook = {
    id: Date.now().toString(),
    ...req.body,
    available: true
  };
  db.books.push(newBook);
  writeDB(db);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const db = readDB();
  const index = db.books.findIndex(b => b.id === req.params.id);
  if (index !== -1) {
    db.books[index] = { ...db.books[index], ...req.body };
    writeDB(db);
    res.json(db.books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const db = readDB();
  const filteredBooks = db.books.filter(b => b.id !== req.params.id);
  if (filteredBooks.length < db.books.length) {
    db.books = filteredBooks;
    writeDB(db);
    res.json({ message: 'Book deleted successfully' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Category Routes
app.get('/api/categories', (req, res) => {
  const db = readDB();
  // Transform categories to match frontend expected format
  const formattedCategories = db.categories.map(category => ({
    _id: category.id,
    categories: category.name,
    image: category.image
  }));
  res.json(formattedCategories);
});

app.get('/api/sub-Books/:id', async (req, res) => {
  const db = readDB();
  const category = db.categories.find(c => c.id === req.params.id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  
  try {
    // Fetch books from Open Library API first
    const openLibraryBooks = await fetchBooksFromOpenLibrary(category.name, 20);
    
    if (openLibraryBooks.length > 0) {
      console.log(`Fetched ${openLibraryBooks.length} books from Open Library for category: ${category.name}`);
      res.json(openLibraryBooks);
    } else {
      // Fallback to local database if Open Library returns no results
      const localBooks = db.books.filter(book => book.category === category.name);
      res.json(localBooks);
    }
  } catch (error) {
    console.error('Error in sub-Books route:', error);
    // Fallback to local database on error
    const localBooks = db.books.filter(book => book.category === category.name);
    res.json(localBooks);
  }
});

// Mock endpoint for frontend compatibility
app.get('/api/subBooks', (req, res) => {
  const db = readDB();
  // Transform categories to match frontend expected format
  const formattedCategories = db.categories.map(category => ({
    _id: category.id,
    categories: category.name,
    image: category.image
  }));
  res.json(formattedCategories);
});

// Borrowed Books Routes
app.get('/api/borrowed-books', (req, res) => {
  const db = readDB();
  const userId = req.query.userId || 'user1';
  const borrowedBooks = db.borrowedBooks
    .filter(bb => bb.userId === userId)
    .map(bb => {
      const book = db.books.find(b => b.id === bb.bookId);
      return { ...bb, book };
    });
  res.json(borrowedBooks);
});

app.post('/api/borrow-book', (req, res) => {
  const db = readDB();
  const { bookId, userId } = req.body;
  
  // Check if book exists and is available
  const bookIndex = db.books.findIndex(b => b.id === bookId);
  if (bookIndex === -1 || !db.books[bookIndex].available) {
    return res.status(400).json({ message: 'Book not available' });
  }
  
  // Create borrowed record
  const newBorrow = {
    id: Date.now().toString(),
    bookId,
    userId,
    borrowDate: new Date().toISOString().split('T')[0],
    returnDate: null
  };
  db.borrowedBooks.push(newBorrow);
  
  // Update book availability
  db.books[bookIndex].available = false;
  
  writeDB(db);
  res.status(201).json(newBorrow);
});

app.post('/api/return-book/:id', (req, res) => {
  const db = readDB();
  const borrowId = req.params.id;
  
  // Find borrow record
  const borrowIndex = db.borrowedBooks.findIndex(bb => bb.id === borrowId);
  if (borrowIndex === -1) {
    return res.status(404).json({ message: 'Borrow record not found' });
  }
  
  // Update return date
  db.borrowedBooks[borrowIndex].returnDate = new Date().toISOString().split('T')[0];
  
  // Update book availability
  const bookIndex = db.books.findIndex(b => b.id === db.borrowedBooks[borrowIndex].bookId);
  if (bookIndex !== -1) {
    db.books[bookIndex].available = true;
  }
  
  writeDB(db);
  res.json(db.borrowedBooks[borrowIndex]);
});

// JWT Routes
app.post('/api/jwt', (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1d' });
  res.json({ token });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

// Enhanced AI Chatbot for Book Suggestions with Gemini API fallback
app.post('/api/book-suggestions', async (req, res) => {
  const { query } = req.body;
  const db = readDB();
  
  try {
    console.log('Chatbot received query:', query);
    const normalizedQuery = query.toLowerCase().trim();
    
    // Enhanced local search with intelligent filtering
    let suggestions = [];
    
    // Smart filtering based on query intent
    if (normalizedQuery.includes('horror')) {
      suggestions = db.books.filter(book => book.category.toLowerCase().includes('horror'));
    } else if (normalizedQuery.includes('fantasy')) {
      suggestions = db.books.filter(book => book.category.toLowerCase().includes('fantasy'));
    } else if (normalizedQuery.includes('fiction')) {
      suggestions = db.books.filter(book => book.category.toLowerCase().includes('fiction'));
    } else if (normalizedQuery.includes('mystery')) {
      suggestions = db.books.filter(book => book.category.toLowerCase().includes('mystery'));
    } else if (normalizedQuery.includes('stephen king')) {
      suggestions = db.books.filter(book => book.author.toLowerCase().includes('stephen king'));
    } else if (normalizedQuery.includes('j.k. rowling') || normalizedQuery.includes('harry potter')) {
      suggestions = db.books.filter(book => 
        book.author.toLowerCase().includes('j.k. rowling') || 
        book.title.toLowerCase().includes('harry potter')
      );
    } else if (normalizedQuery.includes('tolkien') || normalizedQuery.includes('lord of the rings') || normalizedQuery.includes('hobbit')) {
      suggestions = db.books.filter(book => 
        book.author.toLowerCase().includes('tolkien') || 
        book.title.toLowerCase().includes('lord of the rings') || 
        book.title.toLowerCase().includes('hobbit')
      );
    } else {
      // Full text search as default
      suggestions = db.books.filter(book => 
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery) ||
        book.category.toLowerCase().includes(normalizedQuery) ||
        book.description.toLowerCase().includes(normalizedQuery)
      );
    }
    
    // If not enough results, add more from related categories
    if (suggestions.length < 5) {
      const existingCategories = [...new Set(suggestions.map(book => book.category.toLowerCase()))];
      const additionalBooks = db.books.filter(book => 
        existingCategories.some(cat => book.category.toLowerCase().includes(cat)) &&
        !suggestions.some(sug => sug.id === book.id)
      );
      suggestions = [...suggestions, ...additionalBooks].sort(() => Math.random() - 0.5).slice(0, 7);
    }
    
    // If still not enough, add random books
    if (suggestions.length < 5) {
      const randomBooks = db.books
        .filter(book => !suggestions.some(sug => sug.id === book.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 5 - suggestions.length);
      suggestions = [...suggestions, ...randomBooks];
    }
    
    console.log('Returning', suggestions.length, 'book suggestions');
    res.json(suggestions);
  } catch (error) {
    console.error('Error in chatbot:', error);
    
    // Ultimate fallback: return random books
    const fallbackSuggestions = db.books.sort(() => Math.random() - 0.5).slice(0, 7);
    res.json(fallbackSuggestions);
  }
});

// AI Chatbot endpoint for general queries
app.post('/api/chat', async (req, res) => {
  const { query } = req.body;
  const db = readDB();
  
  try {
    console.log('Chatbot received query:', query);
    const normalizedQuery = query.toLowerCase().trim();
    
    // Check if query is book-related
    const isBookRelated = normalizedQuery.includes('book') || 
                         normalizedQuery.includes('books') ||
                         normalizedQuery.includes('read') ||
                         normalizedQuery.includes('author') ||
                         normalizedQuery.includes('category') ||
                         normalizedQuery.includes('title');
    
    if (isBookRelated) {
      // Enhanced local search with intelligent filtering for book-related queries
      let suggestions = [];
      
      // Smart filtering based on query intent
      if (normalizedQuery.includes('horror')) {
        suggestions = db.books.filter(book => book.category.toLowerCase().includes('horror'));
      } else if (normalizedQuery.includes('fantasy')) {
        suggestions = db.books.filter(book => book.category.toLowerCase().includes('fantasy'));
      } else if (normalizedQuery.includes('fiction')) {
        suggestions = db.books.filter(book => book.category.toLowerCase().includes('fiction'));
      } else if (normalizedQuery.includes('mystery')) {
        suggestions = db.books.filter(book => book.category.toLowerCase().includes('mystery'));
      } else if (normalizedQuery.includes('stephen king')) {
        suggestions = db.books.filter(book => book.author.toLowerCase().includes('stephen king'));
      } else if (normalizedQuery.includes('j.k. rowling') || normalizedQuery.includes('harry potter')) {
        suggestions = db.books.filter(book => 
          book.author.toLowerCase().includes('j.k. rowling') || 
          book.title.toLowerCase().includes('harry potter')
        );
      } else if (normalizedQuery.includes('tolkien') || normalizedQuery.includes('lord of the rings') || normalizedQuery.includes('hobbit')) {
        suggestions = db.books.filter(book => 
          book.author.toLowerCase().includes('tolkien') || 
          book.title.toLowerCase().includes('lord of the rings') || 
          book.title.toLowerCase().includes('hobbit')
        );
      } else {
        // Full text search as default
        suggestions = db.books.filter(book => 
          book.title.toLowerCase().includes(normalizedQuery) ||
          book.author.toLowerCase().includes(normalizedQuery) ||
          book.category.toLowerCase().includes(normalizedQuery) ||
          book.description.toLowerCase().includes(normalizedQuery)
        );
      }
      
      // If not enough results, add more from related categories
      if (suggestions.length < 5) {
        const existingCategories = [...new Set(suggestions.map(book => book.category.toLowerCase()))];
        const additionalBooks = db.books.filter(book => 
          existingCategories.some(cat => book.category.toLowerCase().includes(cat)) &&
          !suggestions.some(sug => sug.id === book.id)
        );
        suggestions = [...suggestions, ...additionalBooks].sort(() => Math.random() - 0.5).slice(0, 7);
      }
      
      // If still not enough, add random books
      if (suggestions.length < 5) {
        const randomBooks = db.books
          .filter(book => !suggestions.some(sug => sug.id === book.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, 5 - suggestions.length);
        suggestions = [...suggestions, ...randomBooks];
      }
      
      console.log('Returning', suggestions.length, 'book suggestions');
      res.json({ type: 'books', data: suggestions });
    } else {
      // Handle general queries using Gemini 2.5 Flash API
      try {
        console.log('Using Gemini 2.5 Flash API for general query:', query);
        
        const prompt = `You are AI Librarybot, a helpful and knowledgeable library assistant. Answer the following query in a friendly, concise, and informative manner. If the query is about books, authors, or libraries, provide detailed and accurate information. If it's a general question, still provide a helpful response while maintaining your identity as a library assistant.\n\nQuery: ${query}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        
        console.log('Gemini 2.5 Flash API response:', text);
        res.json({ type: 'text', data: text });
      } catch (geminiError) {
        console.error('Gemini 2.5 Flash API error:', geminiError);
        
        // Enhanced fallback responses based on query type
        const generalResponses = {
          greetings: [
            "Hello! I'm AI Librarybot. How can I help you today?",
            "Hi there! I'm your personal library assistant. What would you like to know?",
            "Greetings! I'm here to assist you with books, authors, or any library-related questions."
          ],
          thanks: [
            "You're welcome! Happy to help.",
            "My pleasure! Let me know if you need anything else.",
            "Anytime! I'm here for you."
          ],
          help: [
            "I can help you find books, authors, and information about our library collection. Just ask!",
            "Try asking me about a specific book, author, or genre. I can also suggest books you might like.",
            "Need assistance? I can help with book recommendations, author information, and more."
          ],
          default: [
            "That's an interesting question! As a library assistant, I specialize in books and library-related topics.",
            "I'd love to help with that, but my expertise is focused on books, authors, and library services.",
            "That's a great question! While I can't answer that directly, I can help you find books on many topics."
          ]
        };
        
        let response;
        if (normalizedQuery.includes('hi') || normalizedQuery.includes('hello') || normalizedQuery.includes('hey')) {
          response = generalResponses.greetings[Math.floor(Math.random() * generalResponses.greetings.length)];
        } else if (normalizedQuery.includes('thank')) {
          response = generalResponses.thanks[Math.floor(Math.random() * generalResponses.thanks.length)];
        } else if (normalizedQuery.includes('help') || normalizedQuery.includes('what can you do')) {
          response = generalResponses.help[Math.floor(Math.random() * generalResponses.help.length)];
        } else {
          response = generalResponses.default[Math.floor(Math.random() * generalResponses.default.length)];
        }
        
        res.json({ type: 'text', data: response });
      }
    }
  } catch (error) {
    console.error('Error in chatbot:', error);
    
    // Ultimate fallback: return error message
    res.json({ type: 'text', data: 'I apologize, but I encountered an error. Please try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
