import React, { useState } from 'react';

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState([]);
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
            
        const formObject = {
            "f_image": "https://image.com/image.jpg",
            "f_Name": name,
            "f_Email": email,
            "f_Mobile": mobile,
            "f_Designation": designation,
            "f_gender": gender,
            "f_Course": course.toString(),
        };

        try {
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            if (response.ok) {
                setSuccessMessage('Employee created successfully');
            } else {
                // Server returned an error
                const data = await response.json();
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            setImage(file);
        } else {
            setErrorMessage('Please upload a JPG/PNG image file');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 px-4 py-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                </div>
                <div>
                    <label className="block mb-1">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                </div>
                <div>
                    <label className="block mb-1">Mobile No:</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                </div>
                <div>
                    <label className="block mb-1">Designation:</label>
                    <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200">
                        <option value="">Select Designation</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Gender:</label>
                    <label className="inline-block mr-4">
                        <input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} className="mr-2" />
                        Male
                    </label>
                    <label className="inline-block">
                        <input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} className="mr-2" />
                        Female
                    </label>
                </div>
                <div>
                    <label className="block mb-1">Course:</label>
                    <label className="inline-block mr-4">
                        <input type="checkbox" value="React" checked={course.includes('React')} onChange={(e) => setCourse([...course, 'React'])} className="mr-2" />
                        React
                    </label>
                    <label className="inline-block mr-4">
                        <input type="checkbox" value="Node.js" checked={course.includes('Node.js')} onChange={(e) => setCourse([...course, 'Node.js'])} className="mr-2" />
                        Node.js
                    </label>
                    <label className="inline-block">
                        <input type="checkbox" value="MongoDB" checked={course.includes('MongoDB')} onChange={(e) => setCourse([...course, 'MongoDB'])} className="mr-2" />
                        MongoDB
                    </label>
                </div>
                <div>
                    <label className="block mb-1">Img Upload:</label>
                    <input type="file" accept="image/jpeg, image/png" onChange={handleImageChange} className="mb-2" />
                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-32 h-32" />}
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">Submit</button>
            </form>
        </div>
    );
};

export default CreateEmployee;

