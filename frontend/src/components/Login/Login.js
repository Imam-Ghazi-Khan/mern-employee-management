import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username.trim() || !password.trim()) {
            setError('Username and password are required');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setUsername('');
                setPassword('');
                navigate('/');
            } else {
                throw new Error(data.message || 'An error occurred');
            }
        } catch (error) {
            setError(error.message || 'An error occurred');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-1.654 0-3.169-.64-4.304-1.709l1.729-1.729zm10.585-1.721A7.963 7.963 0 0120 12h-4c0 1.654-.64 3.169-1.709 4.304l1.729 1.729zM12 20a8 8 0 008-8h-4c0 1.654-.64 3.169-1.709 4.304l-1.729-1.729zm-1.291-10.585A7.962 7.962 0 0112 4v4c1.654 0 3.169.64 4.304 1.709l-1.729 1.729z"></path>
                                    </svg>
                                ) : null}
                            </span>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="mt-2 text-center text-sm text-red-600">
                        {error}
                    </p>
                )}
                <div className="text-center">
                    <p className="text-sm text-gray-600">For Reference:</p>
                    <p className="text-sm">Username: admin</p>
                    <p className="text-sm">Password: password</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
