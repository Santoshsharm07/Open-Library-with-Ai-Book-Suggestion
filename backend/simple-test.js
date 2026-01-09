const http = require('http');

// Test the chatbot endpoint with a simple HTTP request
const testQuery = 'Suggest horror fantasy books';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/book-suggestions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify({ query: testQuery }))
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log(`\nResponse:`);
      console.log(`Found ${response.length} books`);
      console.log('Books:');
      response.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} by ${book.author} (${book.category})`);
      });
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error making request:', error);
});

req.write(JSON.stringify({ query: testQuery }));
req.end();