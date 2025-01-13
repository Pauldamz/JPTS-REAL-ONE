// netlify/functions/login.js

exports.handler = async function(event, context) {
    // Get the data (username and password) sent by the frontend
    const { username, password } = JSON.parse(event.body);

    // Hardcoded validation (for example purposes)
    if (username === 'student123' && password === 'password123') {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful!' }),
        };
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Invalid credentials' }),
        };
    }
};
