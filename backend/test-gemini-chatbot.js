const axios = require('axios');

// Test script for Gemini AI chatbot
async function testChatbot() {
  const testQueries = [
    'Suggest horror fantasy books',
    'Find books about space exploration',
    'Recommend some classic literature',
    'What should I read if I like Harry Potter?',
    'Suggest books by Stephen King'
  ];
  
  try {
    console.log('Testing Gemini AI Chatbot...\n');
    
    for (const query of testQueries) {
      console.log(`=== Testing query: "${query}" ===`);
      
      const response = await axios.post('http://localhost:5000/api/book-suggestions', {
        query
      });
      
      console.log(`✓ Received ${response.data.length} suggestions`);
      
      // Display first 3 results
      response.data.slice(0, 3).forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} by ${book.author}`);
        console.log(`   Category: ${book.category}`);
        console.log(`   Description: ${book.description}`);
        console.log('');
      });
      
      console.log('---\n');
    }
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error testing chatbot:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testChatbot();