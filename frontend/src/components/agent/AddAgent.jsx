import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const AddAgent = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [file, setFile] = useState(null);
  const [distributedData, setDistributedData] = useState({});
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  // ensure user ID is stored on login
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchAgents = async () => {
      try {
          const token = localStorage.getItem('token');
          const res = await fetch(`http://localhost:5000/api/agents/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ pass it here
           },
         });
          const data = await res.json();
          if (res.ok) setAgents(data);
          else throw new Error(data.message || 'Failed to fetch agents');
        } catch (error) {
          toast.error(error.message);
         }
        };

        if (userId) fetchAgents();
      }, [userId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem('token'); // assuming you stored token on login
    
     if (!token) {
    toast.error('No auth token found. Please login again.');
    return;
  }

    const response = await fetch('http://localhost:5000/api/agents/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 🔑 send token here
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success('Agent added successfully!');
      setAgents(prev => [...prev, result.agent]);

      setFormData({ name: '', email: '', phone: '', password: '' });
      setShowForm(false);
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Failed to add agent');
    }
  } catch (error) {
    console.error('Error adding agent:', error);
    toast.error('An error occurred while adding agent.');
  }
};


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Invalid file type. Only CSV, XLS, and XLSX are allowed.');
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

const handleUpload = () => {
  if (!file || agents.length === 0) return toast.error('Please check file or agent list.');

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: async (result) => {
      const data = result.data;
      const isValid = data.every(item => item.FirstName && item.Phone && item.Notes);
      if (!isValid) return toast.error('Invalid format.');

      const tasksToUpload = [];
      const totalTasks = data.length;
      const totalAgents = agents.length;

      const baseTasksPerAgent = Math.floor(totalTasks / totalAgents);
      const remainingTasks = totalTasks % totalAgents;

      let taskIndex = 0;

      for (let i = 0; i < totalAgents; i++) {
        const numTasks = baseTasksPerAgent + (i < remainingTasks ? 1 : 0); // add extra task to first N agents
        for (let j = 0; j < numTasks && taskIndex < totalTasks; j++) {
          const item = data[taskIndex];
          tasksToUpload.push({
            firstName: item.FirstName,
            phone: item.Phone,
            notes: item.Notes,
            agentId: agents[i]._id,
          });
          taskIndex++;
        }
      }

      // Store in backend
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/tasks/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tasks: tasksToUpload }),
        });

        const resData = await res.json();
        if (res.ok) {
          toast.success(resData.message);
          navigate('/dashboard');
        } else {
          toast.error(resData.message || 'Failed to upload');
        }
      } catch (err) {
        toast.error('Upload failed');
      }
    },
  });
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 px-4 py-10 animate-backgroundWave">
      <ToastContainer/>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-20">
        
        {/* Add Agent Section */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-300 w-full h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Add Agent</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mb-6 w-full transition"
            >
              {showForm ? 'Hide Form' : 'Add Agent'}
            </button>
            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-3">

                <input type="text" name="name" required placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />

                <input type="email" name="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />

                <input type="text" name="phone" required placeholder="Phone (+91...)" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />

                <input type="password" name="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />

                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">Create</button>
              </form>
            )}
          </div>
        </div>

        {/* Upload CSV Section */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-all     duration-300 w-full h-full flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Upload Task List (CSV)</h2>
            <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileChange} className="mb-4 block w-full border border-gray-300 rounded px-2 py-1" />
            <button onClick={handleUpload} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full">Upload & Distribute</button>
          </div>
        </div>
      </div>

   

    </div>
  );
};

export default AddAgent;
