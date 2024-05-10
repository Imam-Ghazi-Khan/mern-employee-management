const validUsername = 'admin';
const validPassword = 'password';

const login = (req, res) => {
    const { username, password } = req.body;
    if (username === validUsername && password === validPassword) {
        res.status(200).json({ success: true, message: 'Login successful', user: { username: validUsername } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
};

module.exports = { login };