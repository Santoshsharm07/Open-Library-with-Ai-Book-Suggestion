const axios = require('axios');

async function testRegister() {
  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test123!'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
  }
}

testRegister();