const axios = require('axios');

// Test the enhanced chatbot endpoint
async function testChatbot() {
  try {
    const testQueries = [
      'Suggest horror fantasy books',
      'Find books by Stephen King',
      'Recommend some fiction books',
      'What should I read next?',
      'Search for books about magic'
    ];
    
    for (const query of testQueries) {
      console.log(`\n=== Testing query: "${query}" ===`);
      const response = await axios.post('http://localhost:5000/api/book-suggestions', {
        query
      });
      
      console.log(`✓ Response received: ${response.data.length} books`);
      response.data.slice(0, 3).forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} by ${book.author} (${book.category})`);
      });
    }
    
    console.log('\n=== All tests passed! ===');
  } catch (error) {
    console.error('✗ Error testing chatbot:', error.message);
  }
}

testChatbot();