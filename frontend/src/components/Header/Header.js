import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); 
    const handleLogout = (e) => {
        e.preventDefault();
        navigate('/login'); 
    };
    return (
    <nav className="bg-gray-800" aria-label="Dashboard">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 style={{'fontSize':'30px'}} className="text-white">🏢</h1>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                    <Link to="/employee-list" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee List</Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
  )
}

export default Header