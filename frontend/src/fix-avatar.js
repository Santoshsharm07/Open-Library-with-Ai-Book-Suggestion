// Simple script to fix avatar display issues by ensuring clean localStorage
console.log('Fixing avatar display issues...');

// Clear any existing user data
localStorage.removeItem('user');
localStorage.removeItem('token');

console.log('localStorage cleaned successfully!');
console.log('Please refresh the page and log in again.');
console.log('The avatar should now display correctly with the first letter of your name.');