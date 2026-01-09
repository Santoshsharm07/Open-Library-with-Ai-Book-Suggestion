const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Test Gemini API connection with direct model usage
async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API with key:', process.env.GEMINI_API_KEY ? '✓ Key found' : '✗ Key missing');
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here' || process.env.GEMINI_API_KEY === '') {
      console.log('✗ Invalid API key');
      return;
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✓ Gemini AI client initialized');
    
    // Use the correct model name format for the current library
    const modelName = 'gemini-1.5-flash';
    console.log(`✓ Using model: ${modelName}`);
    
    const model = genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });
    
    // Test simple prompt with a more flexible approach
    const prompt = 'Suggest 2 horror fantasy books with authors and brief descriptions. Format each book as a JSON object with title, author, category, description, available (true/false), and image (use placeholder URL). Return only the JSON array without any additional text.';
    
    console.log('\n2. Generating content...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✓ Received response from Gemini API');
    console.log('Response text:', text);
    
    // Try to parse JSON with error handling
    try {
      const suggestions = JSON.parse(text);
      console.log('✓ Successfully parsed JSON response');
      console.log('✓ Gemini API test passed!');
      console.log('Suggestions:', suggestions);
      return suggestions;
    } catch (jsonError) {
      console.error('✗ Failed to parse JSON:', jsonError);
      console.log('Trying to extract JSON from response...');
      
      // Try to extract JSON from the response using regex
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        try {
          const suggestions = JSON.parse(jsonMatch[0]);
          console.log('✓ Successfully extracted and parsed JSON');
          console.log('✓ Gemini API test passed!');
          console.log('Suggestions:', suggestions);
          return suggestions;
        } catch (extractedJsonError) {
          console.error('✗ Failed to parse extracted JSON:', extractedJsonError);
        }
      }
    }
    
  } catch (error) {
    console.error('✗ Error testing Gemini API:', error);
    console.error('Error details:', error.status, error.statusText, error.message);
  }
}

testGeminiAPI();