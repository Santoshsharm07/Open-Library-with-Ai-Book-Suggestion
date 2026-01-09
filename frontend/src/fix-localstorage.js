// Temporary script to fix corrupted localStorage data
console.log('Fixing localStorage...');

// Remove any potentially corrupted user data
localStorage.removeItem('user');
localStorage.removeItem('token');

console.log('localStorage fixed! Please refresh the page.');