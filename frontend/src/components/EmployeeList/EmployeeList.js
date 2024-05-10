// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { formatDate } from './../../utils/utilFunctions';

// const EmployeeList = () => {
//     const [employees, setEmployees] = useState([]);

//     const handleDeleteEmployee = async (employeeId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
//                 method: 'DELETE'
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to delete employee');
//             }
//             setEmployees(employees.filter(employee => employee._id !== employeeId));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         const fetchEmployees = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/employees');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch employee data');
//                 }
//                 const data = await response.json();
//                 setEmployees(data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchEmployees(); 
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100 py-6">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-2xl font-semibold text-gray-900">Employee List</h2>
//                     <div className="flex items-center">
//                         <span className="mr-2 text-gray-700">Total Count: {employees.length}</span>
//                         <Link to="/create-employee" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Employee</Link>
//                     </div>
//                 </div>
//                 <div className="mt-4 overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique ID</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No.</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
//                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {employees.map(employee => (
//                                 <tr key={employee._id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee._id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.f_Name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.f_Email}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.f_Mobile}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.f_Designation}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.f_gender}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{employee.f_Course}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{formatDate(employee.f_Createdate)}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                         <Link to={'/employee-edit/'+employee._id} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
//                                         <button onClick={() => handleDeleteEmployee(employee._id)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeList;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from './../../utils/utilFunctions';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedField, setSortedField] = useState(null);
    const [isAscending, setIsAscending] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10); // Adjust as needed

    const handleDeleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/employees/${employeeId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            setEmployees(employees.filter(employee => employee._id !== employeeId));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employee data');
                }
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEmployees();
    }, []);

    

    const filteredEmployees = employees.filter(employee => 
        employee.f_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.f_Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formatDate(employee.f_Createdate).toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">Employee List</h2>
                    <div className="flex items-center">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                        <span className="mr-2 text-gray-700">Total Count: {filteredEmployees.length}</span>
                        <Link to="/create-employee" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Employee</Link>
                    </div>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No.</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEmployees.map(employee => (
                                <tr key={employee._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee._id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.f_Name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.f_Email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.f_Mobile}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.f_Designation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.f_gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{employee.f_Course}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(employee.f_Createdate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link to={'/employee-edit/'+employee._id} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        <button onClick={() => handleDeleteEmployee(employee._id)} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
